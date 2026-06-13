"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useRef } from "react";
import { getAllProducts } from "../../../lib/productData";

export default function Collections() {
  // Get all products to extract unique categories
  const allProducts = getAllProducts();
  
  // Group products by category (you can customize this based on your needs)
  const categories = [
    {
      name: "Bags & Pouches",
      img: "/images/Bags_&_Pouches.png",
      slug: "bags", // Optional: for filtering
      description: "Beautiful handcrafted bags and pouches",
    },
    {
      name: "Home Decor",
      img: "/images/Home_Decor.png",
      slug: "home-decor",
      description: "Add warmth to your space",
    },
    {
      name: "Handkerchiefs",
      img: "/images/Handkerchiefs.png",
      slug: "handkerchiefs",
      description: "Delicate and practical",
    },
    {
      name: "Wall Hangings",
      img: "/images/Wall_Hangings_collections.png",
      slug: "wall-hangings",
      description: "Transform your walls",
    },
    {
      name: "Soft Toys",
      img: "/images/Soft_Toys.png",
      slug: "soft-toys",
      description: "Adorable and huggable",
    },
    {
      name: "Accessories",
      img: "/images/Accessories.png",
      slug: "accessories",
      description: "Complete your look",
    },
  ];

  const scrollRef = useRef(null);

  return (
    <section className="relative px-4 sm:px-6 md:px-12 py-12 md:py-16 overflow-hidden">

      {/* Section Heading */}
      <div className="mb-8 md:mb-12">
        <p
          className="text-[11px] tracking-[0.35em] font-semibold uppercase mb-2 flex items-center gap-2"
          style={{ color: "#3D5938" }}
        >
          Explore Our <span className="text-pink-400 normal-case">♥</span>
        </p>

        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900">
          Collections
        </h2>

        <div className="flex items-center gap-2 mt-2">
          <div
            className="w-16 h-[2px]"
            style={{ backgroundColor: "#3D5938" }}
          ></div>
          <span className="text-sm" style={{ color: "#3D5938" }}>✦</span>
        </div>
      </div>

      {/* Mobile scroll container */}
      <div
        ref={scrollRef}
        className="
          flex gap-4 overflow-x-auto scroll-smooth
          snap-x snap-mandatory
          pb-4
          scrollbar-hide
          -mx-4 px-4          
          sm:hidden
        "
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {categories.map((cat, i) => (
          <Link
            key={i}
            href={`/collection?category=${cat.slug}`}
            className="group cursor-pointer text-center flex-shrink-0 snap-start hover:opacity-80 transition-opacity"
            style={{ width: "38vw", maxWidth: "160px" }}
          >
            <div
              className="relative w-full aspect-[3/4] rounded-[40%_40%_30%_30%/30%_30%_25%_25%] overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-105"
              style={{
                boxShadow: "0 8px 20px rgba(61, 89, 56, 0.12)",
                backgroundColor: "#D4DDC8",
              }}
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs font-semibold mb-1" style={{ color: "#3D5938" }}>
              {cat.name}
            </p>

            <div className="flex justify-center">
              <FiArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-1"
                style={{ color: "#3D5938" }}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Scroll hint dots */}
      <div className="flex justify-center gap-1.5 mt-4 sm:hidden">
        {categories.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: i === 0 ? "#3D5938" : "#D4DDC8" }}
          />
        ))}
      </div>

      {/* Desktop grid */}
      <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
        {categories.map((cat, i) => (
          <Link
            key={i}
            href={`/collection?category=${cat.slug}`}
            className="group cursor-pointer text-center hover:opacity-80 transition-opacity"
          >
            <div
              className="relative w-full aspect-[3/4] rounded-[40%_40%_30%_30%/30%_30%_25%_25%] overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-105"
              style={{
                boxShadow: "0 8px 20px rgba(61, 89, 56, 0.12)",
                backgroundColor: "#D4DDC8",
              }}
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm font-semibold mb-1" style={{ color: "#3D5938" }}>
              {cat.name}
            </p>

            <div className="flex justify-center">
              <FiArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
                style={{ color: "#3D5938" }}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}