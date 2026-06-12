"use client";

import { useState, useRef } from "react";
import Header from "@/components/layout/Header";
import {
  FiShoppingCart,
  FiHeart,
  FiArrowRight,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import {
  BsStarFill,
  BsGlobe,
  BsBoxSeam,
  BsArrowRepeat,
  BsBag,
  BsHouseDoor,
  BsToyController,
  BsScissors,
  BsImage,
  BsPatchCheck,
  BsGrid,
} from "react-icons/bs";

import { FaComments, FaLaptopCode, FaRocket } from "react-icons/fa";

const processSteps = [
  {
    icon: <FaComments className="text-3xl" />,
    label: "Share",
    sub: "Your Idea",
  },
  {
    icon: <FaLaptopCode className="text-3xl" />,
    label: "We Create",
    sub: "With Love",
  },
  {
    icon: <FaRocket className="text-3xl" />,
    label: "Delivered",
    sub: "To You",
  },
];
import {
  PiFlowerLotus,
  PiHandHeartBold,
  PiPlantBold,
  PiSealCheckBold,
  PiTruckBold,
} from "react-icons/pi";
import { GiWool, GiLeafSwirl } from "react-icons/gi";
import { MdOutlineEco } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// ---------- DATA ----------
const CATEGORIES = [
  { label: "All", icon: <BsGrid /> },
  { label: "Bags", icon: <BsBag /> },
  { label: "Home Decor", icon: <BsHouseDoor /> },
  // { label: "Soft Toys", icon: <BsToyController /> },
  { label: "Accessories", icon: <BsScissors /> },
  { label: "Wall Art", icon: <BsImage /> },
  { label: "Custom Pieces", icon: <PiFlowerLotus /> },
  { label: "New Arrivals", icon: <GiLeafSwirl /> },
  { label: "Best Sellers", icon: <BsPatchCheck /> },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Pearl Crochet Pouch",
    price: 1299,
    rating: 4.9,
    reviews: 128,
    badge: "Bestseller",
    badgeColor: "bg-amber-500",
    img: "/images/Granny_Sweater.png",
    bg: "bg-gradient-to-br from-green-50 to-emerald-100",
    layout: "tall", // col-span-1, row-span-2
  },
  {
    id: 2,
    name: "Elegant Crochet Handbag",
    price: 2499,
    rating: 5.0,
    reviews: 96,
    badge: "Bestseller",
    badgeColor: "bg-amber-500",
    img: "/images/Bags_&_Pouches.png",
    bg: "bg-gradient-to-br from-yellow-50 to-amber-100",
    layout: "tall", // col-span-1, row-span-2
  },
  {
    id: 3,
    name: "Crochet Sheep (Shamsheer)",
    price: 899,
    rating: 4.9,
    reviews: 110,
    badge: null,
    img: "/images/Crochet_Sheep.png",
    bg: "bg-gradient-to-br from-slate-50 to-gray-100",
    layout: "small",
  },
  {
    id: 4,
    name: "Floral Wall Hanging",
    price: 1199,
    rating: 4.8,
    reviews: 65,
    badge: null,
    img: "/images/Home_Decor.png",
    bg: "bg-gradient-to-br from-green-50 to-teal-100",
    layout: "small",
  },
  {
    id: 5,
    name: "Dreamcatcher Wall Hanging",
    price: 899,
    rating: 4.8,
    reviews: 72,
    badge: null,
    img: "/images/Wall_Hanging.png",
    bg: "bg-gradient-to-br from-rose-50 to-pink-100",
    layout: "small",
  },
  {
    id: 6,
    name: "Handmade Wallet",
    price: 699,
    rating: 4.7,
    reviews: 58,
    badge: null,
    img: "/images/Handmade_Wallet.png",
    bg: "bg-gradient-to-br from-amber-50 to-orange-100",
    layout: "small",
  },
  {
    id: 7,
    name: "Blush Crocheted Potli Bag",
    price: 1499,
    rating: 5.0,
    reviews: 93,
    badge: "New",
    badgeColor: "bg-emerald-500",
    img: "/images/strawberry_Backpack.png",
    bg: "bg-gradient-to-br from-pink-50 to-rose-100",
    layout: "wide-tall", // col-span-2, row-span-2 on right
  },
];

const TRENDING = [
  {
    name: "Strawberry Backpack",
    price: 2499,
    img: "/images/strawberry_Backpack.png",
  },
  {
    name: "Pearl Handle Pouch",
    price: 1299,
    img: "/images/Pearl_Pouch.png",
  },
  {
    name: "Granny Square Sweater",
    price: 1699,
    img: "/images/Granny_Sweater.png",
  },
];

