"use client";

import { FiArrowRight } from "react-icons/fi";

export default function Collections() {
  const categories = [
    { name: "Bags & Pouches", img: "/images/Bags_&_Pouches.png" },
    { name: "Home Decor", img: "/images/Home_Decor.png" },
    { name: "Handkerchiefs", img: "/images/Handkerchiefs.png" },
    { name: "Wall Hangings", img: "/images/Wall_Hangings_collections.png" },
    { name: "Soft Toys", img: "/images/Soft_Toys.png" },
    { name: "Accessories", img: "/images/Accessories.png" },
  ];

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
          <div className="w-16 h-[2px]" style={{ backgroundColor: "#3D5938" }}></div>
          <span className="text-sm" style={{ color: "#3D5938" }}>✦</span>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
        {categories.map((cat, i) => (
          <div key={i} className="group cursor-pointer text-center">
            <div 
              className="relative w-full aspect-[3/4] rounded-[40%_40%_30%_30%/30%_30%_25%_25%] overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-105"
              style={{ boxShadow: "0 8px 20px rgba(61, 89, 56, 0.12)", backgroundColor: "#D4DDC8" }}
            >
              <img 
                src={cat.img} 
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs sm:text-sm font-semibold mb-1" style={{ color: "#3D5938" }}>
              {cat.name}
            </p>
            <div className="flex justify-center">
              <FiArrowRight 
                size={14} 
                className="transition-transform group-hover:translate-x-1"
                style={{ color: "#3D5938" }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}