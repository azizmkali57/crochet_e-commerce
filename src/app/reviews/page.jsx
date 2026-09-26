"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  FiStar, 
  FiCheckCircle, 
  FiHeart, 
  FiMessageSquare,
  FiFilter
} from "react-icons/fi";
import { BsStarFill } from "react-icons/bs";
import { FaYarn } from "react-icons/fa6";

export default function ReviewsPage() {
  const [filterRating, setFilterRating] = useState(0);

  const reviews = [
    {
      id: 1,
      author: "Sneha Parikh",
      location: "Mumbai",
      date: "14 Sep 2026",
      rating: 5,
      product: "Pearl Crochet Pouch",
      review: "The pearl beading and the olive stitch definition are absolutely breathtaking! You can genuinely feel the hours of patient craftsmanship that went into making this. Got so many compliments at my cousin's wedding.",
      img: "/images/Pearl_Pouch.png",
      verified: true,
    },
    {
      id: 2,
      author: "Ananya Deshmukh",
      location: "Pune",
      date: "02 Sep 2026",
      rating: 5,
      product: "Granny Square Sweater",
      review: "Softest sweater I have ever owned! It’s warm yet super breathable. Love supporting authentic handcrafted art. The complimentary gift note was such a sweet touch!",
      img: "/images/Granny_Sweater.png",
      verified: true,
    },
    {
      id: 3,
      author: "Rituja Sen",
      location: "Kolkata",
      date: "28 Aug 2026",
      rating: 5,
      product: "Strawberry Backpack",
      review: "Cutest bag ever! The strawberry texture and leaf drawstring are woven to perfection. Sturdy cotton yarn that holds all my daily essentials without sagging.",
      img: "/images/Strawberry_Backpack.png",
      verified: true,
    },
    {
      id: 4,
      author: "Meera Nair",
      location: "Bengaluru",
      date: "19 Aug 2026",
      rating: 5,
      product: "Handcrafted Crochet Sheep",
      review: "Ordered this for my daughter's nursery and it's even cuter in person. Super soft and safe for little hands. Will definitely order again!",
      img: "/images/Crochet_Sheep.png",
      verified: true,
    },
  ];

  const filtered = filterRating === 0 ? reviews : reviews.filter((r) => r.rating === filterRating);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-12 max-w-[1200px] mx-auto w-full">
        
        {/* HERO TITLE */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-primary border border-sage/60 mb-3 shadow-xs">
            <FiHeart className="text-rose-500 fill-rose-500" /> Real Stories from Patrons
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl text-primary font-bold">
            Customer Reviews & Love
          </h1>
          <p className="text-xs sm:text-sm text-warm mt-2">
            Read authentic feedback from collectors and crochet lovers who cherish handmade creations.
          </p>
        </div>

        {/* SUMMARY STATS BAR */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-sage/50 shadow-soft mb-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-xs uppercase font-bold text-muted tracking-wider">Overall Rating</p>
            <div className="flex items-center justify-center gap-1.5 my-1">
              <span className="font-heading text-3xl font-extrabold text-primary">4.9</span>
              <div className="flex text-amber-400 text-sm">
                {[1, 2, 3, 4, 5].map((s) => (
                  <BsStarFill key={s} />
                ))}
              </div>
            </div>
            <p className="text-[11px] text-warm">Based on 350+ verified patrons</p>
          </div>

          <div className="sm:border-x border-sage-light">
            <p className="text-xs uppercase font-bold text-muted tracking-wider">Handcrafted Quality</p>
            <p className="font-heading text-3xl font-extrabold text-primary my-1">100%</p>
            <p className="text-[11px] text-warm">Pure yarn & artisan checked</p>
          </div>

          <div>
            <p className="text-xs uppercase font-bold text-muted tracking-wider">Repeat Orders</p>
            <p className="font-heading text-3xl font-extrabold text-primary my-1">94%</p>
            <p className="text-[11px] text-warm">Patrons who ordered again</p>
          </div>
        </div>

        {/* REVIEWS LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filtered.map((rev) => (
            <div
              key={rev.id}
              className="bg-white/90 rounded-3xl p-6 border border-sage/50 shadow-soft flex flex-col justify-between"
            >
              <div>
                {/* Product & Stars row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-cream overflow-hidden border border-sage-light flex-shrink-0">
                      <img src={rev.img} alt={rev.product} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-primary">{rev.product}</h4>
                      <p className="text-[11px] text-muted">{rev.date}</p>
                    </div>
                  </div>

                  <div className="flex text-amber-400 text-xs">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <BsStarFill key={s} />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-warm leading-relaxed italic mb-4">
                  "{rev.review}"
                </p>
              </div>

              {/* Author footer */}
              <div className="flex items-center justify-between pt-3 border-t border-sage-light text-xs">
                <span className="font-bold text-primary">{rev.author}, {rev.location}</span>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                  <FiCheckCircle size={12} /> Verified Patron
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="text-center p-8 rounded-3xl bg-gradient-to-r from-cream via-cream-light to-sage-light/40 border border-sage/50">
          <h3 className="font-heading text-xl font-bold text-primary mb-2">
            Have a custom idea in mind?
          </h3>
          <p className="text-xs text-warm mb-5">
            Share your vision and our artisans will bring it to life stitch by stitch.
          </p>
          <Link
            href="/custom-order"
            className="px-6 py-3 rounded-full bg-primary text-white text-xs font-semibold shadow-button hover:bg-primary-dark transition inline-block"
          >
            Create Custom Piece
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