const NEW_ARRIVALS = [
  {
    name: "Tulip Pot Decor",
    price: 649,
    img: "/images/Crochet_Sheep.png",
  },
  {
    name: "Kawaii Bunny Toy",
    price: 999,
    img: "/images/Handmade_Wallet.png",
  },
  {
    name: "Crochet Sunflower",
    price: 699,
    img: "/images/Bags_&_Pouches.png",
  },
];

const HANDMADE_FAV = [
  {
    name: "Vintage Style Bag",
    price: 2199,
    img: "/images/Wall_Hanging.png",
  },
  {
    name: "Cozy Crochet Pillow",
    price: 1299,
    img: "/images/HandkerChiefs.png",
  },
  {
    name: "Wall Hanging Leaf",
    price: 899,
    img: "/images/Home_Decor.png",
  },
];

const FOOTER_TRUST = [
  {
    icon: <BsGlobe className="text-2xl text-[#4a6741]" />,
    label: "Worldwide Delivery",
    sub: "Shipping across the globe",
  },
  {
    icon: <BsBoxSeam className="text-2xl text-[#4a6741]" />,
    label: "Secure Packaging",
    sub: "Packed with care",
  },
  {
    icon: <BsArrowRepeat className="text-2xl text-[#4a6741]" />,
    label: "Easy Returns",
    sub: "Hassle-free returns",
  },
  {
    icon: <RiCustomerService2Line className="text-2xl text-[#4a6741]" />,
    label: "24/7 Support",
    sub: "We're here to help",
  },
];

// ---------- COMPONENTS ----------
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <BsStarFill
          key={s}
          className={`text-xs ${s <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}
        />
      ))}
    </div>
  );
}

// Card for tall layout (col-span-1, row-span-2) — image takes ~65%, info below
function TallProductCard({ product, wishlist, toggleWishlist }) {
  return (
    <div
      className={`relative rounded-2xl ${product.bg} overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col`}
    >
      {product.badge && (
        <span
          className={`absolute top-3 left-3 z-10 text-white text-xs font-semibold px-2.5 py-1 rounded-full ${product.badgeColor}`}
        >
          {product.badge}
        </span>
      )}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
      >
        <FiHeart
          className={`text-sm ${wishlist.includes(product.id) ? "fill-rose-500 text-rose-500" : "text-gray-400"}`}
        />
      </button>
      {/* Image takes most of the card height */}
      <div className="flex-1 overflow-hidden min-h-0">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          style={{ minHeight: "200px" }}
          onError={(e) => {
            e.target.src = `https://placehold.co/400x500/e8f0e0/4a6741?text=${encodeURIComponent(product.name)}`;
          }}
        />
      </div>
      {/* Info pinned to bottom */}
      <div className="p-3 pb-4 bg-white/60 backdrop-blur-sm">
        <p className="text-sm font-semibold text-gray-800 leading-snug mb-1">
          {product.name}
        </p>
        <p className="text-base font-bold text-[#4a6741] mb-1.5">
          ₹{product.price.toLocaleString()}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
          <button className="w-8 h-8 rounded-full bg-[#4a6741] flex items-center justify-center text-white hover:bg-[#3a5331] transition-colors shadow-sm">
            <FiShoppingCart className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Card for small layout (col-span-1, row-span-1)
function SmallProductCard({ product, wishlist, toggleWishlist }) {
  return (
    <div
      className={`relative rounded-2xl ${product.bg} overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300`}
    >
      {product.badge && (
        <span
          className={`absolute top-2.5 left-2.5 z-10 text-white text-xs font-semibold px-2.5 py-1 rounded-full ${product.badgeColor}`}
        >
          {product.badge}
        </span>
      )}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
      >
        <FiHeart
          className={`text-xs ${wishlist.includes(product.id) ? "fill-rose-500 text-rose-500" : "text-gray-400"}`}
        />
      </button>
      <div className="aspect-square overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://placehold.co/300x300/e8f0e0/4a6741?text=${encodeURIComponent(product.name)}`;
          }}
        />
      </div>
      <div className="p-3 pb-3">
        <p className="text-xs font-semibold text-gray-800 leading-snug mb-0.5">
          {product.name}
        </p>
        <p className="text-sm font-bold text-[#4a6741] mb-1.5">
          ₹{product.price.toLocaleString()}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
          <button className="w-7 h-7 rounded-full bg-[#4a6741] flex items-center justify-center text-white hover:bg-[#3a5331] transition-colors shadow-sm">
            <FiShoppingCart className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Card for wide-tall layout (col-span-2, row-span-2) — potli bag
