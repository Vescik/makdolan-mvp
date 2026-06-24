export type PreferenceTag =
  | "burger"
  | "chicken"
  | "pizza"
  | "kebab"
  | "sandwich"
  | "vegetarian"
  | "healthy";

export type MealSize = "snack" | "small_meal" | "regular_meal" | "filling_meal";

export type FulfillmentMode = "pickup" | "delivery" | "dine_in";

export type PriceSource = "manual_seed" | "user_observation" | "partner" | "official_api";

export type SearchInput = {
  budgetAmount: number;
  currency: "PLN" | "USD" | "EUR";
  locationLabel: string;
  distanceLimitKm: number;
  preferenceTags: PreferenceTag[];
  mealSize?: MealSize;
  fulfillmentMode?: FulfillmentMode;
};

export type RestaurantOutlet = {
  id: string;
  brandName: string;
  outletName: string;
  address: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  openNow: boolean;
};

export type MenuItemPrice = {
  amount: number;
  currency: SearchInput["currency"];
  source: PriceSource;
  lastVerifiedAt: string;
  confidence: number;
};

export type RecommendationCandidate = {
  id: string;
  restaurant: RestaurantOutlet;
  itemName: string;
  category: PreferenceTag;
  tags: PreferenceTag[];
  portionSize: MealSize;
  fulfillmentModes: FulfillmentMode[];
  price: MenuItemPrice;
  active: boolean;
};

export type ScoreBreakdown = {
  budgetFit: number;
  preferenceMatch: number;
  distanceScore: number;
  ratingScore: number;
  portionScore: number;
  freshnessScore: number;
};

export type ScoredRecommendation = RecommendationCandidate & {
  score: number;
  breakdown: ScoreBreakdown;
  reasons: string[];
};

