"use client";

import { useState } from "react";
import Link from "next/link";
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
import { getProductBySlug, getRelatedProducts } from "../../../lib/productData";

// ---------- STAR RATING COMPONENT ----------
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

// ---------- IMAGE GALLERY COMPONENT ----------
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

        {/* Prev/Next arrows */}
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

// ---------- RELATED PRODUCT CARD COMPONENT ----------
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

// ---------- MAIN PRODUCT DETAIL COMPONENT ----------
export default function ProductDetailPage({ slug }) {
  const { addToCart } = useCart();
  const product = getProductBySlug(slug);
  const relatedProducts = getRelatedProducts(slug);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
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
                  quantity,
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
          {relatedProducts.map((p) => (
            <RelatedProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </main>
  );
}