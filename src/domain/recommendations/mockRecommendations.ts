import {
  MenuItem,
  MockMenuItem,
  PreferenceTag,
  RecommendationCandidate,
  RestaurantBrand,
  RestaurantOutlet
} from "./types";

export const restaurantBrands: RestaurantBrand[] = [
  {
    id: "brand_mcdonalds_pl",
    name: "McDonald's",
    normalizedName: "mcdonalds",
    type: "chain"
  },
  {
    id: "brand_kfc_pl",
    name: "KFC",
    normalizedName: "kfc",
    type: "chain"
  },
  {
    id: "brand_burger_king_pl",
    name: "Burger King",
    normalizedName: "burger-king",
    type: "chain"
  },
  {
    id: "brand_subway_pl",
    name: "Subway",
    normalizedName: "subway",
    type: "chain"
  },
  {
    id: "brand_rzeszow_kebab",
    name: "Rzeszow Kebab",
    normalizedName: "rzeszow-kebab",
    type: "local"
  },
  {
    id: "brand_rzeszow_pizza",
    name: "Rzeszow Pizza",
    normalizedName: "rzeszow-pizza",
    type: "local"
  },
  {
    id: "brand_bar_domowy",
    name: "Bar Domowy",
    normalizedName: "bar-domowy",
    type: "local"
  },
  {
    id: "brand_rzeszow_noodle_box",
    name: "Rzeszow Noodle Box",
    normalizedName: "rzeszow-noodle-box",
    type: "local"
  }
];

export const restaurantOutlets: RestaurantOutlet[] = [
  {
    id: "outlet_mcd_rzeszow_centrum",
    brandId: "brand_mcdonalds_pl",
    name: "McDonald's Rzeszow Centrum",
    address: "ul. 3 Maja 10, Rzeszow",
    city: "Rzeszow",
    distanceKm: 0.6,
    rating: 4.1,
    isOpenNow: true
  },
  {
    id: "outlet_kfc_rzeszow_galeria",
    brandId: "brand_kfc_pl",
    name: "KFC Rzeszow Galeria",
    address: "al. Pilsudskiego 44, Rzeszow",
    city: "Rzeszow",
    distanceKm: 1.2,
    rating: 4,
    isOpenNow: true
  },
  {
    id: "outlet_bk_rzeszow",
    brandId: "brand_burger_king_pl",
    name: "Burger King Rzeszow",
    address: "ul. Krakowska 20, Rzeszow",
    city: "Rzeszow",
    distanceKm: 2.1,
    rating: 3.9,
    isOpenNow: false
  },
  {
    id: "outlet_subway_rzeszow",
    brandId: "brand_subway_pl",
    name: "Subway Rzeszow",
    address: "ul. Rejtana 20, Rzeszow",
    city: "Rzeszow",
    distanceKm: 1.8,
    rating: 4,
    isOpenNow: true
  },
  {
    id: "outlet_kebab_rzeszow",
    brandId: "brand_rzeszow_kebab",
    name: "Rzeszow Kebab",
    address: "ul. Grunwaldzka 12, Rzeszow",
    city: "Rzeszow",
    distanceKm: 0.9,
    rating: 4.4,
    isOpenNow: true
  },
  {
    id: "outlet_pizza_rzeszow",
    brandId: "brand_rzeszow_pizza",
    name: "Rzeszow Pizza",
    address: "ul. Jagiellonska 7, Rzeszow",
    city: "Rzeszow",
    distanceKm: 1.6,
    rating: 4.3,
    isOpenNow: true
  },
  {
    id: "outlet_bar_domowy",
    brandId: "brand_bar_domowy",
    name: "Bar Domowy",
    address: "ul. Lisa-Kuli 5, Rzeszow",
    city: "Rzeszow",
    distanceKm: 1.4,
    rating: 4.5,
    isOpenNow: true
  },
  {
    id: "outlet_noodle_box_rzeszow",
    brandId: "brand_rzeszow_noodle_box",
    name: "Rzeszow Noodle Box",
    address: "ul. Hetmanska 6, Rzeszow",
    city: "Rzeszow",
    distanceKm: 1.7,
    rating: 4.2,
    isOpenNow: true
  }
];

