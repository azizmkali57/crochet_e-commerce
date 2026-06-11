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

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <section
      className="px-6 md:px-16 py-12 md:py-16"
    >
      {/* Heading */}
      <div className="mb-8">
        <p className="text-[11px] tracking-[0.35em] font-semibold uppercase mb-2" style={{ color: "#8A9580" }}>
          Our Bestsellers
        </p>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900">
          Loved by Many
        </h2>
      </div>

      {/* Carousel */}
      <div className="relative flex items-center gap-3">

        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition"
          style={{ color: "#3D5938" }}
        >
          <FiArrowLeft size={16} />
        </button>

        {/* Cards row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto flex-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((p, i) => (
            <div
              key={i}
              className="flex-1 min-w-0 cursor-pointer"
            >
              {/* Image */}
              <div
                className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3"
                style={{ boxShadow: "0 6px 16px rgba(61,89,56,0.10)", backgroundColor: "#D4DDC8" }}
              >
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                <button className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-50 transition">
                  <FiHeart size={14} style={{ color: "#3D5938" }} />
                </button>
              </div>

              {/* Info */}
              <p className="text-sm font-semibold leading-tight mb-1" style={{ color: "#3D5938" }}>
                {p.name}
              </p>
              <p className="text-sm font-bold" style={{ color: "#6B7565" }}>
                ₹{p.price}
              </p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition"
          style={{ color: "#3D5938" }}
        >
          <FiArrowRight size={16} />
        </button>

      </div>
    </section>
  );
}