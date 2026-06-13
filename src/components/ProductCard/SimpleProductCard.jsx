// ============================================
// components/ProductCard/SimpleProductCard.jsx
// ============================================
// Reusable, simple product card for any page in your project

"use client";

import Link from "next/link";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { BsStarFill } from "react-icons/bs";
import { useCart } from "@/components/context/CartContext";

function StarRating({ rating, size = "text-xs" }) {
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

export default function SimpleProductCard({
  product,
  showBadge = true,
  showRating = true,
}) {
  const { addToCart } = useCart();
  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <Link
      href={`/collection/${product.slug}`}
      className="group cursor-pointer h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-square mb-3 shadow-sm group-hover:shadow-md transition-shadow">
        {/* Badge */}
        {showBadge && product.badge && (
          <div
            className={`absolute top-2 left-2 text-white text-xs font-semibold px-2.5 py-1 rounded-full ${product.badgeColor} z-10`}
          >
            {product.badge}
          </div>
        )}

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2 right-2 text-xs font-bold text-white bg-rose-500 px-2 py-1 rounded-full z-10">
            -{discountPercent}%
          </div>
        )}

        {/* Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://placehold.co/400x400/e8f0e0/4a6741?text=${encodeURIComponent(
              product.name,
            )}`;
          }}
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-white shadow-sm hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          <FiHeart className="text-gray-400 text-sm" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Title */}
        <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 mb-2 group-hover:text-[#4a6741] transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        {showRating && (
          <div className="flex items-center gap-1.5 mb-2">
            <StarRating rating={product.rating} size="text-xs" />
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
        )}

        {/* Price */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-3">
            <p className="font-bold text-[#4a6741] text-sm">
              ₹{product.price.toLocaleString()}
            </p>
            {product.originalPrice && (
              <p className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </p>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              addToCart({
  id: product.id,
  slug: product.slug,
  name: product.name,
  price: product.price,
  image: product.images?.[0] ?? product.img,
});
            }}
            className="w-full bg-[#4a6741] text-white text-xs font-semibold py-2.5 rounded-lg hover:bg-[#3a5331] transition-colors flex items-center justify-center gap-1.5"
          >
            <FiShoppingCart className="text-sm" />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}

// ============================================
// USAGE EXAMPLE 1: Homepage with featured section
// ============================================
export function HomepageExample() {
  const { getAllProducts } = require("@/lib/productData");

  const allProducts = getAllProducts();
  const featuredProducts = allProducts.slice(0, 6);

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <SimpleProductCard
              key={product.slug}
              product={product}
              showBadge
              showRating
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// USAGE EXAMPLE 2: Category/Collection page
// ============================================
export function CategoryPageExample() {
  const { getAllProducts } = require("@/lib/productData");

  const products = getAllProducts();

  return (
    <div className="min-h-screen bg-[#faf8f4]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">All Products</h1>
        <p className="text-gray-600 mb-8">Browse our beautiful collection</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <SimpleProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// USAGE EXAMPLE 3: Search Results
// ============================================
export function SearchResultsExample({ searchQuery }) {
  const { getAllProducts } = require("@/lib/productData");

  const allProducts = getAllProducts();
  const results = allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No products found for "{searchQuery}"</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {results.map((product) => (
        <SimpleProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}

// ============================================
// USAGE EXAMPLE 4: Multiple imports and utilities
// ============================================

/*
import SimpleProductCard from "@/components/ProductCard/SimpleProductCard";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/productData";

// Use in your page/component:

export default function MyPage() {
  // Get all products
  const products = getAllProducts();

  // Get specific product
  const pearlPouch = getProductBySlug("pearl-crochet-pouch");

  // Get related products (auto-excludes current)
  const related = getRelatedProducts("pearl-crochet-pouch", 5);

  return (
    <div>
      <h1>All Products: {products.length}</h1>
      <div className="grid grid-cols-4 gap-4">
        {products.map(product => (
          <SimpleProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
*/