function WideTallCard({ product, wishlist, toggleWishlist }) {
  return (
    <div
      className={`relative rounded-2xl ${product.bg} overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col`}
    >
      {product.badge && (
        <span
          className={`absolute top-3 left-3 z-10 text-white text-xs font-semibold px-2.5 py-1 rounded-full ${product.badgeColor}`}
        >
          {product.badge}
        </span>
      )}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
      >
        <FiHeart
          className={`text-sm ${wishlist.includes(product.id) ? "fill-rose-500 text-rose-500" : "text-gray-400"}`}
        />
      </button>
      <div className="flex-1 overflow-hidden min-h-0">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          style={{ minHeight: "200px" }}
          onError={(e) => {
            e.target.src = `https://placehold.co/600x400/e8f0e0/4a6741?text=${encodeURIComponent(product.name)}`;
          }}
        />
      </div>
      <div className="p-4 pb-4 bg-white/60 backdrop-blur-sm">
        <p className="text-base font-bold text-gray-800 leading-snug mb-1">
          {product.name}
        </p>
        <p className="text-lg font-bold text-[#4a6741] mb-2">
          ₹{product.price.toLocaleString()}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
          <button className="w-9 h-9 rounded-full bg-[#4a6741] flex items-center justify-center text-white hover:bg-[#3a5331] transition-colors shadow-sm">
            <FiShoppingCart className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Small scrollable card for trending/new/favs
function MiniCard({ item }) {
  return (
    <div className="flex-shrink-0 w-28 cursor-pointer group">
      <div className="rounded-xl overflow-hidden aspect-square bg-gray-100 mb-2 relative">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://placehold.co/200x200/e8f0e0/4a6741?text=Item`;
          }}
        />
        <button className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <FiHeart className="text-xs text-gray-400" />
        </button>
      </div>
      <p className="text-xs font-medium text-gray-700 leading-tight">
        {item.name}
      </p>
      <p className="text-xs font-bold text-[#4a6741] mt-0.5">
        ₹{item.price.toLocaleString()}
      </p>
    </div>
  );
}

function HorizontalScrollSection({ title, items, viewAllLink }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 120, behavior: "smooth" });
    }
  };

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
          {title} <FiHeart className="text-xs text-rose-400" />
        </h3>
        <a
          href={viewAllLink || "#"}
          className="text-xs text-[#4a6741] font-medium flex items-center gap-1 hover:underline"
        >
          View All <FiArrowRight className="text-xs" />
        </a>
      </div>
      <div className="relative flex items-center gap-1">
        <button
          onClick={() => scroll(-1)}
          className="flex-shrink-0 w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:border-[#4a6741] transition-colors z-10"
        >
          <FiChevronLeft className="text-xs text-gray-500" />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide flex-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item, i) => (
            <MiniCard key={i} item={item} />
          ))}
        </div>
        <button
          onClick={() => scroll(1)}
          className="flex-shrink-0 w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:border-[#4a6741] transition-colors z-10"
        >
          <FiChevronRight className="text-xs text-gray-500" />
        </button>
      </div>
    </div>
  );
}

