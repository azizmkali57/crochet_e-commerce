"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/components/context/CartContext";
import { 
  FiShoppingBag, 
  FiMapPin, 
  FiUser, 
  FiPhone, 
  FiMail, 
  FiCreditCard, 
  FiShield, 
  FiTruck, 
  FiCheckCircle, 
  FiLock,
  FiArrowRight,
  FiChevronLeft,
  FiGift
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FaYarn } from "react-icons/fa6";
import { SiGooglepay, SiPhonepe, SiPaytm } from "react-icons/si";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const [shippingMethod, setShippingMethod] = useState("standard"); // standard | express
  const [paymentMethod, setPaymentMethod] = useState("upi"); // upi | cod | card | whatsapp
  const [isGift, setIsGift] = useState(false);
  const [giftNote, setGiftNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
    saveInfo: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const shippingCost = shippingMethod === "express" ? 150 : cartTotal >= 1999 ? 0 : 99;
  const grandTotal = cartTotal + shippingCost;

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!form.firstName || !form.phone || !form.address || !form.city || !form.pincode) {
      alert("Please fill in all the required shipping and contact details.");
      return;
    }

    setLoading(true);

    // If WhatsApp method selected or user requested direct message confirmation
    if (paymentMethod === "whatsapp") {
      const orderItems = cart
        .map((item) => `• ${item.name} (Qty: ${item.qty}) - ₹${item.price * item.qty}`)
        .join("\n");

      const message = `🧶 *New Handmade Order - Crochet Alif*\n\n` +
        `👤 *Customer:* ${form.firstName} ${form.lastName}\n` +
        `📞 *Phone:* ${form.phone}\n` +
        `✉️ *Email:* ${form.email}\n\n` +
        `📍 *Delivery Address:*\n${form.address}${form.apartment ? ", " + form.apartment : ""}\n${form.city}, ${form.state} - ${form.pincode}\n\n` +
        `🛍️ *Ordered Items:*\n${orderItems}\n\n` +
        `🚚 *Shipping:* ${shippingMethod === "express" ? "Express (₹150)" : "Standard"}\n` +
        (isGift ? `🎁 *Gift Note:* "${giftNote}"\n` : "") +
        `💰 *Grand Total:* ₹${grandTotal.toLocaleString()}\n` +
        `💳 *Payment:* Cash / Direct UPI Transfer`;

      const whatsappNumber = "917000577651";
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, "_blank");
    }

    // Simulate order placement
    setTimeout(() => {
      setLoading(false);
      setOrderPlaced(true);
      clearCart();
    }, 1200);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-12 flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-sage/60 shadow-soft max-w-xl w-full text-center">
            <div className="w-20 h-20 bg-cream-light rounded-full flex items-center justify-center mx-auto mb-6 text-primary border border-sage/60 ring-8 ring-primary/5">
              <FiCheckCircle size={42} className="text-primary" />
            </div>

            <span className="text-xs uppercase tracking-widest font-semibold text-muted mb-1 block">
              Handcrafted With Love
            </span>
            <h1 className="font-heading text-3xl font-bold text-primary mb-3">
              Thank You for Your Order!
            </h1>
            <p className="text-sm text-warm leading-relaxed mb-6">
              Your order <span className="font-mono font-bold text-primary">#CAL-{Math.floor(10000 + Math.random() * 90000)}</span> has been placed successfully. Our artisans have started weaving your pieces.
            </p>

            <div className="p-4 rounded-2xl bg-cream-light/60 border border-sage-light text-left text-xs text-warm space-y-2 mb-8">
              <p className="font-semibold text-primary">📦 Delivery To:</p>
              <p>{form.firstName} {form.lastName} • {form.phone}</p>
              <p>{form.address}, {form.city} - {form.pincode}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/profile"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition shadow-button"
              >
                Track in My Orders
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-sage text-primary text-xs font-semibold hover:bg-cream-light transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto w-full">
        
        {/* CHECKOUT HEADER / PROGRESS */}
        <div className="mb-8 pb-6 border-b border-sage/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/cart"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-warm hover:text-primary transition mb-2"
            >
              <FiChevronLeft size={16} /> Return to Shopping Bag
            </Link>
            <h1 className="font-heading text-3xl sm:text-4xl text-primary font-bold">
              Secure Checkout
            </h1>
          </div>

          {/* Secure Trust Pill */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-sage/60 text-xs text-primary font-medium shadow-2xs self-start sm:self-auto">
            <FiLock className="text-emerald-600" />
            <span>256-bit Encrypted SSL Checkout</span>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="py-20 text-center bg-white/80 rounded-3xl border border-sage/40 shadow-soft max-w-xl mx-auto p-8">
            <FiShoppingBag className="w-14 h-14 text-muted mx-auto mb-4" />
            <h2 className="font-heading text-2xl text-primary font-bold mb-2">No Items to Checkout</h2>
            <p className="text-sm text-warm mb-6">Your bag is currently empty. Add items first to proceed.</p>
            <Link href="/collection" className="px-6 py-3 rounded-full bg-primary text-white text-xs font-semibold shadow-button">
              Browse Collection
            </Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT 7 COLS: SHIPPING & PAYMENT DETAILS */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. CONTACT INFORMATION */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-sage/50 shadow-soft">
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-sage-light">
                  <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-primary font-bold text-xs">
                    1
                  </div>
                  <h2 className="font-heading text-lg font-bold text-primary">
                    Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                        <FiMail size={15} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-cream-light/40 border border-sage/60 rounded-xl text-xs text-primary focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                        <FiPhone size={15} />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-2.5 bg-cream-light/40 border border-sage/60 rounded-xl text-xs text-primary focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. SHIPPING ADDRESS */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-sage/50 shadow-soft">
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-sage-light">
                  <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-primary font-bold text-xs">
                    2
                  </div>
                  <h2 className="font-heading text-lg font-bold text-primary">
                    Shipping Address
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="w-full px-4 py-2.5 bg-cream-light/40 border border-sage/60 rounded-xl text-xs text-primary focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="w-full px-4 py-2.5 bg-cream-light/40 border border-sage/60 rounded-xl text-xs text-primary focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                      Street Address / House No. *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={form.address}
                      onChange={handleChange}
                      placeholder="e.g. 402, Blossom Meadow Residency"
                      className="w-full px-4 py-2.5 bg-cream-light/40 border border-sage/60 rounded-xl text-xs text-primary focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                      Apartment, Suite, Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      value={form.apartment}
                      onChange={handleChange}
                      placeholder="e.g. Near Rose Garden"
                      className="w-full px-4 py-2.5 bg-cream-light/40 border border-sage/60 rounded-xl text-xs text-primary focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={form.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="w-full px-4 py-2.5 bg-cream-light/40 border border-sage/60 rounded-xl text-xs text-primary focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        placeholder="State"
                        className="w-full px-4 py-2.5 bg-cream-light/40 border border-sage/60 rounded-xl text-xs text-primary focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        value={form.pincode}
                        onChange={handleChange}
                        placeholder="e.g. 400050"
                        className="w-full px-4 py-2.5 bg-cream-light/40 border border-sage/60 rounded-xl text-xs text-primary focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. SHIPPING & GIFT OPTIONS */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-sage/50 shadow-soft space-y-4">
                <div className="flex items-center gap-2.5 mb-2 pb-3 border-b border-sage-light">
                  <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-primary font-bold text-xs">
                    3
                  </div>
                  <h2 className="font-heading text-lg font-bold text-primary">
                    Delivery Speed & Gifting
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    onClick={() => setShippingMethod("standard")}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                      shippingMethod === "standard"
                        ? "border-primary bg-cream-light/50 ring-2 ring-primary/10"
                        : "border-sage/60 hover:bg-cream-light/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={shippingMethod === "standard"}
                        onChange={() => setShippingMethod("standard")}
                        className="accent-[#3D5938]"
                      />
                      <div>
                        <p className="text-xs font-bold text-primary">Standard Delivery</p>
                        <p className="text-[11px] text-muted">Estimated 4-6 crafting days</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-primary">
                      {cartTotal >= 1999 ? "FREE" : "₹99"}
                    </span>
                  </label>

                  <label
                    onClick={() => setShippingMethod("express")}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                      shippingMethod === "express"
                        ? "border-primary bg-cream-light/50 ring-2 ring-primary/10"
                        : "border-sage/60 hover:bg-cream-light/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={shippingMethod === "express"}
                        onChange={() => setShippingMethod("express")}
                        className="accent-[#3D5938]"
                      />
                      <div>
                        <p className="text-xs font-bold text-primary">Priority Express</p>
                        <p className="text-[11px] text-muted">Expedited 2-3 days dispatch</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-primary">₹150</span>
                  </label>
                </div>

                {/* Gift Wrap Toggle */}
                <div className="pt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isGift}
                      onChange={(e) => setIsGift(e.target.checked)}
                      className="h-4 w-4 rounded border-sage text-primary accent-[#3D5938]"
                    />
                    <span className="text-xs font-semibold text-primary flex items-center gap-1.5">
                      <FiGift className="text-rose-500" /> Add complimentary handwritten yarn gift card
                    </span>
                  </label>
                  {isGift && (
                    <textarea
                      rows={2}
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Write your personalized greeting note here..."
                      className="w-full mt-2.5 p-3 rounded-xl border border-sage/60 text-xs text-primary bg-cream-light/30 focus:outline-none focus:border-primary"
                    />
                  )}
                </div>
              </div>

              {/* 4. PAYMENT METHOD */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-sage/50 shadow-soft">
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-sage-light">
                  <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-primary font-bold text-xs">
                    4
                  </div>
                  <h2 className="font-heading text-lg font-bold text-primary">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-3">
                  {/* UPI */}
                  <label
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                      paymentMethod === "upi"
                        ? "border-primary bg-cream-light/50 ring-2 ring-primary/10"
                        : "border-sage/60 hover:bg-cream-light/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                        className="accent-[#3D5938]"
                      />
                      <div>
                        <p className="text-xs font-bold text-primary">UPI / QR Code</p>
                        <p className="text-[11px] text-muted">Google Pay, PhonePe, Paytm, BHIM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-primary/70">
                      <SiGooglepay size={20} />
                      <SiPhonepe size={16} />
                      <SiPaytm size={20} />
                    </div>
                  </label>

                  {/* WhatsApp Direct */}
                  <label
                    onClick={() => setPaymentMethod("whatsapp")}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                      paymentMethod === "whatsapp"
                        ? "border-primary bg-cream-light/50 ring-2 ring-primary/10"
                        : "border-sage/60 hover:bg-cream-light/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={paymentMethod === "whatsapp"}
                        onChange={() => setPaymentMethod("whatsapp")}
                        className="accent-[#3D5938]"
                      />
                      <div>
                        <p className="text-xs font-bold text-primary">WhatsApp Order & Pay</p>
                        <p className="text-[11px] text-muted">Confirm directly with our artisan on WhatsApp</p>
                      </div>
                    </div>
                    <FaWhatsapp size={20} className="text-emerald-600" />
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                      paymentMethod === "cod"
                        ? "border-primary bg-cream-light/50 ring-2 ring-primary/10"
                        : "border-sage/60 hover:bg-cream-light/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="accent-[#3D5938]"
                      />
                      <div>
                        <p className="text-xs font-bold text-primary">Cash on Delivery (COD)</p>
                        <p className="text-[11px] text-muted">Pay upon parcel delivery at your doorstep</p>
                      </div>
                    </div>
                    <FiTruck size={18} className="text-primary/70" />
                  </label>
                </div>
              </div>

            </div>

            {/* RIGHT 5 COLS: ORDER SUMMARY SIDEBAR */}
            <div className="lg:col-span-5 space-y-6 sticky top-28">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-sage/50 shadow-soft">
                <h2 className="font-heading text-lg font-bold text-primary pb-4 border-b border-sage-light">
                  Order Summary ({cart.length} items)
                </h2>

                {/* Items preview list */}
                <div className="py-4 space-y-3 max-h-64 overflow-y-auto pr-1 border-b border-sage-light">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-cream overflow-hidden border border-sage-light flex-shrink-0">
                          <img
                            src={item.image || "/images/Granny_Sweater.png"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-primary line-clamp-1">{item.name}</p>
                          <p className="text-[11px] text-muted">Qty: {item.qty} × ₹{item.price}</p>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-primary">
                        ₹{(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Breakdown */}
                <div className="py-4 space-y-2.5 text-xs text-warm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-primary">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-emerald-700">
                      {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                    </span>
                  </div>
                  {isGift && (
                    <div className="flex justify-between text-rose-500">
                      <span>Gift Wrap & Card</span>
                      <span className="font-semibold">Free</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-sage-light flex items-baseline justify-between mb-6">
                  <div>
                    <span className="font-heading text-base font-bold text-primary block">
                      Grand Total
                    </span>
                    <span className="text-[10px] text-muted">All taxes included</span>
                  </div>
                  <span className="font-heading text-2xl font-extrabold text-primary">
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-primary hover:bg-primary-dark active:scale-[0.99] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-button transition duration-200 cursor-pointer disabled:opacity-75"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Place Handmade Order</span>
                      <FiArrowRight size={16} />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-muted text-center mt-3">
                  By placing this order, you agree to our handcrafted terms & delivery policy.
                </p>
              </div>
            </div>

          </form>
        )}

      </main>

      <Footer />
    </div>
  );
}