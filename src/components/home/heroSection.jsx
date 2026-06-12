"use client";

import Link from "next/link";
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
    <section className="relative overflow-hidden " style={{ minHeight: "100svh" }}>

      {/* MOBILE */}
      <div className="block md:hidden relative" style={{ minHeight: "100svh" }}>

        <div
          className="absolute "
          style={{
            backgroundImage: "url('/images/mobile_view1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(238,242,232,1) 0%, rgba(238,242,232,0.96) 30%, rgba(238,242,232,0.7) 55%, rgba(238,242,232,0) 75%)",
          }}
        />

        <div className="relative z-10 flex flex-col px-6 pt-36 pb-10" style={{ minHeight: "100svh" }}>

          <p className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-4" style={{ color: "#3D5938" }}>
            Crafted With Love
          </p>

          <h1 className="font-heading text-[38px] leading-[1.08] mb-1">
            Handmade <br /> touches,
          </h1>

          <h2 className="font-script text-[36px] leading-none mb-5" style={{ color: "#3D5938" }}>
            made for life. <span className="ml-1 text-2xl">♥</span>
          </h2>

          <p className="text-[13.5px] leading-[1.85] mb-8" style={{ color: "#4a5543", maxWidth: "280px" }}>
            Timeless crochet creations, thoughtfully handcrafted to add warmth and meaning to your everyday.
          </p>

          <div className="flex flex-col gap-3 mb-auto max-w-[260px]">
  <Link
    href="/collection"
    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-white font-semibold text-sm"
    style={{ backgroundColor: "#3D5938" }}
  >
    Explore Collections <FiArrowRight size={15} />
  </Link>

  <Link
    href="/contact"
    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-white/70 font-medium text-sm"
    style={{
      border: "1px solid #3D5938",
      color: "#3D5938",
    }}
  >
    Custom Order <FiHeart size={14} />  
  </Link>
</div>

          <div className="flex justify-between mt-10 pb-4">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-1.5">
                <div className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-base" style={{ color: "#3D5938" }}>
                  {f.icon}
                </div>
                <p className="text-[10px] font-semibold text-[#111827]">{f.title}</p>
                <p className="text-[10px] text-[#6B7565]">{f.sub}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block relative" style={{ minHeight: "100svh" }}>

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/hero_section.png')",
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(238,242,232,0.96) 0%, rgba(238,242,232,0.85) 30%, rgba(238,242,232,0.55) 50%, rgba(238,242,232,0.1) 65%, rgba(238,242,232,0) 100%)",
          }}
        />

        <div className="relative z-10 max-w-[1500px] mx-auto px-8 lg:px-16 flex flex-col justify-center" style={{ minHeight: "100svh" }}>

          <div style={{ maxWidth: "500px" }}>

            <p className="text-[11px] tracking-[0.35em] uppercase font-semibold mb-5" style={{ color: "#3D5938" }}>
              Crafted With Love
            </p>

            <h1 className="font-heading leading-[1.05]" style={{ fontSize: "clamp(44px,5vw,64px)", color: "#111827" }}>
              Handmade <br /> touches,
            </h1>

            <h2 className="font-script mt-2 mb-6" style={{ fontSize: "clamp(42px,5vw,62px)", color: "#3D5938" }}>
              made for life. <span className="ml-2 text-3xl">♥</span>
            </h2>

            <p className="text-[15px] leading-[1.9] mb-10" style={{ color: "#4a5543", maxWidth: "360px" }}>
              Timeless crochet creations, thoughtfully handcrafted to add warmth, beauty and meaning to your everyday.
            </p>

            <div className="flex items-center gap-4 mb-14 flex-wrap">
              <button className="flex items-center gap-3 px-7 py-3.5 rounded-full text-white font-semibold text-sm" style={{ backgroundColor: "#3D5938" }}>
                Explore Collections <FiArrowRight size={15} />
              </button>

              <button className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/60 font-medium text-sm" style={{ border: "1px solid #3D5938", color: "#3D5938" }}>
                Custom Order <FiHeart size={14} />
              </button>
            </div>

            <div className="flex gap-6 lg:gap-8">
              {features.map((f, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white shadow-md flex items-center justify-center mb-2" style={{ color: "#3D5938" }}>
                    {f.icon}
                  </div>
                  <p className="text-[11px] font-semibold text-[#111827]">{f.title}</p>
                  <p className="text-[11px] text-[#6B7565]">{f.sub}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}