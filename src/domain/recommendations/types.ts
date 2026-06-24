export type PreferenceTag =
  | "chicken"
  | "burger"
  | "pizza"
  | "kebab"
  | "vegetarian"
  | "small"
  | "filling"
  | "quick";

export type PortionSize = "small" | "filling";

export type FulfillmentMode = "pickup" | "dineIn";

export type PriceSource = "manualSeed" | "userObservation" | "partner" | "officialApi";

export type MockMenuItem = {
  id: string;
  restaurantBrandName: string;
  itemName: string;
  estimatedPrice: number;
  currency: "PLN";
  visibleTags: PreferenceTag[];
  source: PriceSource;
  sourceUrl: string | null;
  lastVerifiedAt: string;
  confidence: number;
  internalTags: PreferenceTag[];
  portionSize: PortionSize;
  brandId: string;
  active: boolean;
};

export type SearchInput = {
  budgetAmount: number;
  currency: "PLN";
  locationLabel: string;
  distanceLimitKm: number;
  selectedTags: PreferenceTag[];
  excludedTags?: PreferenceTag[];
  portionSizePreference?: PortionSize;
  fulfillmentMode?: FulfillmentMode;
};

export type RestaurantBrand = {
  id: string;
  name: string;
  normalizedName: string;
  type: "chain" | "local";
};

export type RestaurantOutlet = {
  id: string;
  brandId: string;
  name: string;
  address: string;
  city: "Rzeszow";
  distanceKm: number;
  rating: number;
  isOpenNow: boolean;
};

export type MenuItemPrice = {
  amount: number;
  currency: SearchInput["currency"];
  source: PriceSource;
  sourceUrl: string | null;
  lastVerifiedAt: string;
  confidence: number;
};

export type MenuItem = {
  id: string;
  brandId: string;
  name: string;
  category: PreferenceTag;
  tags: PreferenceTag[];
  portionSize: PortionSize;
  basePrice: MenuItemPrice;
  fulfillmentModes: FulfillmentMode[];
  active: boolean;
};

export type UserPreference = {
  preferredTags: PreferenceTag[];
  excludedTags: PreferenceTag[];
  preferredPortionSize?: PortionSize;
  maxDistanceKm: number;
  preferredFulfillmentMode?: FulfillmentMode;
};

export type RecommendationCandidate = {
  id: string;
  brand: RestaurantBrand;
  outlet: RestaurantOutlet;
  menuItem: MenuItem;
};

export type ScoreBreakdown = {
  budgetFit: number;
  preferenceMatch: number;
  distanceScore: number;
  restaurantRating: number;
  portionScore: number;
  freshnessScore: number;
};

export type RecommendationResult = RecommendationCandidate & {
  estimatedTotalPrice: number;
  score: number;
  scoreBreakdown: ScoreBreakdown;
  reasons: string[];
  displayTags: PreferenceTag[];
  confidence: number;
};

export type RecommendationFallback = {
  title: string;
  message: string;
  suggestions: string[];
};

export type RecommendationResponse = {
  results: RecommendationResult[];
  fallback: RecommendationFallback | null;
};

export type RecommendationCardView = {
  restaurantName: string;
  itemName: string;
  estimatedPrice: string;
  displayTags: PreferenceTag[];
};
