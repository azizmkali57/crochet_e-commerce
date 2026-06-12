"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  FiHeart,
  FiShoppingCart,
  FiShare2,
  FiTruck,
  FiRefreshCw,
  FiShield,
  FiMinus,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { BsStarFill } from "react-icons/bs";
import { useCart } from "@/components/context/CartContext";

// ---------- SAMPLE PRODUCT DATA (replace with API/DB fetch) ----------
const PRODUCTS_DATA = {
  "pearl-crochet-pouch": {
    id: 1,
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
};

// Fallback for any slug not in the data (so the page never crashes during dev)
const DEFAULT_PRODUCT = {
  id: 0,
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
};

// Related products shown at the bottom
const RELATED_PRODUCTS = [
  {
    slug: "pearl-crochet-pouch",
    name: "Pearl Crochet Pouch",
    price: 1299,
    rating: 4.9,
    reviews: 128,
    img: "/images/Granny_Sweater.png",
    bg: "bg-gradient-to-br from-green-50 to-emerald-100",
  },
  {
    slug: "elegant-crochet-handbag",
    name: "Elegant Crochet Handbag",
    price: 2499,
    rating: 5.0,
    reviews: 96,
    img: "/images/Bags_&_Pouches.png",
    bg: "bg-gradient-to-br from-yellow-50 to-amber-100",
  },
  {
    slug: "crochet-sheep-shamsheer",
    name: "Crochet Sheep (Shamsheer)",
    price: 899,
    rating: 4.9,
    reviews: 110,
    img: "/images/Crochet_Sheep.png",
    bg: "bg-gradient-to-br from-slate-50 to-gray-100",
  },
  {
    slug: "floral-wall-hanging",
    name: "Floral Wall Hanging",
    price: 1199,
    rating: 4.8,
    reviews: 65,
    img: "/images/Home_Decor.png",
    bg: "bg-gradient-to-br from-green-50 to-teal-100",
  },
  {
    slug: "dreamcatcher-wall-hanging",
    name: "Dreamcatcher Wall Hanging",
    price: 899,
    rating: 4.8,
    reviews: 72,
    img: "/images/Wall_Hanging.png",
    bg: "bg-gradient-to-br from-rose-50 to-pink-100",
  },
  {
    slug: "blush-crocheted-potli-bag",
    name: "Blush Crocheted Potli Bag",
    price: 1499,
    rating: 5.0,
    reviews: 93,
    img: "/images/strawberry_Backpack.png",
    bg: "bg-gradient-to-br from-pink-50 to-rose-100",
  },
];

// ---------- COMPONENTS ----------
function StarRating({ rating, size = "text-sm" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <BsStarFill
          key={s}
          className={`${size} ${
            s <= Math.round(rating) ? "text-amber-400" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function ImageGallery({ images, productName }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () =>
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const goNext = () =>
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="w-full">
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-50 aspect-square mb-4 group">
        <img
          src={images[activeIndex]}
          alt={`${productName} - image ${activeIndex + 1}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `https://placehold.co/600x600/e8f0e0/4a6741?text=${encodeURIComponent(
              productName,
            )}`;
          }}
        />

        {/* Prev/Next arrows - visible on hover (desktop) and always on mobile */}
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors md:opacity-0 md:group-hover:opacity-100"
            >
              <FiChevronLeft className="text-gray-700" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors md:opacity-0 md:group-hover:opacity-100"
            >
              <FiChevronRight className="text-gray-700" />
            </button>
          </>
        )}

        {/* Image counter */}
        <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative rounded-xl overflow-hidden aspect-square transition-all ${
              i === activeIndex
                ? "ring-2 ring-[#4a6741] ring-offset-2"
                : "ring-1 ring-gray-200 hover:ring-[#4a6741]/50"
            }`}
          >
            <img
              src={img}
              alt={`${productName} thumbnail ${i + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://placehold.co/150x150/e8f0e0/4a6741?text=${i + 1}`;
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function RelatedProductCard({ product }) {
  return (
    <Link
      href={`/collection/${product.slug}`}
      className={`relative rounded-2xl ${product.bg} overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 flex-shrink-0 w-[180px] sm:w-[220px]`}
    >
      <button
        onClick={(e) => e.preventDefault()}
        className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
      >
        <FiHeart className="text-sm text-gray-400" />
      </button>
      <div className="aspect-square overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://placehold.co/300x300/e8f0e0/4a6741?text=${encodeURIComponent(
              product.name,
            )}`;
          }}
        />
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-gray-800 leading-snug mb-1 line-clamp-1">
          {product.name}
        </p>
        <p className="text-sm font-bold text-[#4a6741] mb-1.5">
          ₹{product.price.toLocaleString()}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <StarRating rating={product.rating} size="text-xs" />
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
          <button
            onClick={(e) => e.preventDefault()}
            className="w-8 h-8 rounded-full bg-[#4a6741] flex items-center justify-center text-white hover:bg-[#3a5331] transition-colors shadow-sm"
          >
            <FiShoppingCart className="text-xs" />
          </button>
        </div>
      </div>
    </Link>
  );
}

// ---------- MAIN PAGE ----------
export default function ProductDetailPage() {
  const { addToCart } = useCart();
  const params = useParams();
  const slug = params?.slug;

  const product = PRODUCTS_DATA[slug] || DEFAULT_PRODUCT;

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <div className="min-h-screen bg-[#faf8f4] font-sans">
      <Header />

      <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-28 lg:pt-32 pb-16">
        {/* Breadcrumb */}
        <nav className="text-xs sm:text-sm text-gray-500 mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#4a6741] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/collection"
            className="hover:text-[#4a6741] transition-colors"
          >
            Collections
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        {/* Main product section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT: Image gallery */}
          <ImageGallery images={product.images} productName={product.name} />

          {/* RIGHT: Product info */}
          <div>
            {product.badge && (
              <span
                className={`inline-block text-white text-xs font-semibold px-3 py-1 rounded-full ${product.badgeColor} mb-4`}
              >
                {product.badge}
              </span>
            )}

            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={product.rating} />
              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <p className="text-2xl sm:text-3xl font-bold text-[#4a6741]">
                ₹{product.price.toLocaleString()}
              </p>
              {product.originalPrice && (
                <>
                  <p className="text-lg text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </p>
                  <span className="text-xs font-semibold text-rose-500 bg-rose-50 px-2 py-1 rounded-full">
                    {discountPercent}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color selector */}
            {product.colors && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  Choose Color
                </p>
                <div className="flex items-center gap-3">
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      className={`w-9 h-9 rounded-full transition-all ${
                        selectedColor === i
                          ? "ring-2 ring-[#4a6741] ring-offset-2"
                          : "ring-1 ring-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity selector */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-800 mb-3">
                Quantity
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                  >
                    <FiMinus className="text-sm" />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                  >
                    <FiPlus className="text-sm" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images?.[0],
                  })
                }
                className="flex-1 flex items-center justify-center gap-2 bg-[#4a6741] text-white px-6 py-3.5 rounded-full font-semibold hover:bg-[#3a5331] transition-colors shadow-sm"
              >
                <FiShoppingCart />
                Add to Cart
              </button>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="flex items-center justify-center gap-2 border border-gray-200 px-6 py-3.5 rounded-full font-medium text-gray-700 hover:border-[#4a6741] transition-colors"
              >
                <FiHeart
                  className={
                    wishlisted ? "fill-rose-500 text-rose-500" : "text-gray-500"
                  }
                />
                {wishlisted ? "Wishlisted" : "Wishlist"}
              </button>
              <button className="flex items-center justify-center gap-2 border border-gray-200 px-5 py-3.5 rounded-full font-medium text-gray-700 hover:border-[#4a6741] transition-colors">
                <FiShare2 />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-6">
              <div className="flex flex-col items-center text-center gap-2">
                <FiTruck className="text-xl text-[#4a6741]" />
                <p className="text-xs text-gray-600">Worldwide Delivery</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <FiRefreshCw className="text-xl text-[#4a6741]" />
                <p className="text-xs text-gray-600">Easy Returns</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <FiShield className="text-xl text-[#4a6741]" />
                <p className="text-xs text-gray-600">Secure Packaging</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product details */}
        <div className="mt-12 lg:mt-16 max-w-3xl">
          <h2
            className="text-xl sm:text-2xl font-bold text-gray-800 mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Product Details
          </h2>
          <ul className="space-y-2">
            {product.details.map((detail, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm sm:text-base text-gray-600"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#4a6741] mt-2 flex-shrink-0" />
                {detail}
              </li>
            ))}
          </ul>
        </div>

        {/* You May Also Like */}
        <div className="mt-14 lg:mt-20">
          <div className="flex items-center justify-between mb-5">
            <h2
              className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              You May Also Like <FiHeart className="text-rose-400" />
            </h2>
            <Link
              href="/collection"
              className="text-sm text-[#4a6741] font-medium hover:underline flex-shrink-0 ml-4"
            >
              View All
            </Link>
          </div>

          <div
            className="flex gap-4 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {RELATED_PRODUCTS.filter((p) => p.slug !== slug).map((p) => (
              <RelatedProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
