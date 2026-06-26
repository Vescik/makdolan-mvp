#!/usr/bin/env node
/* global console */
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const OUTPUT_DIR = path.join(".ai", "brain", "index");
const OUTPUT_FILES = new Set([
  path.join(OUTPUT_DIR, "repo-map.json"),
  path.join(OUTPUT_DIR, "file-catalog.md"),
  path.join(OUTPUT_DIR, "module-map.md"),
]);

const EXCLUDED_DIR_NAMES = new Set([
  ".git",
  ".expo",
  ".next",
  ".turbo",
  ".vite",
  "android-build",
  "build",
  "coverage",
  "dist",
  "ios-build",
  "node_modules",
  "out",
]);

const EXCLUDED_FILE_NAMES = new Set([
  ".DS_Store",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "bun.lock",
  "bun.lockb",
]);

const EXCLUDED_FILE_PATTERNS = [
  /^\.env($|\.)/,
  /^\.ai\/brain\/context-packs\/\d{4}-\d{2}-\d{2}T.+\.md$/,
  /(^|\/).+\.generated\..+$/,
];

const IMPORTANT_FILE_NAMES = new Set([
  "AGENTS.md",
  "README.md",
  "INSTALL_CHECKLIST.md",
  "package.json",
  "app.json",
  "tsconfig.json",
  "vitest.config.ts",
  "eslint.config.mjs",
]);

const CONFIG_FILE_PATTERNS = [
  /^\.github\/workflows\/.+\.ya?ml$/,
  /^\.codex\/.+/,
  /^\.agents\/skills\/.+\/SKILL\.md$/,
  /(^|\/)package\.json$/,
  /(^|\/)app\.json$/,
  /(^|\/)tsconfig\.json$/,
  /(^|\/)vitest\.config\.ts$/,
  /(^|\/)eslint\.config\.mjs$/,
  /(^|\/).+\.config\.(js|mjs|cjs|ts|json)$/,
  /(^|\/).+\.ya?ml$/,
  /(^|\/).+\.toml$/,
];

const DOC_EXTENSIONS = new Set([".md", ".mdx"]);
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
const TEST_PATTERNS = [
  /\.test\.[cm]?[jt]sx?$/,
  /\.spec\.[cm]?[jt]sx?$/,
  /(^|\/)__tests__(\/|$)/,
];

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function isExcludedDirectory(dirName) {
  return EXCLUDED_DIR_NAMES.has(dirName);
}

function isGeneratedOrExcludedFile(fileName, relativePath) {
  if (EXCLUDED_FILE_NAMES.has(fileName)) {
    return true;
  }

  if (EXCLUDED_FILE_PATTERNS.some((pattern) => pattern.test(relativePath))) {
    return true;
  }

  if (OUTPUT_FILES.has(relativePath)) {
    return true;
  }

  if (relativePath.endsWith(".map")) {
    return true;
  }

  return false;
}

function isTestFile(relativePath) {
  return TEST_PATTERNS.some((pattern) => pattern.test(relativePath));
}

function isDocFile(relativePath) {
  return DOC_EXTENSIONS.has(path.extname(relativePath).toLowerCase());
}

function isSourceFile(relativePath) {
  const ext = path.extname(relativePath).toLowerCase();
  return SOURCE_EXTENSIONS.has(ext) && !isTestFile(relativePath);
}

function isConfigFile(relativePath) {
  const baseName = path.basename(relativePath);
  return IMPORTANT_FILE_NAMES.has(baseName) || CONFIG_FILE_PATTERNS.some((pattern) => pattern.test(relativePath));
}

function isImportantFile(relativePath) {
  const baseName = path.basename(relativePath);
  return IMPORTANT_FILE_NAMES.has(baseName) || relativePath.startsWith(".ai/brain/") || relativePath.startsWith("docs/") || relativePath.startsWith("project-context/") || relativePath.startsWith("knowledge-base/");
}

function classifyFile(relativePath) {
  const categories = [];

  if (isImportantFile(relativePath)) categories.push("important");
  if (isSourceFile(relativePath)) categories.push("source");
  if (isTestFile(relativePath)) categories.push("test");
  if (isDocFile(relativePath)) categories.push("doc");
  if (isConfigFile(relativePath)) categories.push("config");

  if (categories.length === 0) categories.push("other");
  return categories;
}

function moduleNameFor(relativePath) {
  const parts = relativePath.split("/");

  if (parts[0] === "src" && parts.length >= 3) return `${parts[0]}/${parts[1]}/${parts[2]}`;
  if (parts[0] === "app") return parts.length > 1 ? `${parts[0]}/${parts[1]}` : "app";
  if (parts[0] === "docs" && parts.length >= 2) return `${parts[0]}/${parts[1]}`;
  if (parts[0] === ".ai" && parts.length >= 3) return `${parts[0]}/${parts[1]}/${parts[2]}`;
  if (parts[0] === ".github" && parts.length >= 2) return `${parts[0]}/${parts[1]}`;
  if (parts[0] === ".codex" && parts.length >= 2) return `${parts[0]}/${parts[1]}`;
  if (parts[0] === ".agents" && parts.length >= 2) return `${parts[0]}/${parts[1]}`;

  return parts[0] || ".";
}

