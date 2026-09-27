"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const DEFAULT_CATEGORIES = [
  {
    name: "Bags & Pouches",
    image: "/images/Bags_&_Pouches.png",
    slug: "bags",
  },
  {
    name: "Home Decor",
    image: "/images/Home_Decor.png",
    slug: "home-decor",
  },
  {
    name: "Handkerchiefs",
    image: "/images/Handkerchiefs.png",
    slug: "handkerchiefs",
  },
  {
    name: "Wall Hangings",
    image: "/images/Wall_Hangings_collections.png",
    slug: "wall-hangings",
  },
  {
    name: "Soft Toys",
    image: "/images/Soft_Toys.png",
    slug: "soft-toys",
  },
  {
    name: "Accessories",
    image: "/images/Accessories.png",
    slug: "accessories",
  },
];

export default function Collections() {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories");
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setCategories(json.data);
        }
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [categories]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="relative max-w-[1500px] mx-auto px-6 lg:px-16 py-14 lg:py-20 overflow-hidden">

      {/* Section Heading & Desktop Scroll Controls */}
      <div className="flex items-end justify-between mb-8 md:mb-10 gap-4">
        <div>
          <p
            className="text-[11px] tracking-[0.35em] font-semibold uppercase mb-2 flex items-center gap-2"
            style={{ color: "#3D5938" }}
          >
            Explore Our <span className="text-pink-400 normal-case">♥</span>
          </p>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Collections
          </h2>

          <div className="flex items-center gap-2 mt-2">
            <div
              className="w-14 h-[2px]"
              style={{ backgroundColor: "#3D5938" }}
            ></div>
            <span className="text-xs" style={{ color: "#3D5938" }}>✦</span>
          </div>
        </div>

        {/* Scroll Navigation Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
              canScrollLeft
                ? "bg-white border-[#3D5938]/30 text-[#3D5938] hover:bg-[#3D5938] hover:text-white shadow-xs cursor-pointer"
                : "bg-gray-100/60 border-gray-200 text-gray-300 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft size={17} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
              canScrollRight
                ? "bg-white border-[#3D5938]/30 text-[#3D5938] hover:bg-[#3D5938] hover:text-white shadow-xs cursor-pointer"
                : "bg-gray-100/60 border-gray-200 text-gray-300 cursor-not-allowed"
            }`}
          >
            <FiChevronRight size={17} />
          </button>
        </div>
      </div>

      {/* Responsive Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="
          flex gap-5 sm:gap-6 md:gap-7 overflow-x-auto scroll-smooth
          snap-x snap-mandatory
          pt-2 pb-6
          scrollbar-hide
          -mx-6 px-6 lg:-mx-16 lg:px-16
        "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {categories.map((cat, i) => (
          <Link
            key={cat._id || cat.id || i}
            href={`/collection?category=${cat.slug}`}
            className="group cursor-pointer text-center flex-shrink-0 snap-start flex flex-col items-center transition-transform duration-300 hover:-translate-y-1 w-[160px] sm:w-[185px] lg:w-[205px]"
          >
            {/* Handcrafted Rounded Organic Card */}
            <div
              className="relative w-full aspect-[3/4] rounded-[36px] overflow-hidden mb-3 transition-all duration-300 group-hover:scale-103 group-hover:shadow-md border border-[#DCE4D8]/60"
              style={{
                boxShadow: "0 6px 20px rgba(61, 89, 56, 0.08)",
                backgroundColor: "#D4DDC8",
              }}
            >
              <img
                src={cat.image || cat.img || "/images/Bags_&_Pouches.png"}
                alt={cat.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://placehold.co/300x400/D4DDC8/3D5938?text=" + encodeURIComponent(cat.name);
                }}
              />
            </div>

            {/* Category Title */}
            <p className="text-xs sm:text-sm font-semibold mb-1 text-[#3D5938] group-hover:text-[#213828] transition-colors">
              {cat.name}
            </p>

            {/* Micro Arrow CTA */}
            <div className="flex justify-center">
              <FiArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1.5 text-[#3D5938]"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Visual Scroll Bar / Indicator */}
      <div className="flex justify-center items-center gap-2 mt-4 sm:hidden">
        <span className="text-[11px] text-[#62775E] tracking-wider uppercase">Swipe to explore</span>
        <FiArrowRight size={12} className="text-[#3D5938] animate-pulse" />
      </div>

    </section>
  );
}