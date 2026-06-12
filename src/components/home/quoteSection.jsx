"use client"

import React, { useRef, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

export default function BrandQuoteSection() {
  const sectionRef = useRef(null);
  const layerRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      layerRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = (i + 1) * 14;
        el.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });
    };

    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#1F2818] py-28 sm:py-36 px-4 sm:px-8 lg:px-16"
    >
      {/* animated aurora mesh gradient */}
      <div className="absolute inset-0 aurora-mesh" />

      {/* glowing floating orbs (parallax layers) */}
      <div
        ref={(el) => (layerRefs.current[0] = el)}
        className="absolute -top-32 -left-20 w-[28rem] h-[28rem] rounded-full bg-[#E8B84B] opacity-30 blur-[110px] orb-float-a transition-transform duration-300 ease-out"
      />
      <div
        ref={(el) => (layerRefs.current[1] = el)}
        className="absolute top-1/3 -right-24 w-[26rem] h-[26rem] rounded-full bg-[#C97B63] opacity-30 blur-[100px] orb-float-b transition-transform duration-300 ease-out"
      />
      <div
        ref={(el) => (layerRefs.current[2] = el)}
        className="absolute -bottom-32 left-1/4 w-[24rem] h-[24rem] rounded-full bg-[#9CA876] opacity-25 blur-[100px] orb-float-c transition-transform duration-300 ease-out"
      />
      <div
        ref={(el) => (layerRefs.current[3] = el)}
        className="absolute top-10 right-1/3 w-64 h-64 rounded-full bg-[#FBF7EE] opacity-10 blur-[80px] orb-float-d transition-transform duration-300 ease-out"
      />

      {/* twinkling thread/star specks */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 22 }).map((_, i) => {
          const size = 2 + (i % 3);
          const top = (i * 37) % 100;
          const left = (i * 53) % 100;
          const delay = (i % 7) * 0.6;
          const colors = ["#FBF7EE", "#E8B84B", "#C97B63"];
          return (
            <span
              key={i}
              className="absolute rounded-full speck"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: colors[i % colors.length],
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* vignette for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F2818]/50 via-transparent to-[#1F2818]/70 pointer-events-none" />

      {/* content */}
      <div className="relative max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-10 bg-[#E8B84B] opacity-70" />
          <FaHeart className="text-[#C97B63] text-base drop-shadow-[0_0_8px_rgba(201,123,99,0.6)]" />
          <span className="h-px w-10 bg-[#E8B84B] opacity-70" />
        </div>

        <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FBF7EE] leading-snug drop-shadow-sm">
          Made with patience.{" "}
          <span className="italic text-[#E8B84B]">Made with love.</span>
        </p>

        <p className="mt-5 text-xs sm:text-sm tracking-[0.35em] uppercase text-[#D8C9A8]">
          Crochet Alif
        </p>
      </div>

      {/* styles */}
      <style>{`
        .aurora-mesh {
          background: linear-gradient(120deg, #1F2818 0%, #2F3A24 35%, #3a4a2c 60%, #2F3A24 100%);
          background-size: 200% 200%;
          animation: aurora-shift 18s ease-in-out infinite;
        }
        @keyframes aurora-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes orb-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, 50px) scale(1.15); }
        }
        @keyframes orb-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, -40px) scale(1.1); }
        }
        @keyframes orb-c {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -60px) scale(1.12); }
        }
        @keyframes orb-d {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.10; }
          50% { transform: translate(-30px, 30px) scale(1.2); opacity: 0.18; }
        }
        .orb-float-a { animation: orb-a 20s ease-in-out infinite; }
        .orb-float-b { animation: orb-b 24s ease-in-out infinite; }
        .orb-float-c { animation: orb-c 26s ease-in-out infinite; }
        .orb-float-d { animation: orb-d 16s ease-in-out infinite; }

        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 0.9; transform: scale(1.4); }
        }
        .speck {
          animation: twinkle 4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .aurora-mesh,
          .orb-float-a, .orb-float-b, .orb-float-c, .orb-float-d,
          .speck {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}