export const mockMenuItems: MockMenuItem[] = [
  {
    id: "item_mcd_cheeseburger",
    restaurantBrandName: "McDonald's",
    itemName: "Cheeseburger",
    estimatedPrice: 7.9,
    currency: "PLN",
    visibleTags: ["burger", "small", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-10",
    confidence: 72,
    internalTags: ["burger", "small", "quick"],
    portionSize: "small",
    brandId: "brand_mcdonalds_pl",
    active: true
  },
  {
    id: "item_mcd_small_fries",
    restaurantBrandName: "McDonald's",
    itemName: "Small fries",
    estimatedPrice: 8.5,
    currency: "PLN",
    visibleTags: ["vegetarian", "small", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-10",
    confidence: 70,
    internalTags: ["vegetarian", "small", "quick"],
    portionSize: "small",
    brandId: "brand_mcdonalds_pl",
    active: true
  },
  {
    id: "item_mcd_mcchicken",
    restaurantBrandName: "McDonald's",
    itemName: "McChicken",
    estimatedPrice: 18.9,
    currency: "PLN",
    visibleTags: ["chicken", "burger", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-10",
    confidence: 68,
    internalTags: ["chicken", "burger", "quick"],
    portionSize: "small",
    brandId: "brand_mcdonalds_pl",
    active: true
  },
  {
    id: "item_mcd_big_mac",
    restaurantBrandName: "McDonald's",
    itemName: "Big Mac",
    estimatedPrice: 19.9,
    currency: "PLN",
    visibleTags: ["burger", "filling", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-10",
    confidence: 68,
    internalTags: ["burger", "filling", "quick"],
    portionSize: "filling",
    brandId: "brand_mcdonalds_pl",
    active: true
  },
  {
    id: "item_kfc_chicken_wrap",
    restaurantBrandName: "KFC",
    itemName: "Chicken wrap",
    estimatedPrice: 18.99,
    currency: "PLN",
    visibleTags: ["chicken", "small", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-12",
    confidence: 70,
    internalTags: ["chicken", "small", "quick"],
    portionSize: "small",
    brandId: "brand_kfc_pl",
    active: true
  },
  {
    id: "item_kfc_chicken_box",
    restaurantBrandName: "KFC",
    itemName: "Small chicken box",
    estimatedPrice: 24.5,
    currency: "PLN",
    visibleTags: ["chicken", "filling", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-05-20",
    confidence: 55,
    internalTags: ["chicken", "filling", "quick"],
    portionSize: "filling",
    brandId: "brand_kfc_pl",
    active: true
  },
  {
    id: "item_kfc_chicken_bucket_solo",
    restaurantBrandName: "KFC",
    itemName: "Chicken bucket solo",
    estimatedPrice: 39.99,
    currency: "PLN",
    visibleTags: ["chicken", "filling", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-05-20",
    confidence: 52,
    internalTags: ["chicken", "filling", "quick"],
    portionSize: "filling",
    brandId: "brand_kfc_pl",
    active: true
  },
  {
    id: "item_bk_hamburger",
    restaurantBrandName: "Burger King",
    itemName: "Hamburger",
    estimatedPrice: 11.99,
    currency: "PLN",
    visibleTags: ["burger", "small", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-01",
    confidence: 65,
    internalTags: ["burger", "small", "quick"],
    portionSize: "small",
    brandId: "brand_burger_king_pl",
    active: true
  },
  {
    id: "item_bk_cheeseburger",
    restaurantBrandName: "Burger King",
    itemName: "Cheeseburger",
    estimatedPrice: 14.99,
    currency: "PLN",
    visibleTags: ["burger", "small", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-01",
    confidence: 62,
    internalTags: ["burger", "small", "quick"],
    portionSize: "small",
    brandId: "brand_burger_king_pl",
    active: true
  },
  {
    id: "item_bk_whopper_jr",
    restaurantBrandName: "Burger King",
    itemName: "Whopper Jr.",
    estimatedPrice: 19.99,
    currency: "PLN",
    visibleTags: ["burger", "filling", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-01",
    confidence: 62,
    internalTags: ["burger", "filling", "quick"],
    portionSize: "filling",
    brandId: "brand_burger_king_pl",
    active: true
  },
  {
    id: "item_subway_veggie_mini",
    restaurantBrandName: "Subway",
    itemName: "Veggie mini sub",
    estimatedPrice: 13.5,
    currency: "PLN",
    visibleTags: ["vegetarian", "small", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-21",
    confidence: 64,
    internalTags: ["vegetarian", "small", "quick"],
    portionSize: "small",
    brandId: "brand_subway_pl",
    active: true
  },
  {
    id: "item_subway_chicken_mini",
    restaurantBrandName: "Subway",
    itemName: "Chicken mini sub",
    estimatedPrice: 16.5,
    currency: "PLN",
    visibleTags: ["chicken", "small", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-21",
    confidence: 64,
    internalTags: ["chicken", "small", "quick"],
    portionSize: "small",
    brandId: "brand_subway_pl",
    active: true
  },
  {
    id: "item_subway_tuna_style_sub",
    restaurantBrandName: "Subway",
    itemName: "Quick filling sub",
    estimatedPrice: 24,
    currency: "PLN",
    visibleTags: ["filling", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-21",
    confidence: 60,
    internalTags: ["filling", "quick"],
    portionSize: "filling",
    brandId: "brand_subway_pl",
    active: true
  },
  {
    id: "item_subway_chicken_full",
    restaurantBrandName: "Subway",
    itemName: "Chicken full sub",
    estimatedPrice: 29.5,
    currency: "PLN",
    visibleTags: ["chicken", "filling", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-21",
    confidence: 60,
    internalTags: ["chicken", "filling", "quick"],
    portionSize: "filling",
    brandId: "brand_subway_pl",
    active: true
  },
  {
    id: "item_kebab_small",
    restaurantBrandName: "Rzeszow Kebab",
    itemName: "Small kebab",
    estimatedPrice: 22,
    currency: "PLN",
    visibleTags: ["kebab", "filling", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-20",
    confidence: 78,
    internalTags: ["kebab", "filling", "quick"],
    portionSize: "filling",
    brandId: "brand_rzeszow_kebab",
    active: true
  },
  {
    id: "item_kebab_box",
    restaurantBrandName: "Rzeszow Kebab",
    itemName: "Kebab box",
    estimatedPrice: 28,
    currency: "PLN",
    visibleTags: ["kebab", "filling", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-20",
    confidence: 76,
    internalTags: ["kebab", "filling", "quick"],
    portionSize: "filling",
    brandId: "brand_rzeszow_kebab",
    active: true
  },
  {
    id: "item_kebab_plate",
    restaurantBrandName: "Rzeszow Kebab",
    itemName: "Kebab plate",
    estimatedPrice: 38,
    currency: "PLN",
    visibleTags: ["kebab", "filling"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-20",
    confidence: 73,
    internalTags: ["kebab", "filling"],
    portionSize: "filling",
    brandId: "brand_rzeszow_kebab",
    active: true
  },
  {
    id: "item_pizza_slice_vege",
    restaurantBrandName: "Rzeszow Pizza",
    itemName: "Vegetarian pizza slice",
    estimatedPrice: 12,
    currency: "PLN",
    visibleTags: ["pizza", "vegetarian", "small"],
    source: "userObservation",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-03",
    confidence: 58,
    internalTags: ["pizza", "vegetarian", "small"],
    portionSize: "small",
    brandId: "brand_rzeszow_pizza",
    active: true
  },
  {
    id: "item_pizza_margherita_small",
    restaurantBrandName: "Rzeszow Pizza",
    itemName: "Small margherita",
    estimatedPrice: 24,
    currency: "PLN",
    visibleTags: ["pizza", "vegetarian", "small"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-05",
    confidence: 60,
    internalTags: ["pizza", "vegetarian", "small"],
    portionSize: "small",
    brandId: "brand_rzeszow_pizza",
    active: true
  },
  {
    id: "item_pizza_medium",
    restaurantBrandName: "Rzeszow Pizza",
    itemName: "Medium pizza",
    estimatedPrice: 39,
    currency: "PLN",
    visibleTags: ["pizza", "filling"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-04-01",
    confidence: 42,
    internalTags: ["pizza", "filling"],
    portionSize: "filling",
    brandId: "brand_rzeszow_pizza",
    active: true
  },
  {
    id: "item_lunch_soup",
    restaurantBrandName: "Bar Domowy",
    itemName: "Soup and roll",
    estimatedPrice: 14,
    currency: "PLN",
    visibleTags: ["vegetarian", "small", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-18",
    confidence: 74,
    internalTags: ["vegetarian", "small", "quick"],
    portionSize: "small",
    brandId: "brand_bar_domowy",
    active: true
  },
  {
    id: "item_lunch_vegetarian_set",
    restaurantBrandName: "Bar Domowy",
    itemName: "Vegetarian lunch set",
    estimatedPrice: 29,
    currency: "PLN",
    visibleTags: ["vegetarian", "filling", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-18",
    confidence: 72,
    internalTags: ["vegetarian", "filling", "quick"],
    portionSize: "filling",
    brandId: "brand_bar_domowy",
    active: true
  },
  {
    id: "item_lunch_set",
    restaurantBrandName: "Bar Domowy",
    itemName: "Lunch set",
    estimatedPrice: 32,
    currency: "PLN",
    visibleTags: ["filling", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-18",
    confidence: 74,
    internalTags: ["filling", "quick"],
    portionSize: "filling",
    brandId: "brand_bar_domowy",
    active: true
  },
  {
    id: "item_noodle_vegetarian_small",
    restaurantBrandName: "Rzeszow Noodle Box",
    itemName: "Vegetarian small noodle box",
    estimatedPrice: 17.5,
    currency: "PLN",
    visibleTags: ["vegetarian", "small", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-22",
    confidence: 66,
    internalTags: ["vegetarian", "small", "quick"],
    portionSize: "small",
    brandId: "brand_rzeszow_noodle_box",
    active: true
  },
  {
    id: "item_noodle_chicken_box",
    restaurantBrandName: "Rzeszow Noodle Box",
    itemName: "Chicken noodle box",
    estimatedPrice: 23,
    currency: "PLN",
    visibleTags: ["chicken", "filling", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-22",
    confidence: 66,
    internalTags: ["chicken", "filling", "quick"],
    portionSize: "filling",
    brandId: "brand_rzeszow_noodle_box",
    active: true
  },
  {
    id: "item_noodle_vegetarian_full",
    restaurantBrandName: "Rzeszow Noodle Box",
    itemName: "Vegetarian full noodle box",
    estimatedPrice: 31,
    currency: "PLN",
    visibleTags: ["vegetarian", "filling", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-22",
    confidence: 64,
    internalTags: ["vegetarian", "filling", "quick"],
    portionSize: "filling",
    brandId: "brand_rzeszow_noodle_box",
    active: true
  },
  {
    id: "item_noodle_chicken_large",
    restaurantBrandName: "Rzeszow Noodle Box",
    itemName: "Large chicken noodle box",
    estimatedPrice: 39,
    currency: "PLN",
    visibleTags: ["chicken", "filling", "quick"],
    source: "manualSeed",
    sourceUrl: null,
    lastVerifiedAt: "2026-06-22",
    confidence: 62,
    internalTags: ["chicken", "filling", "quick"],
    portionSize: "filling",
    brandId: "brand_rzeszow_noodle_box",
    active: true
  }
];

export const menuItems: MenuItem[] = mockMenuItems.map((item) => ({
  id: item.id,
  brandId: item.brandId,
  name: item.itemName,
  category: item.internalTags[0] ?? "quick",
  tags: item.internalTags,
  portionSize: item.portionSize,
  basePrice: {
    amount: item.estimatedPrice,
    currency: item.currency,
    source: item.source,
    sourceUrl: item.sourceUrl,
    lastVerifiedAt: item.lastVerifiedAt,
    confidence: item.confidence
  },
  fulfillmentModes: ["pickup", "dineIn"],
  active: item.active
}));

export const mockRecommendations: RecommendationCandidate[] = menuItems.flatMap((menuItem) => {
  const brand = restaurantBrands.find((item) => item.id === menuItem.brandId);
  const outlet = restaurantOutlets.find((item) => item.brandId === menuItem.brandId);

  return brand && outlet
    ? [
        {
          id: `${outlet.id}_${menuItem.id}`,
          brand,
          outlet,
          menuItem
        }
      ]
    : [];
});

export function isApprovedSprint1Tag(tag: string): tag is PreferenceTag {
  return ["chicken", "burger", "pizza", "kebab", "vegetarian", "small", "filling", "quick"].includes(tag);
}
