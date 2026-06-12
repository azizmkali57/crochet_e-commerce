"use client"

import React, { useState } from "react";
import { FaQuoteLeft, FaStar, FaHeart } from "react-icons/fa";
import { FiPlus, FiMinus } from "react-icons/fi";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const testimonials = [
  {
    name: "Ananya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The Strawberry Backpack is even more beautiful in person. The stitching is so neat and you can feel the love put into every detail — my daughter doesn't want to take it off.",
    product: "Strawberry Backpack",
    initials: "AS",
  },
  {
    name: "Riya Mehta",
    location: "Delhi",
    rating: 5,
    text: "I ordered a custom crochet sheep for my husband's birthday and it turned out exactly like the reference photo I sent — soft, sturdy and adorable. The packaging was so thoughtful too.",
    product: "Custom Order",
    initials: "RM",
  },
  {
    name: "Priya Nair",
    location: "Bengaluru",
    rating: 5,
    text: "The Pearl Handle Pouch is my new favourite accessory. Got so many compliments at a wedding last week — Crochet Alif's work feels luxurious yet handmade, a rare combination.",
    product: "Pearl Handle Pouch",
    initials: "PN",
  },
  {
    name: "Kavya Reddy",
    location: "Hyderabad",
    rating: 5,
    text: "Fast delivery, gorgeous colours, and the Dreamcatcher Wall Hanging looks stunning in my reading corner. Will definitely be ordering more pieces for gifts this festive season.",
    product: "Dreamcatcher Wall Hanging",
    initials: "KR",
  },
];

const faqs = [
  {
    q: "How long does a custom order take to complete?",
    a: "Most custom pieces take 7–12 days to craft, depending on size and detail, since each item is made by hand from scratch. We'll share an estimated timeline with you after confirming your design.",
  },
  {
    q: "Do you ship across India and internationally?",
    a: "Yes! We deliver across India and also ship internationally. Domestic orders typically arrive within 4–7 business days, while international shipping times vary by destination.",
  },
  {
    q: "What materials do you use for your crochet pieces?",
    a: "We use premium cotton and acrylic yarns sourced for softness, durability and colour retention, along with high-quality fillings, clasps and embellishments to ensure every piece lasts.",
  },
  {
    q: "Can I request a specific colour or design change?",
    a: "Absolutely. Most of our designs can be customised in colour, size or added details. Just reach out via the Custom Order page or message us directly with your idea.",
  },
  {
    q: "What is your return and exchange policy?",
    a: "Since every item is handmade to order, we accept returns only in case of damage or defects upon delivery. Please check our Returns & Refunds page for full details.",
  },
  {
    q: "How should I care for my crochet items?",
    a: "Hand wash gently in cold water with mild soap, reshape while damp, and dry flat in shade to keep colours and fibres in perfect condition for years.",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TestimonialsFAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="bg-[#FBF7EE] py-20 px-4 sm:px-8 lg:px-16 border-t border-[#EDE6D6]">
      <div className="max-w-7xl mx-auto">
        {/* ----------------------------------------------------------- */}
        {/* Testimonials header                                          */}
        {/* ----------------------------------------------------------- */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#9C5B45]" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#7C8B5F] uppercase">
                From Our Customers
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif text-[#2F3A24] leading-[1.15]">
              Stories Stitched
              <br className="hidden sm:block" />{" "}
              <span className="italic text-[#9C5B45]">with Love</span>
              <FaHeart className="inline-block ml-3 mb-1 text-[#C97B63] text-xl sm:text-2xl align-middle" />
            </h2>
          </div>
          <p className="mt-5 lg:mt-0 lg:max-w-sm text-[#6B7259] text-sm sm:text-base leading-relaxed">
            Real words from real homes. Every review reminds us why we craft
            each piece by hand, with patience and care.
          </p>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* Testimonials grid                                            */}
        {/* ----------------------------------------------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-7 shadow-[0_2px_12px_rgba(47,58,36,0.04)] border border-[#EFE9DC] flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_24px_rgba(47,58,36,0.08)] hover:-translate-y-1"
            >
              <div>
                <FaQuoteLeft className="text-[#E3D5BC] text-2xl mb-5" />
                <p className="text-[#4A4A3E] text-sm leading-relaxed mb-6">
                  {t.text}
                </p>
              </div>

              <div>
                <div
                  className="flex gap-1 mb-3"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <FaStar key={idx} className="text-[#E8B84B] text-xs" />
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#F1ECDD]">
                  <div className="w-9 h-9 rounded-full bg-[#EFE6D4] flex items-center justify-center text-xs font-semibold text-[#7C8B5F] flex-shrink-0">
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#2F3A24] text-sm truncate">
                      {t.name}
                    </p>
                    <p className="text-xs text-[#A8A893] truncate">
                      {t.location} &middot; {t.product}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ----------------------------------------------------------- */}
        {/* FAQ section                                                  */}
        {/* ----------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#9C5B45]" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#7C8B5F] uppercase">
                Good to Know
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-serif text-[#2F3A24] leading-[1.15] mb-5">
              Frequently Asked
              <br />
              <span className="italic text-[#9C5B45]">Questions</span>
            </h3>
            <p className="text-[#6B7259] text-sm leading-relaxed mb-6">
              Can't find what you're looking for? Reach out to us anytime and
              our team will help you find — or create — the perfect piece.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2F3A24] border-b border-[#9C5B45] pb-1 hover:text-[#9C5B45] transition-colors duration-200"
            >
              Contact our team
            </a>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-3">
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`border rounded-xl bg-white overflow-hidden transition-colors duration-200 ${
                    isOpen ? "border-[#D8C9A8]" : "border-[#EFE9DC]"
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C8B5F] focus-visible:ring-offset-2 rounded-xl"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-[#2F3A24] text-sm sm:text-base">
                      {item.q}
                    </span>
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
                        isOpen
                          ? "bg-[#7C8B5F] text-white"
                          : "bg-[#F1ECDD] text-[#7C8B5F]"
                      }`}
                    >
                      {isOpen ? <FiMinus size={14} /> : <FiPlus size={14} />}
                    </span>
                  </button>
                  <div
                    className={`px-5 sm:px-6 transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "max-h-40 pb-5 opacity-100"
                        : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <p className="text-sm text-[#6B7259] leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}