#!/usr/bin/env node
/* global console */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const TEXT_TARGETS = [
  ".ai/brain/agent-start.md",
  ".ai/brain/README.md",
  ".ai/brain/adapters",
  ".ai/brain/certification",
  ".ai/brain/governance",
  ".ai/brain/knowledge",
  ".ai/brain/memory",
  ".ai/brain/index",
  ".ai/brain/context-packs",
  ".ai/brain/loop-harness",
  ".ai/brain/planning",
  ".ai/brain/reviews",
  ".ai/brain/templates",
  "docs",
  "project-context",
  "knowledge-base",
  "AGENTS.md",
  "README.md",
];

const TEXT_EXTENSIONS = new Set([".md", ".json"]);
const SOURCE_HINT_PREFIXES = ["app/", "src/"];
const DEFAULT_LIMIT = 8;

function usage() {
  return `Usage:
  npm run brain:search -- "query"
  npm run brain:search -- "query" --limit=5
`;
}

function parseArgs(argv) {
  const queryParts = [];
  const options = {
    limit: DEFAULT_LIMIT,
  };

  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    if (arg.startsWith("--limit=")) {
      const parsedLimit = Number.parseInt(arg.slice("--limit=".length), 10);
      if (Number.isFinite(parsedLimit) && parsedLimit > 0) {
        options.limit = Math.min(parsedLimit, 20);
      }
      continue;
    }

    queryParts.push(arg);
  }

  return {
    query: queryParts.join(" ").trim(),
    ...options,
  };
}

function tokenize(value) {
  return Array.from(
    new Set(
      value
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((token) => token.length > 1),
    ),
  );
}

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function truncate(value, length = 220) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= length) return normalized;
  return `${normalized.slice(0, length - 1).trim()}…`;
}

async function pathExists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function collectTextFiles(root, target) {
  const absoluteTarget = path.join(root, target);
  if (!(await pathExists(absoluteTarget))) return [];

  const targetStat = await stat(absoluteTarget);
  if (targetStat.isFile()) {
    return TEXT_EXTENSIONS.has(path.extname(target).toLowerCase()) ? [target] : [];
  }

  const files = [];
  const entries = await readdir(absoluteTarget, { withFileTypes: true });
  const sortedEntries = entries.sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of sortedEntries) {
    const relativePath = toPosix(path.join(target, entry.name));
    if (entry.isDirectory()) {
      files.push(...(await collectTextFiles(root, relativePath)));
      continue;
    }

    if (!entry.isFile()) continue;
    if (!TEXT_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) continue;

    files.push(relativePath);
  }

  return files;
}

