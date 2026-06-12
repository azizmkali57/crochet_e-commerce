"use client";

import { useRef } from "react";
import { FiArrowLeft, FiArrowRight, FiHeart } from "react-icons/fi";

export default function Bestsellers() {
  const scrollRef = useRef(null);

  const products = [
    { name: "Strawberry Backpack", price: "2,499", img: "/images/Strawberry_Backpack.png" },
    { name: "Crochet Sheep", price: "899", img: "/images/Crochet_Sheep.png" },
    { name: "Pearl Handle Pouch", price: "1,299", img: "/images/Pearl_Pouch.png" },
    { name: "Dreamcatcher Wall Hanging", price: "690", img: "/images/Wall_Hanging.png" },
    { name: "Granny Square Sweater", price: "1,699", img: "/images/Granny_Sweater.png" },
    { name: "Handmade Wallet", price: "699", img: "/images/Handmade_Wallet.png" },
  ];

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -280, behavior: "smooth" });

  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: 280, behavior: "smooth" });

  return (
    <section className="px-4 sm:px-6 md:px-12 py-10 md:py-16">

      {/* Heading row */}
      <div className="flex items-end justify-between mb-8 md:mb-10">
        <div>
          <p
            className="text-[11px] tracking-[0.35em] font-semibold uppercase mb-2"
            style={{ color: "#8A9580" }}
          >
            Our Bestsellers
          </p>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Loved by Many
          </h2>

          <div className="flex items-center gap-2 mt-2">
            <div className="w-16 h-[2px]" style={{ backgroundColor: "#3D5938" }} />
            <span className="text-sm" style={{ color: "#3D5938" }}>✦</span>
          </div>
        </div>

        {/* Arrow buttons */}
        <div className="hidden md:flex items-center gap-2 mb-1">
          <button
            onClick={scrollLeft}
            className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-white transition"
            style={{ borderColor: "#3D5938", color: "#3D5938" }}
          >
            <FiArrowLeft size={15} />
          </button>

          <button
            onClick={scrollRight}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white transition hover:opacity-90"
            style={{ backgroundColor: "#3D5938" }}
          >
            <FiArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Mobile scroll */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 pb-2"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {products.map((p, i) => (
            <ProductCard key={i} product={p} mobile />
          ))}
        </div>
      </div>

      {/* Desktop scroll */}
      <div className="hidden md:block">
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {products.map((p, i) => (
            <ProductCard key={i} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Product Card */
function ProductCard({ product, mobile }) {
  return (
    <div
      className={`
        group snap-start flex-shrink-0 cursor-pointer
        ${mobile ? "w-[60vw] max-w-[220px]" : "w-[22%] min-w-[200px]"}
      `}
    >
      {/* Image */}
      <div
        className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-[1.02]"
        style={{
          boxShadow: "0 6px 20px rgba(61,89,56,0.10)",
          backgroundColor: "#D4DDC8",
        }}
      >
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Wishlist */}
        <button className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition">
          <FiHeart size={13} style={{ color: "#3D5938" }} />
        </button>

        {/* Add to Cart */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            className="w-full py-2.5 text-xs font-semibold text-white tracking-wide"
            style={{ backgroundColor: "#3D5938" }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <p
        className="text-sm font-semibold leading-snug mb-0.5 truncate"
        style={{ color: "#3D5938" }}
      >
        {product.name}
      </p>

      <p className="text-sm font-bold" style={{ color: "#6B7565" }}>
        ₹{product.price}
      </p>
    </div>
  );
}