// ---------- MAIN PAGE ----------
export default function CrochetAllifyCollections() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [sortBy, setSortBy] = useState("Featured");

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const features = [
    {
      icon: <PiPlantBold size={24} />,
      title: "100%",
      sub: "Handmade",
    },
    {
      icon: <PiHandHeartBold size={24} />,
      title: "Made",
      sub: "With Love",
    },
    {
      icon: <PiSealCheckBold size={24} />,
      title: "Premium",
      sub: "Quality",
    },
    {
      icon: <PiTruckBold size={24} />,
      title: "Worldwide",
      sub: "Delivery",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f4] font-sans">
      <Header />
      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden min-h-[85vh]"
        style={{ backgroundColor: "#EEF2E8" }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/collection_section.png')",
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(238,242,232,0.94) 0%, rgba(238,242,232,0.78) 35%, rgba(238,242,232,0.15) 60%, rgba(238,242,232,0) 100%)",
          }}
        />

        {/* Organic Shape */}
        <div
          className="absolute top-0 left-0 w-[220px] h-[220px] rounded-br-[120px] opacity-40"
          style={{ backgroundColor: "#C7D4BB" }}
        />

        <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-16 pt-36 pb-20">
          <div className="max-w-[520px]">
            <p
              className="text-[11px] tracking-[0.35em] uppercase font-semibold mb-5"
              style={{ color: "#3D5938" }}
            >
              HANDCRAFTED COLLECTIONS
            </p>

            <h1
              className="text-[58px] leading-[1.05]"
              style={{
                color: "#111827",
                fontFamily: "Georgia, serif",
              }}
            >
              Find Pieces
              <br />
              Made With
            </h1>

            <h2
              className="text-[58px] leading-none mt-2 mb-6 italic"
              style={{
                color: "#3D5938",
                fontFamily: "Georgia, serif",
              }}
            >
              Heart
              <span className="ml-2 text-3xl">♡</span>
            </h2>

            <p
              className="text-[15px] leading-[1.9] mb-10 max-w-[420px]"
              style={{ color: "#4a5543" }}
            >
              Discover handmade crochet bags, adorable plushies, home décor and
              custom creations crafted carefully to bring warmth and personality
              into your life.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mb-14">
              <button
                className="flex items-center gap-3 px-6 py-3 rounded-full text-white font-medium"
                style={{ backgroundColor: "#3D5938" }}
              >
                Shop Collection
                <FiArrowRight />
              </button>

              <button
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/70 font-medium"
                style={{
                  border: "1px solid #3D5938",
                  color: "#3D5938",
                }}
              >
                Custom Order
                <FiHeart />
              </button>
            </div>

            {/* Features */}
            <div className="flex gap-7 flex-wrap">
              {features.map((f, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div
                    className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center mb-2"
                    style={{ color: "#3D5938" }}
                  >
                    {f.icon}
                  </div>

                  <p className="text-[12px] font-semibold text-[#111827]">
                    {f.title}
                  </p>

                  <p className="text-[12px]" style={{ color: "#6B7565" }}>
                    {f.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <section className="max-w-7xl mx-auto px-4 mt-5">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-3 py-2">
          <div
            className="flex gap-1"
            style={{
              overflowX: "auto",
              overflowY: "hidden",
              flexWrap: "nowrap",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                style={{ flexShrink: 0, whiteSpace: "nowrap" }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.label
                    ? "bg-[#4a6741] text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#4a6741]"
                }`}
              >
                <span className="text-base leading-none">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTION GRID */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2
              className="text-2xl font-bold text-gray-800 flex items-center gap-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Our Collection <FiHeart className="text-rose-400 text-xl" />
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Handpicked crochet creations for you
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Sort by:</span>
            <button
              className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 bg-white hover:border-[#4a6741] transition-colors font-medium"
              onClick={() =>
                setSortBy(sortBy === "Featured" ? "Price" : "Featured")
              }
            >
              {sortBy}
              <FiChevronDown className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* DESKTOP GRID (lg and above) — unchanged, just hidden on smaller screens */}
        <div className="overflow-x-auto pb-4 hidden lg:block">
          <div
            className="grid gap-4 min-w-0"
            style={{
              gridTemplateColumns: "1fr 1.4fr 1fr 1fr",
              gridTemplateRows: "280px 180px 220px",
            }}
          >
            {/* Pearl Crochet Pouch */}
            <div style={{ gridColumn: "1", gridRow: "1/3" }}>
              <TallProductCard
                product={PRODUCTS[0]}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            </div>

            {/* Elegant Crochet Handbag */}
            <div style={{ gridColumn: "2", gridRow: "1 / 4" }}>
              <TallProductCard
                product={PRODUCTS[1]}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            </div>

            {/* Crochet Sheep */}
            <div style={{ gridColumn: "3", gridRow: "1/3" }}>
              <TallProductCard
                product={PRODUCTS[2]}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            </div>

            {/* Floral Wall Hanging */}
            <div style={{ gridColumn: "4", gridRow: "1/3" }}>
              <TallProductCard
                product={PRODUCTS[3]}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            </div>

            {/* Dreamcatcher */}
            <div style={{ gridColumn: "1", gridRow: "3 / 5" }}>
              <TallProductCard
                product={PRODUCTS[4]}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            </div>

            {/* Handmade Wallet */}
            <div style={{ gridColumn: "2", gridRow: "4" }}>
              <SmallProductCard
                product={PRODUCTS[5]}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            </div>

            {/* Potli Bag */}
            <div style={{ gridColumn: "3 / 5", gridRow: "3 / 5" }}>
              <WideTallCard
                product={PRODUCTS[6]}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            </div>
          </div>
        </div>

        {/* MOBILE & TABLET GRID (below lg) — matches your sketch layout */}
        <div
          className="grid gap-4 lg:hidden"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gridTemplateAreas: `
        "a c"
        "b c"
        "d d"
        "e f"
        "g g"
      `,
            gridTemplateRows: "280px 280px 340px 280px 340px",
          }}
        >
          {/* 1 - Pearl Crochet Pouch */}
          <div style={{ gridArea: "a" }}>
            <TallProductCard
              product={PRODUCTS[0]}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          </div>

          {/* 2 - Elegant Crochet Handbag */}
          <div style={{ gridArea: "b" }}>
            <TallProductCard
              product={PRODUCTS[1]}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          </div>

          {/* 3 - Crochet Sheep (tall, right column spanning both rows) */}
          <div style={{ gridArea: "c" }}>
            <TallProductCard
              product={PRODUCTS[2]}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          </div>

          {/* 4 - Floral Wall Hanging (full width) */}
          <div style={{ gridArea: "d" }}>
            <WideTallCard
              product={PRODUCTS[3]}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          </div>

          {/* 5 - Dreamcatcher */}
          <div style={{ gridArea: "e" }}>
            <TallProductCard
              product={PRODUCTS[4]}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          </div>

          {/* 6 - Handmade Wallet */}
          <div style={{ gridArea: "f" }}>
            <TallProductCard
              product={PRODUCTS[5]}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          </div>

          {/* 7 - Potli Bag (full width) */}
          <div style={{ gridArea: "g" }}>
            <WideTallCard
              product={PRODUCTS[6]}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          </div>
        </div>
      </section>

      {/* STORY BANNER — full-width image bg with text overlay like Image 2 */}
      {/* STORY BANNER */}
<section className="max-w-7xl mx-auto px-4 mt-10">

  {/* DESKTOP (lg and up) — unchanged */}
  <div className="hidden lg:block overflow-x-auto no-scrollbar pb-2">
    <div
      className="min-w-0 rounded-3xl overflow-hidden bg-[#f6f3ea]"
      style={{
        backgroundImage: "url('/images/your_vision.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="grid grid-cols-[42%_58%] min-h-[380px]">
        {/* LEFT SIDE EMPTY */}
        <div></div>

        {/* RIGHT SIDE CONTENT */}
        <div className="flex flex-col justify-center px-10 md:px-14 py-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#4a6741] mb-3">
            MADE WITH PURPOSE ♡
          </p>

          <h2
            className="text-4xl md:text-5xl text-gray-800 mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Every Stitch Has A Story ♡
          </h2>

          <p className="text-gray-600 leading-relaxed max-w-lg mb-8">
            Our creations are not factory-made. Every knot, loop and
            design carries patience, creativity and warmth.
          </p>

          <button className="w-fit flex items-center gap-2 bg-[#4a6741] text-white px-7 py-3 rounded-full hover:bg-[#3a5331] transition">
            Read Our Story
            <FiArrowRight />
          </button>

          {/* Bottom Icons */}
          <div className="mt-10 pt-6 border-t border-[#d8d2c7]">
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-[#cfc8bb] flex items-center justify-center">
                  <GiWool className="text-[#4a6741]" />
                </div>
                <span className="text-sm text-gray-700">
                  Crafted
                  <br />
                  by Hand
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-[#cfc8bb] flex items-center justify-center">
                  <MdOutlineEco className="text-[#4a6741]" />
                </div>
                <span className="text-sm text-gray-700">
                  Sustainable
                  <br />
                  Materials
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-[#cfc8bb] flex items-center justify-center">
                  <FiHeart className="text-[#4a6741]" />
                </div>
                <span className="text-sm text-gray-700">
                  Made to
                  <br />
                  Last
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* MOBILE & TABLET (below lg) — image as top banner, text stacked below */}
  <div className="lg:hidden rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100">
    {/* Image banner */}
    <div
      className="w-full h-48 sm:h-64"
      style={{
        backgroundImage: "url('/images/your_vision.png')",
        backgroundSize: "cover",
        backgroundPosition: "left center",
      }}
    />

    {/* Text content */}
    <div className="px-6 sm:px-10 py-8 text-center sm:text-left">
      <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#4a6741] mb-3">
        MADE WITH PURPOSE ♡
      </p>

      <h2
        className="text-3xl sm:text-4xl text-gray-800 mb-4"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Every Stitch Has A Story ♡
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
        Our creations are not factory-made. Every knot, loop and
        design carries patience, creativity and warmth.
      </p>

      <button className="w-fit flex items-center gap-2 bg-[#4a6741] text-white px-7 py-3 rounded-full hover:bg-[#3a5331] transition mx-auto sm:mx-0">
        Read Our Story
        <FiArrowRight />
      </button>

      {/* Bottom Icons */}
      <div className="mt-8 pt-6 border-t border-[#d8d2c7]">
        <div className="flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border border-[#cfc8bb] flex items-center justify-center flex-shrink-0">
              <GiWool className="text-[#4a6741]" />
            </div>
            <span className="text-sm text-gray-700 text-left">
              Crafted
              <br />
              by Hand
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border border-[#cfc8bb] flex items-center justify-center flex-shrink-0">
              <MdOutlineEco className="text-[#4a6741]" />
            </div>
            <span className="text-sm text-gray-700 text-left">
              Sustainable
              <br />
              Materials
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border border-[#cfc8bb] flex items-center justify-center flex-shrink-0">
              <FiHeart className="text-[#4a6741]" />
            </div>
            <span className="text-sm text-gray-700 text-left">
              Made to
              <br />
              Last
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* TRENDING / NEW ARRIVALS / HANDMADE FAVORITES — with arrow nav like Image 2 */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="flex flex-col md:flex-row gap-8">
          <HorizontalScrollSection title="Trending Now" items={TRENDING} />
          <div className="hidden md:block w-px bg-gray-200" />
          <HorizontalScrollSection title="New Arrivals" items={NEW_ARRIVALS} />
          <div className="hidden md:block w-px bg-gray-200" />
          <HorizontalScrollSection
            title="Handmade Favorites"
            items={HANDMADE_FAV}
          />
        </div>
      </section>

     {/* CUSTOM ORDER CTA */}
<section className="max-w-7xl mx-auto px-4 mt-10">
  <div className="relative rounded-3xl overflow-hidden">
    {/* Desktop background */}
    <div
      className="absolute inset-0 hidden lg:block"
      style={{
        backgroundImage: "url(/images/collection_section2.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
    {/* Mobile/Tablet background (separate portrait image) */}
    <div
      className="absolute inset-0 lg:hidden"
      style={{
        backgroundImage: "url(/images/collection_mobile1.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/45 lg:bg-gradient-to-r lg:from-black/50 lg:via-black/20 lg:to-black/40" />

    <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-6 px-6 lg:px-8 py-10">
      <div className="flex-1 text-center lg:text-left">
        <h2
          className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Can't Find Your Dream Design?{" "}
          <FiHeart className="inline text-rose-300" />
        </h2>
        <p className="text-white/80 text-sm mb-5">
          Share your vision and we'll craft something truly personal.
        </p>
        <button className="flex items-center gap-2 bg-white text-[#4a6741] px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors mx-auto lg:mx-0 shadow-md">
          Create Custom Order <FiArrowRight />
        </button>
      </div>

      {/* Process steps */}
      <div className="flex justify-center gap-8 sm:gap-12 lg:gap-6 w-full lg:w-auto">
        {processSteps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-14 w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full text-white border border-white/30">
              {step.icon}
            </div>
            <h4 className="font-semibold text-sm lg:text-lg text-white">
              {step.label}
            </h4>
            <p className="text-xs lg:text-sm text-white/80">{step.sub}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

{/* QUOTE BANNER */}
<section className="max-w-7xl mx-auto px-4 mt-8">
  <div
    className="relative rounded-3xl overflow-hidden px-6 sm:px-8 py-10 sm:py-14 text-center"
    style={{
      backgroundImage: "url(/images/collection_section3.png)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Overlay for text readability on mobile */}
    <div className="absolute inset-0 " />

    <p
      className="relative z-10 text-xl sm:text-2xl md:text-4xl font-bold text-gray-800 leading-snug sm:leading-relaxed"
      style={{ fontFamily: "Georgia, serif" }}
    >
      Handmade is not just a product,
      <br className="hidden sm:block" /> it's a{" "}
      <span className="italic text-[#4a6741]">feeling</span> you can hold{" "}
      <FiHeart className="inline text-rose-400" />
    </p>
  </div>
</section>

      {/* FOOTER TRUST BAR */}
      <footer className="max-w-7xl mx-auto px-4 mt-8 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FOOTER_TRUST.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f0f5ee] flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>

      <Footer />
    </div>
  );
}
