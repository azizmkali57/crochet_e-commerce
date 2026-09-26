"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  FiSun, 
  FiDroplet, 
  FiWind, 
  FiAlertCircle, 
  FiCheck, 
  FiHeart 
} from "react-icons/fi";
import { FaYarn } from "react-icons/fa6";

export default function CareGuidePage() {
  const careSteps = [
    {
      icon: FiDroplet,
      title: "Hand Wash Gently in Cold Water",
      desc: "Always wash your crochet pieces by hand using mild liquid detergent or baby shampoo. Avoid harsh detergents or hot water to keep colors vibrant and prevent yarn shrinkage.",
      tip: "Soak for 5-10 minutes. Never vigorously scrub delicate loops or lace stitches.",
    },
    {
      icon: FiWind,
      title: "Never Wring or Twist",
      desc: "Wringing will stretch and warp the handcrafted stitch architecture. Instead, gently press excess water out by sandwiching the piece inside a clean, dry towel and rolling it up like a sushi roll.",
      tip: "Gently press down with your hands to absorb moisture.",
    },
    {
      icon: FiSun,
      title: "Dry Flat in Shade",
      desc: "Reshape your sweater, bag, or plushie gently while damp and lay it flat on a clean dry towel or drying rack in a shaded, well-ventilated area.",
      tip: "Never hang crochet on hangers when wet — the weight of water will pull stitches out of shape.",
    },
    {
      icon: FaYarn,
      title: "Storing Handcrafted Art",
      desc: "Fold cardigans and bags neatly and store them in breathable cotton bags. Avoid direct sunlight and moisture. Use natural cedarwood balls or lavender sachets for moth protection.",
      tip: "Keep pearl beading and metallic charms dry and gently wipe with microfiber cloth.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-12 max-w-[1200px] mx-auto w-full">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-primary border border-sage/60 mb-3 shadow-xs">
            <FiHeart className="text-rose-400" /> Longevity & Craftsmanship
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl text-primary font-bold">
            Crochet Care & Washing Guide
          </h1>
          <p className="text-xs sm:text-sm text-warm mt-2 leading-relaxed">
            Every stitch was crafted by hand with immense patience. Follow these gentle steps to keep your heirloom crochet soft, vibrant, and timeless for years.
          </p>
        </div>

        {/* 4 CARE STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {careSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-sage/50 shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center text-primary mb-4 shadow-xs">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <span className="text-[11px] font-bold text-muted uppercase tracking-wider block mb-1">
                    Step {idx + 1}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-warm leading-relaxed mb-4">
                    {step.desc}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-cream-light/60 border border-sage-light text-xs text-primary font-medium flex items-start gap-2">
                  <FiCheck className="text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Artisan Tip:</strong> {step.tip}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* WHAT TO AVOID BANNER */}
        <div className="bg-rose-50/70 rounded-3xl p-6 sm:p-8 border border-rose-200/80 mb-12">
          <h3 className="font-heading text-lg font-bold text-rose-900 mb-3 flex items-center gap-2">
            <FiAlertCircle /> What to Avoid with Pure Yarn Pieces
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-rose-800">
            <li className="flex items-center gap-2 bg-white/80 p-3 rounded-xl border border-rose-100">
              ❌ No chlorine bleach or harsh stain removers
            </li>
            <li className="flex items-center gap-2 bg-white/80 p-3 rounded-xl border border-rose-100">
              ❌ Never tumble dry in hot machine dryers
            </li>
            <li className="flex items-center gap-2 bg-white/80 p-3 rounded-xl border border-rose-100">
              ❌ Do not hang wet pieces on sharp wire hooks
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white text-xs font-semibold shadow-button hover:bg-primary-dark transition"
          >
            Explore Handcrafted Creations &rarr;
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