function extractHeadings(content) {
  return content
    .split(/\r?\n/)
    .filter((line) => /^#{1,6}\s+/.test(line))
    .map((line) => line.replace(/^#{1,6}\s+/, "").trim());
}

function scoreTextRecord({ path: filePath, content, headings }, query, tokens) {
  const lowerQuery = query.toLowerCase();
  const lowerPath = filePath.toLowerCase();
  const lowerContent = content.toLowerCase();
  const lowerHeadings = headings.join(" ").toLowerCase();
  let score = 0;

  if (lowerPath.includes(lowerQuery)) score += 30;
  if (lowerHeadings.includes(lowerQuery)) score += 24;
  if (lowerContent.includes(lowerQuery)) score += 16;

  for (const token of tokens) {
    if (lowerPath.includes(token)) score += 7;
    if (lowerHeadings.includes(token)) score += 6;

    const matches = lowerContent.match(new RegExp(`\\b${escapeRegExp(token)}\\b`, "g"));
    if (matches) score += Math.min(matches.length, 8) * 2;
  }

  return score;
}

function scoreSourceHint(file, query, tokens) {
  const lowerQuery = query.toLowerCase();
  const haystack = `${file.path} ${file.module || ""} ${(file.categories || []).join(" ")}`.toLowerCase();
  let score = 0;

  if (haystack.includes(lowerQuery)) score += 22;
  for (const token of tokens) {
    if (haystack.includes(token)) score += 8;
  }

  return score;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function snippetForContent(content, query, tokens) {
  const lines = content.split(/\r?\n/);
  const lowerQuery = query.toLowerCase();
  const matchingLine =
    lines.find((line) => line.toLowerCase().includes(lowerQuery)) ||
    lines.find((line) => tokens.some((token) => line.toLowerCase().includes(token))) ||
    lines.find((line) => line.trim().length > 0) ||
    "";

  return truncate(matchingLine);
}

async function buildTextRecords(root) {
  const targetFiles = new Set();

  for (const target of TEXT_TARGETS) {
    for (const file of await collectTextFiles(root, target)) {
      targetFiles.add(file);
    }
  }

  const records = [];
  for (const filePath of Array.from(targetFiles).sort()) {
    const content = await readFile(path.join(root, filePath), "utf8");
    records.push({
      type: "text",
      path: filePath,
      headings: extractHeadings(content),
      content,
    });
  }

  return records;
}

async function buildSourceHintRecords(root) {
  const repoMapPath = path.join(root, ".ai", "brain", "index", "repo-map.json");
  if (!(await pathExists(repoMapPath))) return [];

  const repoMap = JSON.parse(await readFile(repoMapPath, "utf8"));
  const files = Array.isArray(repoMap.files) ? repoMap.files : [];

  return files
    .filter((file) => SOURCE_HINT_PREFIXES.some((prefix) => file.path.startsWith(prefix)))
    .filter((file) => file.categories?.includes("source") || file.categories?.includes("test"))
    .map((file) => ({
      type: "source-filename",
      path: file.path,
      module: file.module,
      categories: file.categories || [],
    }));
}

function formatResult(result, index) {
  return `${index + 1}. \`${result.path}\` (${result.type}, score ${result.score})
   ${result.snippet}`;
}

function suggestedNextFiles(results) {
  const suggestions = [];
  const seen = new Set();

  for (const result of results) {
    if (seen.has(result.path)) continue;
    seen.add(result.path);
    const reason = result.type === "source-filename" ? "source/test filename matched the query" : "content or heading matched the query";
    suggestions.push(`- \`${result.path}\`: ${reason}.`);
    if (suggestions.length >= 5) break;
  }

  return suggestions;
}

async function search({ query, limit }) {
  const root = process.cwd();
  const tokens = tokenize(query);
  const textRecords = await buildTextRecords(root);
  const sourceHintRecords = await buildSourceHintRecords(root);
  const scored = [];

  for (const record of textRecords) {
    const score = scoreTextRecord(record, query, tokens);
    if (score <= 0) continue;
    scored.push({
      type: "text",
      path: record.path,
      score,
      snippet: snippetForContent(record.content, query, tokens),
    });
  }

  for (const record of sourceHintRecords) {
    const score = scoreSourceHint(record, query, tokens);
    if (score <= 0) continue;
    scored.push({
      type: "source-filename",
      path: record.path,
      score,
      snippet: truncate(`Module: ${record.module}; categories: ${record.categories.join(", ")}. Inspect the file directly before planning or editing.`),
    });
  }

  return scored
    .sort((a, b) => b.score - a.score || a.path.localeCompare(b.path))
    .slice(0, limit);
}

async function main() {
  const parsed = parseArgs(process.argv.slice(2));

  if (parsed.help) {
    console.log(usage());
    return;
  }

  if (!parsed.query) {
    console.error("Missing search query.");
    console.error(usage());
    process.exit(1);
  }

  const results = await search(parsed);
  console.log(`# AI Brain Search`);
  console.log(`Query: ${parsed.query}`);
  console.log("");

  if (results.length === 0) {
    console.log("No matches found.");
    console.log("");
    console.log("Suggested next files:");
    console.log("- `.ai/brain/index/file-catalog.md`: inspect the repository catalog.");
    console.log("- `.ai/brain/knowledge/agent-session-start.md`: restart from the session checklist.");
    return;
  }

  console.log("## Top Matches");
  console.log("");
  console.log(results.map(formatResult).join("\n"));
  console.log("");
  console.log("## Suggested Next Files To Inspect");
  console.log("");
  console.log(suggestedNextFiles(results).join("\n"));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
