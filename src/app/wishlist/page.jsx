"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useWishlist } from "@/components/context/WishlistContext";
import { useCart } from "@/components/context/CartContext";
import { 
  FiHeart, 
  FiShoppingBag, 
  FiTrash2, 
  FiArrowRight, 
  FiCheck
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { FaYarn } from "react-icons/fa6";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || product.image || "/images/Granny_Sweater.png",
      });
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto w-full">
        
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-sage/40">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-primary/80 uppercase tracking-widest mb-2">
              <FiHeart className="text-rose-500 fill-rose-500" />
              <span>Saved Creations</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl text-primary font-bold">
              Your Handcrafted Wishlist
            </h1>
            <p className="text-sm text-warm mt-1">
              Curated pieces you love, hand-crocheted with warmth and patience.
            </p>
          </div>

          {wishlist.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={clearWishlist}
                className="px-4 py-2.5 rounded-full border border-sage/70 hover:border-rose-300 text-xs font-medium text-warm hover:text-rose-600 transition flex items-center gap-1.5 cursor-pointer bg-white/60"
              >
                <FiTrash2 size={13} /> Clear All
              </button>
              <button
                onClick={handleMoveAllToCart}
                className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white text-xs font-semibold transition flex items-center gap-2 shadow-button cursor-pointer"
              >
                <FiShoppingBag size={14} /> Add All to Cart
              </button>
            </div>
          )}
        </div>

        {/* WISHLIST CONTENT */}
        {wishlist.length === 0 ? (
          <div className="py-20 text-center bg-white/80 backdrop-blur-sm rounded-3xl border border-sage/40 shadow-soft max-w-2xl mx-auto px-6">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-cream-light flex items-center justify-center text-primary/40 border border-sage/40">
              <FiHeart size={36} className="text-sage-dark" />
            </div>
            <h2 className="font-heading text-2xl text-primary font-bold mb-2">
              Your Wishlist is Empty
            </h2>
            <p className="text-sm text-warm max-w-md mx-auto mb-6">
              You haven't saved any handcrafted items yet. Explore our bespoke collection of bags, sweaters, and accessories.
            </p>
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold shadow-button hover:bg-primary-dark transition"
            >
              Discover Handcrafted Pieces <FiArrowRight />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => {
              const discountPercent = item.originalPrice
                ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                : 0;

              return (
                <div
                  key={item.id || item.slug}
                  className="group bg-white rounded-3xl border border-sage/50 shadow-xs hover:shadow-soft transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square bg-cream overflow-hidden">
                    <img
                      src={item.images?.[0] || item.image || "/images/Granny_Sweater.png"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    {item.badge && (
                      <span className={`absolute top-3 left-3 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${item.badgeColor || "bg-primary"} shadow-xs`}>
                        {item.badge}
                      </span>
                    )}

                    {discountPercent > 0 && (
                      <span className="absolute top-3 right-12 text-[11px] font-bold text-white bg-rose-500 px-2 py-0.5 rounded-full shadow-xs">
                        -{discountPercent}%
                      </span>
                    )}

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromWishlist(item.id || item.slug)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-rose-500 hover:bg-rose-500 hover:text-white flex items-center justify-center transition shadow-xs"
                      title="Remove from wishlist"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted mb-1">
                        <FaYarn className="text-primary" /> 100% Handcrafted
                      </span>
                      <Link href={`/collection/${item.slug || ""}`}>
                        <h3 className="font-heading text-base font-bold text-primary hover:text-primary-dark line-clamp-1 mb-2">
                          {item.name}
                        </h3>
                      </Link>

                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-lg font-bold text-primary">
                          ₹{item.price.toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-muted line-through">
                            ₹{item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action */}
                    <button
                      onClick={() =>
                        addToCart({
                          id: item.id,
                          slug: item.slug,
                          name: item.name,
                          price: item.price,
                          image: item.images?.[0] || item.image || "/images/Granny_Sweater.png",
                        })
                      }
                      className="w-full py-3 rounded-2xl bg-primary hover:bg-primary-dark text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-button transition active:scale-[0.99] cursor-pointer"
                    >
                      <FiShoppingBag size={14} /> Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cream via-cream-light to-sage-light/40 border border-sage/50 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-xs flex-shrink-0">
              <HiSparkles size={22} className="text-amber-500" />
            </div>
            <div>
              <h4 className="font-heading text-base sm:text-lg font-bold text-primary">
                Looking for a Custom Color or Size?
              </h4>
              <p className="text-xs text-warm mt-0.5">
                Our artisans love making bespoke crochet pieces tailored just for you.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-full bg-white border border-sage text-primary font-semibold text-xs hover:bg-primary hover:text-white transition shadow-xs flex-shrink-0"
          >
            Request Custom Piece
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
