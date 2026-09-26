"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/components/context/CartContext";
import { 
  FiTrash2, 
  FiShoppingBag, 
  FiArrowRight, 
  FiArrowLeft,
  FiPlus, 
  FiMinus, 
  FiShield, 
  FiTruck, 
  FiTag, 
  FiCheckCircle, 
  FiHeart
} from "react-icons/fi";
import { FaYarn } from "react-icons/fa6";

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart, cartTotal, cartCount } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "HANDMADE10") {
      const discountValue = Math.round(cartTotal * 0.1);
      setDiscount(discountValue);
      setCouponApplied(true);
      setCouponError("");
    } else if (couponCode.toUpperCase() === "WELCOME50") {
      setDiscount(50);
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid promo code. Try 'HANDMADE10' for 10% off!");
    }
  };

  const finalTotal = Math.max(0, cartTotal - discount);
  const freeShippingThreshold = 1999;
  const progressToFreeShipping = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto w-full">
        
        {/* PAGE BREADCRUMB / TITLE */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-muted mb-2 font-medium">
            <Link href="/" className="hover:text-primary transition">Home</Link>
            <span>/</span>
            <span className="text-primary font-semibold">Shopping Bag</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl sm:text-4xl text-primary font-bold">
                Your Shopping Bag
              </h1>
              <p className="text-sm text-warm mt-1">
                Review your carefully chosen handcrafted items before checkout.
              </p>
            </div>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-warm hover:text-rose-600 transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <FiTrash2 size={13} /> Clear Bag
              </button>
            )}
          </div>
        </div>

        {cart.length === 0 ? (
          /* EMPTY CART STATE */
          <div className="py-20 text-center bg-white/80 backdrop-blur-sm rounded-3xl border border-sage/40 shadow-soft max-w-2xl mx-auto px-6">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-cream-light flex items-center justify-center text-primary/40 border border-sage/40">
              <FiShoppingBag size={36} className="text-sage-dark" />
            </div>
            <h2 className="font-heading text-2xl text-primary font-bold mb-2">
              Your bag is currently empty
            </h2>
            <p className="text-sm text-warm max-w-md mx-auto mb-6">
              Looks like you haven't added any handcrafted treasures to your bag yet. Explore our bespoke collections!
            </p>
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold shadow-button hover:bg-primary-dark transition"
            >
              Start Shopping <FiArrowRight />
            </Link>
          </div>
        ) : (
          /* FILLED CART GRID */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: ITEMS & FREE SHIPPING PROGRESS */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Free shipping banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-cream-light/60 border border-sage/50 shadow-xs">
                <div className="flex items-center justify-between text-xs font-semibold text-primary mb-2">
                  <span className="flex items-center gap-1.5">
                    <FiTruck className="text-primary text-sm" />
                    {cartTotal >= freeShippingThreshold ? (
                      <span className="text-emerald-700">🎉 Congratulations! You have unlocked Free Handmade Delivery!</span>
                    ) : (
                      <span>Add ₹{(freeShippingThreshold - cartTotal).toLocaleString()} more for Free Standard Delivery</span>
                    )}
                  </span>
                  <span>{progressToFreeShipping}%</span>
                </div>
                <div className="w-full h-2 bg-sage-light/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-sage/50 shadow-soft space-y-5">
                <div className="hidden sm:grid grid-cols-12 text-xs font-semibold uppercase tracking-wider text-muted pb-3 border-b border-sage-light">
                  <span className="col-span-6">Product</span>
                  <span className="col-span-2 text-center">Price</span>
                  <span className="col-span-2 text-center">Quantity</span>
                  <span className="col-span-2 text-right">Subtotal</span>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:grid sm:grid-cols-12 items-start sm:items-center gap-4 py-4 border-b border-sage-light/60 last:border-b-0"
                  >
                    {/* Item Info */}
                    <div className="sm:col-span-6 flex items-center gap-4 w-full">
                      <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-cream overflow-hidden border border-sage-light flex-shrink-0">
                        <img
                          src={item.image || "/images/Granny_Sweater.png"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block">
                          Hand-crocheted
                        </span>
                        <h3 className="font-heading text-sm sm:text-base font-bold text-primary line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-warm mt-0.5 sm:hidden">
                          ₹{item.price.toLocaleString()} each
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-rose-500 hover:text-rose-700 font-medium flex items-center gap-1 mt-1.5 cursor-pointer"
                        >
                          <FiTrash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Unit Price (Desktop) */}
                    <div className="hidden sm:block sm:col-span-2 text-center font-medium text-sm text-warm">
                      ₹{item.price.toLocaleString()}
                    </div>

                    {/* Quantity Controls */}
                    <div className="sm:col-span-2 flex items-center justify-between sm:justify-center w-full sm:w-auto">
                      <div className="flex items-center border border-sage/70 rounded-full bg-cream-light/40 p-1">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="w-7 h-7 rounded-full bg-white hover:bg-cream text-primary flex items-center justify-center transition shadow-2xs cursor-pointer"
                        >
                          <FiMinus size={11} />
                        </button>
                        <span className="w-8 text-center font-bold text-xs text-primary">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="w-7 h-7 rounded-full bg-white hover:bg-cream text-primary flex items-center justify-center transition shadow-2xs cursor-pointer"
                        >
                          <FiPlus size={11} />
                        </button>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="sm:col-span-2 text-right w-full sm:w-auto flex justify-between sm:block items-center">
                      <span className="sm:hidden text-xs text-muted font-medium">Subtotal:</span>
                      <p className="font-heading text-base font-bold text-primary">
                        ₹{(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Link */}
              <div>
                <Link
                  href="/collection"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary-dark transition"
                >
                  <FiArrowLeft size={14} /> Continue Exploring Handmade Collection
                </Link>
              </div>

            </div>

            {/* RIGHT COLUMN: ORDER SUMMARY */}
            <div className="lg:col-span-4 space-y-6 sticky top-28">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-sage/50 shadow-soft">
                <h2 className="font-heading text-xl text-primary font-bold pb-4 border-b border-sage-light">
                  Order Summary
                </h2>

                {/* Promo code form */}
                <div className="py-4 border-b border-sage-light">
                  <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    Promo / Gift Code
                  </label>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                        <FiTag size={14} />
                      </div>
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Try 'HANDMADE10'"
                        className="w-full pl-9 pr-3 py-2 bg-cream-light/40 border border-sage/60 rounded-xl text-xs text-primary uppercase placeholder:normal-case placeholder-muted focus:outline-none focus:border-primary"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-semibold transition shadow-xs cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                  {couponApplied && (
                    <p className="text-xs text-emerald-600 font-medium mt-1.5 flex items-center gap-1">
                      <FiCheckCircle /> Coupon applied successfully!
                    </p>
                  )}
                  {couponError && (
                    <p className="text-xs text-rose-500 font-medium mt-1.5">
                      {couponError}
                    </p>
                  )}
                </div>

                {/* Summary Lines */}
                <div className="py-4 space-y-3 text-xs sm:text-sm text-warm">
                  <div className="flex justify-between">
                    <span>Items Subtotal ({cartCount} pcs)</span>
                    <span className="font-medium text-primary">₹{cartTotal.toLocaleString()}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Artisan Discount</span>
                      <span>- ₹{discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="font-medium text-emerald-700">
                      {cartTotal >= freeShippingThreshold ? "Free" : "₹99"}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-muted">
                    <span>Tax (Inclusive)</span>
                    <span>₹0</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="pt-4 border-t border-sage-light flex items-baseline justify-between mb-6">
                  <div>
                    <span className="font-heading text-lg font-bold text-primary block">
                      Total Amount
                    </span>
                    <span className="text-[11px] text-muted">Handcrafted with premium yarn</span>
                  </div>
                  <span className="font-heading text-2xl font-extrabold text-primary">
                    ₹{finalTotal.toLocaleString()}
                  </span>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full py-4 rounded-2xl bg-primary hover:bg-primary-dark active:scale-[0.99] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-button transition duration-200"
                >
                  <span>Proceed to Checkout</span>
                  <FiArrowRight size={16} />
                </Link>

                {/* Trust assurance */}
                <div className="mt-5 pt-4 border-t border-sage-light/60 space-y-2 text-[11px] text-muted">
                  <div className="flex items-center gap-2">
                    <FiShield className="text-primary" />
                    <span>Safe & Encrypted 256-bit Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaYarn className="text-primary" />
                    <span>100% Quality Checked Pure Yarn</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
