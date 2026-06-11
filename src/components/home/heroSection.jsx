"use client";

import { FiArrowRight, FiHeart } from "react-icons/fi";
import {
  PiPlantBold,
  PiHandHeartBold,
  PiGiftBold,
  PiTruckBold,
} from "react-icons/pi";

export default function HeroSection() {
  const features = [
    { icon: <PiPlantBold />, title: "Premium", sub: "Materials" },
    { icon: <PiHandHeartBold />, title: "Handmade", sub: "with Love" },
    { icon: <PiGiftBold />, title: "Custom", sub: "Made" },
    { icon: <PiTruckBold />, title: "Worldwide", sub: "Delivery" },
  ];

  return (
    <section
      className="relative min-h-screen overflow-hidden"
    >
      {/* ── BACKGROUND IMAGE — covers entire section ── */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/images/hero_section.png')",
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* ── LEFT GRADIENT OVERLAY — fades left side to bg color so text is readable ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(238,242,232,0.92) 0%, rgba(238,242,232,0.75) 35%, rgba(238,242,232,0.1) 55%, rgba(238,242,232,0) 100%)",
        }}
      />

      {/* ── Soft organic top-left shape ── */}
      <div
        className="absolute top-0 left-0 w-[220px] h-[220px] rounded-br-[120px] opacity-40 pointer-events-none"
        style={{ backgroundColor: "#C7D4BB" }}
      />

      {/* ── CONTENT — left side only, on top of everything ── */}
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-16 pt-36 pb-20">
        <div className="max-w-[480px]">

          <p
            className="text-[11px] tracking-[0.35em] uppercase font-semibold mb-5"
            style={{ color: "#3D5938" }}
          >
            Crafted With Love
          </p>

          <h1
            className="font-heading text-[58px] leading-[1.05]"
            style={{ color: "#111827" }}
          >
            Handmade
            <br />
            touches,
          </h1>

          <h2
            className="font-script text-[58px] leading-none mt-2 mb-6"
            style={{ color: "#3D5938" }}
          >
            made for life.
            <span className="ml-2 text-3xl">♥</span>
          </h2>

          <p
            className="text-[15px] leading-[1.9] mb-10 max-w-[360px]"
            style={{ color: "#4a5543" }}
          >
            Timeless crochet creations, thoughtfully handcrafted to add
            warmth, beauty and meaning to your everyday.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mb-14">
            <button
              className="flex items-center gap-3 px-6 py-3 rounded-full text-white font-medium"
              style={{ backgroundColor: "#3D5938" }}
            >
              Explore Collections
              <FiArrowRight />
            </button>

            <button
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/60 font-medium"
              style={{ border: "1px solid #3D5938", color: "#3D5938" }}
            >
              Custom Order
              <FiHeart />
            </button>
          </div>

          {/* Feature icons */}
          <div className="flex gap-7">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div
                  className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center text-lg mb-2"
                  style={{ color: "#3D5938" }}
                >
                  {f.icon}
                </div>
                <p className="text-[12px] font-semibold text-[#111827]">{f.title}</p>
                <p className="text-[12px]" style={{ color: "#6B7565" }}>{f.sub}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}