async function walkDirectory(root, current = ".") {
  const absoluteCurrent = current === "." ? root : path.join(root, current);
  const entries = await readdir(absoluteCurrent, { withFileTypes: true });
  const sortedEntries = entries.sort((a, b) => a.name.localeCompare(b.name));
  const directories = [];
  const files = [];

  for (const entry of sortedEntries) {
    const relativePath = current === "." ? entry.name : path.join(current, entry.name);
    const posixPath = toPosix(relativePath);

    if (entry.isDirectory()) {
      if (isExcludedDirectory(entry.name)) {
        continue;
      }

      directories.push(posixPath);
      const child = await walkDirectory(root, relativePath);
      directories.push(...child.directories);
      files.push(...child.files);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (isGeneratedOrExcludedFile(entry.name, posixPath)) {
      continue;
    }

    const fileStat = await stat(path.join(root, relativePath));
    files.push({
      path: posixPath,
      sizeBytes: fileStat.size,
      categories: classifyFile(posixPath),
      module: moduleNameFor(posixPath),
    });
  }

  return { directories, files };
}

async function readPackageScripts(root) {
  const packagePath = path.join(root, "package.json");
  const packageJson = JSON.parse(await readFile(packagePath, "utf8"));
  return packageJson.scripts || {};
}

function groupByModule(files) {
  const modules = new Map();

  for (const file of files) {
    if (!modules.has(file.module)) {
      modules.set(file.module, {
        name: file.module,
        files: [],
        sourceFiles: [],
        testFiles: [],
        docs: [],
        configs: [],
      });
    }

    const moduleInfo = modules.get(file.module);
    moduleInfo.files.push(file.path);
    if (file.categories.includes("source")) moduleInfo.sourceFiles.push(file.path);
    if (file.categories.includes("test")) moduleInfo.testFiles.push(file.path);
    if (file.categories.includes("doc")) moduleInfo.docs.push(file.path);
    if (file.categories.includes("config")) moduleInfo.configs.push(file.path);
  }

  return Array.from(modules.values()).sort((a, b) => a.name.localeCompare(b.name));
}

function countByCategory(files, category) {
  return files.filter((file) => file.categories.includes(category)).length;
}

function bulletList(items, emptyText = "- None detected.") {
  if (items.length === 0) return emptyText;
  return items.map((item) => `- \`${item}\``).join("\n");
}

function renderFileCatalog(index) {
  const importantFiles = index.files
    .filter((file) => file.categories.includes("important"))
    .map((file) => file.path);
  const sourceFiles = index.files
    .filter((file) => file.categories.includes("source"))
    .map((file) => file.path);
  const testFiles = index.files
    .filter((file) => file.categories.includes("test"))
    .map((file) => file.path);
  const docs = index.files
    .filter((file) => file.categories.includes("doc"))
    .map((file) => file.path);
  const configs = index.files
    .filter((file) => file.categories.includes("config"))
    .map((file) => file.path);

  return `# File Catalog

Generated by \`npm run brain:index\`.

## Summary

- Directories indexed: ${index.directories.length}
- Files indexed: ${index.files.length}
- Source files: ${countByCategory(index.files, "source")}
- Test files: ${countByCategory(index.files, "test")}
- Docs: ${countByCategory(index.files, "doc")}
- Config files: ${countByCategory(index.files, "config")}

## Package Scripts

${Object.entries(index.packageScripts)
  .map(([name, command]) => `- \`${name}\`: \`${command}\``)
  .join("\n")}

## Important Files

${bulletList(importantFiles)}

## Source Modules

${bulletList(sourceFiles)}

## Test Files

${bulletList(testFiles)}

## Docs

${bulletList(docs)}

## Config Files

${bulletList(configs)}
`;
}

function renderModuleMap(index) {
  return `# Module Map

Generated by \`npm run brain:index\`.

## Modules

${index.modules
  .map((moduleInfo) => {
    return `### \`${moduleInfo.name}\`

- Files: ${moduleInfo.files.length}
- Source: ${moduleInfo.sourceFiles.length}
- Tests: ${moduleInfo.testFiles.length}
- Docs: ${moduleInfo.docs.length}
- Configs: ${moduleInfo.configs.length}

Key files:
${bulletList(moduleInfo.files.slice(0, 12))}
`;
  })
  .join("\n")}
`;
}

async function main() {
  const root = process.cwd();
  const scanned = await walkDirectory(root);
  const directories = Array.from(new Set(scanned.directories)).sort();
  const files = scanned.files.sort((a, b) => a.path.localeCompare(b.path));
  const packageScripts = await readPackageScripts(root);
  const modules = groupByModule(files);

  const index = {
    generatedBy: "npm run brain:index",
    excluded: {
      directories: Array.from(EXCLUDED_DIR_NAMES).sort(),
      files: Array.from(EXCLUDED_FILE_NAMES).sort(),
      filePatterns: EXCLUDED_FILE_PATTERNS.map((pattern) => pattern.source).sort(),
      generatedOutputFiles: Array.from(OUTPUT_FILES).sort(),
    },
    packageManager: "npm",
    packageScripts,
    directories,
    files,
    modules,
  };

  const outputDir = path.join(root, OUTPUT_DIR);
  await writeFile(path.join(outputDir, "repo-map.json"), `${JSON.stringify(index, null, 2)}\n`, "utf8");
  await writeFile(path.join(outputDir, "file-catalog.md"), `${renderFileCatalog(index).trimEnd()}\n`, "utf8");
  await writeFile(path.join(outputDir, "module-map.md"), `${renderModuleMap(index).trimEnd()}\n`, "utf8");

  console.log(`Indexed ${files.length} files across ${directories.length} directories.`);
  console.log(path.join(outputDir, "repo-map.json"));
  console.log(path.join(outputDir, "file-catalog.md"));
  console.log(path.join(outputDir, "module-map.md"));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
