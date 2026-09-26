"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  FiUser,
  FiPackage,
  FiHeart,
  FiMapPin,
  FiSettings,
  FiLogOut,
  FiEdit3,
  FiCalendar,
  FiMail,
  FiPhone,
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiChevronRight,
  FiCamera,
  FiShoppingBag,
  FiAward
} from "react-icons/fi";
import { FaYarn } from "react-icons/fa6";
import { BsCheck2Circle } from "react-icons/bs";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders"); // orders | wishlist | custom | addresses | settings
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alif Ayesha",
    email: "ayesha.crafts@crochetalif.com",
    phone: "+91 98765 43210",
    joinDate: "Member since August 2024",
    // avatar: "/images/main_logo.png",
    bio: "Passionate about handcrafted aesthetics, cozy knitwear & bespoke yarn art.",
    tier: "Artisan Patron",
    stitchesEarned: "1,420",
  });

  // Mock Orders
  const [orders] = useState([
    {
      id: "CAL-89214",
      date: "18 Sep 2026",
      status: "In Stitching & Crafting",
      statusColor: "bg-amber-100 text-amber-800 border-amber-200",
      total: 2499,
      items: [
        {
          name: "Pearl Crochet Pouch",
          color: "Soft Olive",
          qty: 1,
          price: 1299,
          img: "/images/Pearl_Pouch.png",
        },
        {
          name: "Handmade Vintage Wallet",
          color: "Warm Cream",
          qty: 1,
          price: 1200,
          img: "/images/Handmade_Wallet.png",
        },
      ],
      progress: 60,
    },
    {
      id: "CAL-84102",
      date: "02 Aug 2026",
      status: "Delivered with Love",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      total: 3499,
      items: [
        {
          name: "Granny Square Sweater",
          color: "Pastel Meadow",
          qty: 1,
          price: 3499,
          img: "/images/Granny_Sweater.png",
        },
      ],
      progress: 100,
    },
  ]);

  // Mock Custom Orders
  const [customRequests] = useState([
    {
      id: "CUST-304",
      date: "20 Sep 2026",
      category: "Wall Hanging & Home Decor",
      description: "Custom botanical sage tapestry with ivory fringe for living room backdrop (approx 45x60cm).",
      status: "Artisan Reviewing Spec",
      statusColor: "bg-sage/30 text-primary border-sage",
      estimatedDays: "6-8 crafting days",
    },
  ]);

  // Mock Wishlist
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "Strawberry Crochet Backpack",
      price: 2899,
      originalPrice: 3499,
      img: "/images/Strawberry_Backpack.png",
      inStock: true,
    },
    {
      id: 2,
      name: "Handcrafted Crochet Sheep",
      price: 1499,
      originalPrice: 1799,
      img: "/images/Crochet_Sheep.png",
      inStock: true,
    },
    {
      id: 3,
      name: "Boho Wall Hanging Tapestry",
      price: 1999,
      originalPrice: 2499,
      img: "/images/Wall_Hanging.png",
      inStock: false,
    },
  ]);

  // Mock Addresses
  const [addresses] = useState([
    {
      id: 1,
      tag: "Primary Home",
      isDefault: true,
      recipient: "Alif Ayesha",
      street: "Flat 402, Blossom Meadow Residency, Green Valley Road",
      city: "Mumbai, Maharashtra - 400050",
      phone: "+91 98765 43210",
    },
    {
      id: 2,
      tag: "Studio / Office",
      isDefault: false,
      recipient: "Ayesha (Art Studio)",
      street: "Studio 12, Craft Haven Complex, Linking Road",
      city: "Mumbai, Maharashtra - 400052",
      phone: "+91 98765 43210",
    },
  ]);

  const handleRemoveWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main Profile Body */}
      <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto w-full">

        {/* HERO BANNER & USER INTRO */}
        <div className="relative rounded-3xl overflow-hidden shadow-soft border border-sage/40 bg-gradient-to-r from-cream-light via-cream to-sage-light/50 p-6 sm:p-10 mb-10">

          {/* Decorative Background Accents */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-sage/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">

            {/* Left: Avatar + Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              {/* Avatar with handcrafted ring */}
              <div className="relative group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-md bg-white p-1 ring-2 ring-primary/20">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <button
                  title="Change photo"
                  className="absolute bottom-1 right-1 p-2 bg-primary hover:bg-primary-dark text-white rounded-full shadow-button transition transform hover:scale-110"
                >
                  <FiCamera size={14} />
                </button>
              </div>

              {/* Text Info */}
              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-1.5">
                  <h1 className="font-heading text-2xl sm:text-3xl text-primary font-bold">
                    {profile.name}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/80 text-primary border border-sage/60 shadow-xs">
                    <FiAward className="text-amber-500" />
                    {profile.tier}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-warm max-w-lg mb-3">
                  {profile.bio}
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-muted font-medium">
                  <span className="flex items-center gap-1.5">
                    <FiMail size={13} className="text-primary" />
                    {profile.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiCalendar size={13} className="text-primary" />
                    {profile.joinDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Loyalty / Stitches Card */}
            <div className="w-full md:w-auto flex md:flex-col items-center justify-between md:justify-center p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-sage/50 shadow-xs gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-cream flex items-center justify-center text-primary shadow-xs">
                  <FaYarn size={22} className="text-primary" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Stitch Points
                  </p>
                  <p className="font-heading text-xl font-bold text-primary">
                    {profile.stitchesEarned}{" "}
                    <span className="text-xs font-normal text-warm">pts</span>
                  </p>
                </div>
              </div>

              <div className="text-right md:text-left">
                <span className="inline-block text-[11px] font-medium text-primary bg-sage-light/60 px-2.5 py-1 rounded-full">
                  Redeem on next order 🧶
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* 2-COLUMN LAYOUT: SIDEBAR TABS + MAIN CONTENT AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* SIDEBAR NAVIGATION */}
          <div className="lg:col-span-3 bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-sage/50 shadow-soft sticky top-28">
            <div className="space-y-1.5">
              {[
                { id: "orders", label: "My Orders", icon: FiPackage, badge: orders.length },
                { id: "custom", label: "Custom Requests", icon: FiEdit3, badge: customRequests.length },
                { id: "wishlist", label: "Handmade Wishlist", icon: FiHeart, badge: wishlist.length },
                { id: "addresses", label: "Saved Addresses", icon: FiMapPin },
                { id: "settings", label: "Account Settings", icon: FiSettings },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-medium transition-all cursor-pointer ${isActive
                        ? "bg-primary text-white shadow-button"
                        : "text-primary/90 hover:bg-cream-light/80 hover:text-primary"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className={isActive ? "text-white" : "text-primary/70"} />
                      <span>{tab.label}</span>
                    </div>
                    {tab.badge !== undefined && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold ${isActive
                            ? "bg-white/20 text-white"
                            : "bg-cream text-primary"
                          }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <hr className="my-4 border-sage-light" />

            {/* Logout button */}
            <Link
              href="/login"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition"
            >
              <FiLogOut size={18} />
              <span>Sign Out</span>
            </Link>
          </div>

          {/* MAIN TAB CONTENT */}
          <div className="lg:col-span-9 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-sage/50 shadow-soft min-h-[500px]">

            {/* TAB 1: ORDERS */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-sage-light">
                  <div>
                    <h2 className="font-heading text-2xl text-primary font-bold">
                      Order History
                    </h2>
                    <p className="text-xs text-warm mt-0.5">
                      Track the creation, stitching & delivery of your handcrafted pieces.
                    </p>
                  </div>
                  <Link
                    href="/collection"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
                  >
                    Explore New Pieces <FiChevronRight />
                  </Link>
                </div>

                {orders.length === 0 ? (
                  <div className="py-16 text-center">
                    <FiShoppingBag className="w-12 h-12 text-muted mx-auto mb-3" />
                    <h3 className="font-heading text-lg text-primary font-semibold mb-1">
                      No orders yet
                    </h3>
                    <p className="text-xs text-warm mb-4">
                      You haven't ordered any handcrafted crochet items yet.
                    </p>
                    <Link
                      href="/collection"
                      className="px-5 py-2.5 rounded-full bg-primary text-white text-xs font-medium shadow-button hover:bg-primary-dark transition"
                    >
                      Shop Collection
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="rounded-2xl border border-sage/60 bg-cream-light/30 p-5 sm:p-6 transition hover:shadow-sm"
                      >
                        {/* Order Header */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sage-light">
                          <div>
                            <span className="text-xs uppercase tracking-wider text-muted font-semibold">
                              Order ID
                            </span>
                            <p className="font-mono text-sm font-bold text-primary">
                              #{order.id}
                            </p>
                          </div>
                          <div>
                            <span className="text-xs uppercase tracking-wider text-muted font-semibold">
                              Date Placed
                            </span>
                            <p className="text-xs font-medium text-warm">{order.date}</p>
                          </div>
                          <div>
                            <span className="text-xs uppercase tracking-wider text-muted font-semibold">
                              Total Amount
                            </span>
                            <p className="text-sm font-bold text-primary">
                              ₹{order.total.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${order.statusColor}`}
                            >
                              <FiClock size={12} />
                              {order.status}
                            </span>
                          </div>
                        </div>

                        {/* Crafting Progress bar */}
                        <div className="py-4">
                          <div className="flex justify-between text-xs font-medium mb-1.5 text-primary">
                            <span className="flex items-center gap-1">
                              <FaYarn className="text-primary" /> Handcrafted Stitching Progress
                            </span>
                            <span>{order.progress}% Complete</span>
                          </div>
                          <div className="w-full h-2 bg-sage-light/60 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all duration-500"
                              style={{ width: `${order.progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Items in Order */}
                        <div className="space-y-3 pt-2">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between gap-4 p-2.5 rounded-xl bg-white border border-sage-light/60"
                            >
                              <div className="flex items-center gap-3.5">
                                <div className="w-14 h-14 rounded-lg overflow-hidden bg-cream border border-sage-light flex-shrink-0">
                                  <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="text-sm font-semibold text-primary">
                                    {item.name}
                                  </h4>
                                  <p className="text-xs text-muted">
                                    Color: {item.color} • Qty: {item.qty}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-bold text-primary">
                                  ₹{item.price.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-sage-light text-xs">
                          <button className="px-4 py-2 rounded-full border border-sage text-primary font-medium hover:bg-white transition">
                            View Invoice
                          </button>
                          <Link
                            href="/legal/track-order"
                            className="px-4 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition shadow-xs"
                          >
                            Live Tracking
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: CUSTOM REQUESTS */}
            {activeTab === "custom" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-sage-light">
                  <div>
                    <h2 className="font-heading text-2xl text-primary font-bold">
                      Custom Crochet Commissions
                    </h2>
                    <p className="text-xs text-warm mt-0.5">
                      Your personalized design consultations & bespoke order requests.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-white text-xs font-semibold shadow-button hover:bg-primary-dark transition"
                  >
                    + Request New Custom Piece
                  </Link>
                </div>

                <div className="space-y-4">
                  {customRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-5 sm:p-6 rounded-2xl border border-sage/60 bg-cream-light/30 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-primary px-2.5 py-1 rounded-md bg-white border border-sage-light">
                            {req.id}
                          </span>
                          <span className="text-xs text-muted font-medium">{req.date}</span>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${req.statusColor}`}>
                          {req.status}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-heading text-base font-bold text-primary">
                          {req.category}
                        </h4>
                        <p className="text-xs sm:text-sm text-warm mt-1 leading-relaxed">
                          "{req.description}"
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-sage-light text-xs text-muted">
                        <span className="flex items-center gap-1 text-primary font-medium">
                          <FiClock size={13} /> {req.estimatedDays}
                        </span>
                        <Link
                          href="/contact"
                          className="font-semibold text-primary hover:underline"
                        >
                          Chat with Artisan &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: WISHLIST */}
            {activeTab === "wishlist" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-sage-light">
                  <div>
                    <h2 className="font-heading text-2xl text-primary font-bold">
                      Saved Handmade Favorites
                    </h2>
                    <p className="text-xs text-warm mt-0.5">
                      Items you’ve bookmarked to treat yourself or gift a loved one.
                    </p>
                  </div>
                  <span className="text-xs text-muted font-medium">
                    {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved
                  </span>
                </div>

                {wishlist.length === 0 ? (
                  <div className="py-16 text-center">
                    <FiHeart className="w-12 h-12 text-muted mx-auto mb-3" />
                    <h3 className="font-heading text-lg text-primary font-semibold mb-1">
                      Your wishlist is empty
                    </h3>
                    <p className="text-xs text-warm mb-4">
                      Explore our handcrafted collections and heart the designs you adore.
                    </p>
                    <Link
                      href="/collection"
                      className="px-5 py-2.5 rounded-full bg-primary text-white text-xs font-medium shadow-button hover:bg-primary-dark transition"
                    >
                      Browse Designs
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {wishlist.map((item) => (
                      <div
                        key={item.id}
                        className="group rounded-2xl border border-sage/60 bg-white overflow-hidden shadow-xs hover:shadow-soft transition-all duration-300 flex flex-col"
                      >
                        <div className="relative h-48 bg-cream overflow-hidden">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <button
                            onClick={() => handleRemoveWishlist(item.id)}
                            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 text-rose-500 flex items-center justify-center shadow-xs hover:bg-rose-50 transition"
                            title="Remove from wishlist"
                          >
                            <FiHeart size={14} className="fill-rose-500 text-rose-500" />
                          </button>
                        </div>

                        <div className="p-4 flex-grow flex flex-col justify-between">
                          <div>
                            <h4 className="font-heading text-sm font-bold text-primary line-clamp-1 mb-1">
                              {item.name}
                            </h4>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-sm font-bold text-primary">
                                ₹{item.price.toLocaleString()}
                              </span>
                              {item.originalPrice && (
                                <span className="text-xs text-muted line-through">
                                  ₹{item.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>

                          <Link
                            href="/cart"
                            className="w-full py-2.5 px-3 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-medium flex items-center justify-center gap-1.5 shadow-button transition"
                          >
                            <FiShoppingBag size={14} /> Add to Cart
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: SAVED ADDRESSES */}
            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-sage-light">
                  <div>
                    <h2 className="font-heading text-2xl text-primary font-bold">
                      Delivery Addresses
                    </h2>
                    <p className="text-xs text-warm mt-0.5">
                      Manage your shipping locations for seamless parcel delivery.
                    </p>
                  </div>
                  <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-white text-xs font-semibold shadow-button hover:bg-primary-dark transition cursor-pointer">
                    + Add New Address
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-5 rounded-2xl border transition ${addr.isDefault
                          ? "border-primary bg-cream-light/40 shadow-xs"
                          : "border-sage/60 bg-white"
                        }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-primary px-2.5 py-0.5 rounded-full bg-cream border border-sage">
                            {addr.tag}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <button className="text-xs text-primary/70 hover:text-primary font-medium">
                          Edit
                        </button>
                      </div>

                      <h4 className="font-semibold text-sm text-primary mt-3">
                        {addr.recipient}
                      </h4>
                      <p className="text-xs text-warm mt-1 leading-relaxed">
                        {addr.street}
                        <br />
                        {addr.city}
                      </p>
                      <p className="text-xs text-muted mt-2 font-medium">
                        Phone: {addr.phone}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: ACCOUNT SETTINGS */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-sage-light">
                  <div>
                    <h2 className="font-heading text-2xl text-primary font-bold">
                      Account Settings
                    </h2>
                    <p className="text-xs text-warm mt-0.5">
                      Update your personal profile, yarn preferences & contact info.
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsEditing(false);
                  }}
                  className="space-y-5 max-w-xl"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-cream-light/40 border border-sage/60 rounded-xl text-sm text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-cream-light/40 border border-sage/60 rounded-xl text-sm text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-cream-light/40 border border-sage/60 rounded-xl text-sm text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                      Artisan Bio / Crochet Note
                    </label>
                    <textarea
                      rows={3}
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="w-full px-4 py-2.5 bg-cream-light/40 border border-sage/60 rounded-xl text-sm text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition shadow-button"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
