import { RecommendationCandidate } from "./types";

export const mockRecommendations: RecommendationCandidate[] = [
  {
    id: "mcd-cheeseburger-warsaw",
    restaurant: {
      id: "place_mcd_warsaw_centrum",
      brandName: "McDonald's",
      outletName: "McDonald's Centrum",
      address: "Marszalkowska 100, Warsaw",
      distanceKm: 0.6,
      rating: 4.1,
      reviewCount: 1800,
      openNow: true
    },
    itemName: "Cheeseburger",
    category: "burger",
    tags: ["burger"],
    portionSize: "small_meal",
    fulfillmentModes: ["pickup", "dine_in"],
    price: {
      amount: 7.9,
      currency: "PLN",
      source: "manual_seed",
      lastVerifiedAt: "2026-06-10",
      confidence: 72
    },
    active: true
  },
  {
    id: "kfc-chicken-strips-warsaw",
    restaurant: {
      id: "place_kfc_warsaw_centrum",
      brandName: "KFC",
      outletName: "KFC Centrum",
      address: "Aleje Jerozolimskie 42, Warsaw",
      distanceKm: 1.1,
      rating: 4,
      reviewCount: 1320,
      openNow: true
    },
    itemName: "Chicken strips small box",
    category: "chicken",
    tags: ["chicken"],
    portionSize: "regular_meal",
    fulfillmentModes: ["pickup", "delivery", "dine_in"],
    price: {
      amount: 18.99,
      currency: "PLN",
      source: "manual_seed",
      lastVerifiedAt: "2026-06-12",
      confidence: 70
    },
    active: true
  },
  {
    id: "local-kebab-small",
    restaurant: {
      id: "place_local_kebab_warsaw",
      brandName: "Local Kebab",
      outletName: "Local Kebab Test",
      address: "Chmielna 12, Warsaw",
      distanceKm: 0.9,
      rating: 4.5,
      reviewCount: 540,
      openNow: true
    },
    itemName: "Small kebab",
    category: "kebab",
    tags: ["kebab"],
    portionSize: "filling_meal",
    fulfillmentModes: ["pickup", "dine_in"],
    price: {
      amount: 18,
      currency: "PLN",
      source: "manual_seed",
      lastVerifiedAt: "2026-06-20",
      confidence: 78
    },
    active: true
  },
  {
    id: "pizza-slice-margherita",
    restaurant: {
      id: "place_pizza_warsaw",
      brandName: "Pizza Corner",
      outletName: "Pizza Corner",
      address: "Zlota 8, Warsaw",
      distanceKm: 1.7,
      rating: 4.3,
      reviewCount: 410,
      openNow: true
    },
    itemName: "Margherita slice",
    category: "pizza",
    tags: ["pizza", "vegetarian"],
    portionSize: "small_meal",
    fulfillmentModes: ["pickup", "dine_in"],
    price: {
      amount: 12,
      currency: "PLN",
      source: "user_observation",
      lastVerifiedAt: "2026-06-03",
      confidence: 58
    },
    active: true
  },
  {
    id: "subway-veggie-six-inch",
    restaurant: {
      id: "place_subway_warsaw",
      brandName: "Subway",
      outletName: "Subway Central",
      address: "Emilii Plater 20, Warsaw",
      distanceKm: 2.4,
      rating: 4.2,
      reviewCount: 760,
      openNow: true
    },
    itemName: "Veggie 6-inch sub",
    category: "sandwich",
    tags: ["sandwich", "vegetarian", "healthy"],
    portionSize: "regular_meal",
    fulfillmentModes: ["pickup", "dine_in"],
    price: {
      amount: 16.99,
      currency: "PLN",
      source: "manual_seed",
      lastVerifiedAt: "2026-05-15",
      confidence: 62
    },
    active: true
  }
];

