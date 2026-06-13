// ============================================
// lib/productData.js - Centralized Product Data
// ============================================
// This file contains all product data and can be imported anywhere in your project

export const PRODUCTS_DATA = {
  "pearl-crochet-pouch": {
    id: 1,
    slug: "pearl-crochet-pouch",
    name: "Pearl Crochet Pouch",
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 128,
    badge: "Bestseller",
    badgeColor: "bg-amber-500",
    images: [
      "/images/Granny_Sweater.png",
      "/images/Bags_&_Pouches.png",
      "/images/Pearl_Pouch.png",
      "/images/Handmade_Wallet.png",
    ],
    description:
      "A delicate handcrafted crochet pouch made with premium cotton yarn, finished with pearl-style beading details. Perfect for carrying small essentials with a touch of elegance.",
    details: [
      "100% premium cotton yarn",
      "Hand-crocheted, takes 3-4 days to make",
      "Soft satin lining inside",
      "Dimensions: 18cm x 14cm",
      "Available in multiple colors",
    ],
    colors: ["#c97b84", "#8fa37e", "#d4a373", "#9a8c98"],
  },
  "elegant-crochet-handbag": {
    id: 2,
    slug: "elegant-crochet-handbag",
    name: "Elegant Crochet Handbag",
    price: 2499,
    originalPrice: 2999,
    rating: 5.0,
    reviews: 96,
    badge: "Bestseller",
    badgeColor: "bg-amber-500",
    images: [
      "/images/Bags_&_Pouches.png",
      "/images/Granny_Sweater.png",
      "/images/strawberry_Backpack.png",
    ],
    description:
      "An elegant, sturdy crochet handbag designed for everyday use. Combines timeless granny-square patterns with a modern silhouette and reinforced handles.",
    details: [
      "Reinforced cotton-blend yarn",
      "Hand-crocheted, takes 5-6 days to make",
      "Magnetic snap closure",
      "Dimensions: 32cm x 24cm x 10cm",
      "Includes inner pocket",
    ],
    colors: ["#e9c46a", "#8fa37e", "#bc6c25"],
  },
  "crochet-sheep-shamsheer": {
    id: 3,
    slug: "crochet-sheep-shamsheer",
    name: "Crochet Sheep (Shamsheer)",
    price: 899,
    originalPrice: 1099,
    rating: 4.9,
    reviews: 110,
    badge: null,
    images: [
      "/images/Crochet_Sheep.png",
      "/images/Home_Decor.png",
      "/images/Wall_Hanging.png",
    ],
    description:
      "A soft, huggable crochet sheep made with care using premium yarn — a perfect handmade gift or decor piece for any room.",
    details: [
      "100% premium cotton yarn",
      "Hand-crocheted, takes 2-3 days to make",
      "Safety-tested filling, child-safe",
      "Dimensions: 20cm x 15cm x 12cm",
      "Available in custom colors on request",
    ],
    colors: ["#2b2b2b", "#f1faee", "#e9c46a"],
  },
  "floral-wall-hanging": {
    id: 4,
    slug: "floral-wall-hanging",
    name: "Floral Wall Hanging",
    price: 1199,
    originalPrice: 1499,
    rating: 4.8,
    reviews: 65,
    badge: null,
    images: [
      "/images/Home_Decor.png",
      "/images/Wall_Hanging.png",
      "/images/Bags_&_Pouches.png",
    ],
    description: "Beautiful handcrafted floral wall hanging with intricate details.",
    details: [
      "100% premium cotton yarn",
      "Hand-crocheted, takes 4-5 days to make",
      "Easy wall mount",
      "Dimensions: 35cm x 35cm",
      "Perfect for any room",
    ],
    colors: ["#8fa37e", "#e9c46a", "#d4a373"],
  },
  "dreamcatcher-wall-hanging": {
    id: 5,
    slug: "dreamcatcher-wall-hanging",
    name: "Dreamcatcher Wall Hanging",
    price: 899,
    originalPrice: 1199,
    rating: 4.8,
    reviews: 72,
    badge: null,
    images: [
      "/images/Wall_Hanging.png",
      "/images/Home_Decor.png",
      "/images/Granny_Sweater.png",
    ],
    description: "Mystical dreamcatcher wall hanging with beautiful bohemian design.",
    details: [
      "Premium yarn with natural beads",
      "Hand-crafted, takes 3-4 days to make",
      "Includes hanging string",
      "Dimensions: 28cm diameter",
      "Traditional bohemian style",
    ],
    colors: ["#c97b84", "#8fa37e", "#f1faee"],
  },
  "blush-crocheted-potli-bag": {
    id: 6,
    slug: "blush-crocheted-potli-bag",
    name: "Blush Crocheted Potli Bag",
    price: 1499,
    originalPrice: 1899,
    rating: 5.0,
    reviews: 93,
    badge: null,
    images: [
      "/images/strawberry_Backpack.png",
      "/images/Bags_&_Pouches.png",
      "/images/Pearl_Pouch.png",
    ],
    description: "Elegant potli bag with traditional charm and modern aesthetics.",
    details: [
      "Premium cotton-blend yarn",
      "Hand-crocheted, takes 4-5 days to make",
      "Magnetic closure",
      "Dimensions: 22cm x 20cm",
      "Perfect for festive occasions",
    ],
    colors: ["#c97b84", "#e9c46a", "#8fa37e"],
  },
};

// Default product (fallback)
export const DEFAULT_PRODUCT = {
  id: 0,
  slug: "unknown",
  name: "Handmade Crochet Product",
  price: 899,
  originalPrice: 1099,
  rating: 4.9,
  reviews: 110,
  badge: null,
  images: [
    "/images/Crochet_Sheep.png",
    "/images/Home_Decor.png",
    "/images/Wall_Hanging.png",
  ],
  description:
    "A beautiful handmade crochet product made with care using premium yarn.",
  details: [
    "100% premium cotton yarn",
    "Hand-crocheted with care",
    "Safety-tested materials",
    "Available in custom colors",
  ],
  colors: ["#2b2b2b", "#f1faee", "#e9c46a"],
};

// Get product by slug
export const getProductBySlug = (slug) => {
  return PRODUCTS_DATA[slug] || DEFAULT_PRODUCT;
};

// Get all products as array
export const getAllProducts = () => {
  return Object.values(PRODUCTS_DATA);
};

// Get related products (filter out current product)
export const getRelatedProducts = (currentSlug, limit = 6) => {
  return getAllProducts()
    .filter((p) => p.slug !== currentSlug)
    .slice(0, limit)
    .map((product) => ({
      slug: product.slug,
      name: product.name,
      price: product.price,
      rating: product.rating,
      reviews: product.reviews,
      img: product.images[0],
      bg: getBgColor(product.id),
    }));
};

// Helper function to assign background colors
const getBgColor = (id) => {
  const bgColors = [
    "bg-gradient-to-br from-green-50 to-emerald-100",
    "bg-gradient-to-br from-yellow-50 to-amber-100",
    "bg-gradient-to-br from-slate-50 to-gray-100",
    "bg-gradient-to-br from-green-50 to-teal-100",
    "bg-gradient-to-br from-rose-50 to-pink-100",
    "bg-gradient-to-br from-pink-50 to-rose-100",
  ];
  return bgColors[id % bgColors.length];
};