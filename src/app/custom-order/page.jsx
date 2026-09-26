"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  FiCheck, 
  FiUploadCloud, 
  FiSend, 
  FiClock, 
  FiHeart, 
  FiShield, 
  FiChevronRight,
  FiChevronLeft,
  FiMessageCircle
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FaYarn } from "react-icons/fa6";

export default function CustomOrderPage() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Handbags & Pouches");
  const [selectedYarn, setSelectedYarn] = useState("100% Premium Cotton");
  const [selectedPalette, setSelectedPalette] = useState("Sage Meadow (Olive, Sage, Cream)");
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    email: "",
    dimensions: "",
    notes: "",
    budget: "₹1,500 - ₹3,000",
  });
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { id: "bags", name: "Handbags & Pouches", desc: "Totes, pearl pouches, wallets & backpacks", icon: "👜" },
    { id: "wearables", name: "Cardigans & Sweaters", desc: "Granny square tops, vests & scarves", icon: "🧶" },
    { id: "plushies", name: "Amigurumi & Soft Toys", desc: "Handcrafted animals, characters & dolls", icon: "🧸" },
    { id: "decor", name: "Home Decor & Tapestry", desc: "Wall hangings, coasters & table runners", icon: "🌿" },
  ];

  const yarns = [
    { name: "100% Premium Cotton", tag: "Best for Bags & Decor", feel: "Crisp stitch definition & high durability" },
    { name: "Organic Wool Blend", tag: "Best for Sweaters & Wearables", feel: "Ultra-soft, warm & cozy touch" },
    { name: "Velvet Chenille Yarn", tag: "Best for Plushies & Amigurumi", feel: "Super fluffy, soft & snuggly" },
  ];

  const colorPalettes = [
    { name: "Sage Meadow", colors: ["#3D5938", "#B5C5A8", "#E8EDE0"] },
    { name: "Warm Terracotta", colors: ["#BC6C25", "#DDA15E", "#FEFAE0"] },
    { name: "Pastel Blossom", colors: ["#C97B84", "#F4ACB7", "#FFE5D9"] },
    { name: "Classic Monochrome", colors: ["#2B2B2B", "#8D99AE", "#EDF2F4"] },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create WhatsApp Message
    const message = `🧶 *New Custom Crochet Commission Request*\n\n` +
      `👤 *Name:* ${details.name}\n` +
      `📞 *Phone:* ${details.phone}\n` +
      `✉️ *Email:* ${details.email}\n\n` +
      `📦 *Category:* ${selectedCategory}\n` +
      `🧵 *Yarn Type:* ${selectedYarn}\n` +
      `🎨 *Color Palette:* ${selectedPalette}\n` +
      `📐 *Dimensions / Size:* ${details.dimensions || "Standard"}\n` +
      `💰 *Budget Range:* ${details.budget}\n` +
      `📝 *Custom Notes / Vision:* "${details.notes || "None"}"`;

    const whatsappNumber = "917000577651";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-12 max-w-[1200px] mx-auto w-full">
        
        {/* HERO TITLE */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-primary border border-sage/60 mb-3 shadow-xs">
            <FaYarn className="text-primary" /> Bespoke Artisan Studio
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl text-primary font-bold">
            Bring Your Dream Crochet to Life
          </h1>
          <p className="text-xs sm:text-sm text-warm mt-2">
            Collaborate directly with our master artisans. Choose your favorite yarn, palette, and dimensions.
          </p>
        </div>

        {/* STEP PROGRESS INDICATOR */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-sage-light/60 z-0" />
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step >= s
                    ? "bg-primary text-white shadow-button"
                    : "bg-white text-muted border border-sage/60"
                }`}
              >
                {step > s ? <FiCheck size={14} /> : s}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[11px] font-semibold text-primary mt-2 px-1">
            <span>1. Choose Piece</span>
            <span>2. Yarn & Palette</span>
            <span>3. Measurements & Request</span>
          </div>
        </div>

        {submitted ? (
          /* SUCCESS CONFIRMATION */
          <div className="bg-white/95 rounded-3xl p-8 sm:p-12 border border-sage/60 shadow-soft max-w-xl mx-auto text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center text-primary mx-auto mb-4 border border-sage">
              <FaWhatsapp size={32} className="text-emerald-600" />
            </div>
            <h2 className="font-heading text-2xl text-primary font-bold mb-2">
              Commission Request Sent!
            </h2>
            <p className="text-xs sm:text-sm text-warm leading-relaxed mb-6">
              Thank you, <span className="font-semibold text-primary">{details.name}</span>! Our artisan team has received your custom inquiry on WhatsApp. We will reply within 2-4 hours with sketches, yarn samples & price quotation.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition shadow-button"
            >
              Return to Storefront
            </Link>
          </div>
        ) : (
          /* MULTI-STEP STUDIO FORM */
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-sage/50 shadow-soft max-w-3xl mx-auto">
            
            {/* STEP 1: CATEGORY */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-xl font-bold text-primary">
                    Select Your Piece Type
                  </h3>
                  <p className="text-xs text-warm mt-0.5">
                    What kind of handcrafted crochet creation would you like us to weave?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                        selectedCategory === cat.name
                          ? "border-primary bg-cream-light/60 shadow-xs"
                          : "border-sage/40 hover:border-sage hover:bg-cream-light/20"
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{cat.icon}</span>
                      <h4 className="font-heading text-sm font-bold text-primary">
                        {cat.name}
                      </h4>
                      <p className="text-[11px] text-warm mt-1">
                        {cat.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-dark shadow-button transition"
                  >
                    <span>Next: Select Yarn & Colors</span>
                    <FiChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: YARN & PALETTE */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-xl font-bold text-primary">
                    Pick Your Preferred Yarn & Color Tone
                  </h3>
                  <p className="text-xs text-warm mt-0.5">
                    Choose premium texture and harmonious colorways for your piece.
                  </p>
                </div>

                {/* Yarn selection */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-primary uppercase tracking-wider">
                    Yarn Material
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {yarns.map((y) => (
                      <div
                        key={y.name}
                        onClick={() => setSelectedYarn(y.name)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                          selectedYarn === y.name
                            ? "border-primary bg-cream-light/60"
                            : "border-sage/40 hover:border-sage"
                        }`}
                      >
                        <p className="text-xs font-bold text-primary">{y.name}</p>
                        <p className="text-[10px] text-emerald-700 font-semibold mt-1">{y.tag}</p>
                        <p className="text-[10px] text-warm mt-0.5">{y.feel}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Palette selection */}
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-bold text-primary uppercase tracking-wider">
                    Harmonious Color Palette
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {colorPalettes.map((p) => (
                      <div
                        key={p.name}
                        onClick={() => setSelectedPalette(p.name)}
                        className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition ${
                          selectedPalette === p.name
                            ? "border-primary bg-cream-light/60"
                            : "border-sage/40 hover:border-sage"
                        }`}
                      >
                        <span className="text-xs font-bold text-primary">{p.name}</span>
                        <div className="flex items-center gap-1.5">
                          {p.colors.map((c, i) => (
                            <span
                              key={i}
                              className="w-5 h-5 rounded-full border border-white shadow-2xs"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-sage text-primary text-xs font-semibold hover:bg-cream-light transition"
                  >
                    <FiChevronLeft size={14} /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-dark shadow-button transition"
                  >
                    <span>Next: Add Measurements</span>
                    <FiChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: MEASUREMENTS & SUBMIT */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-heading text-xl font-bold text-primary">
                    Final Details & Artisan Quotation
                  </h3>
                  <p className="text-xs text-warm mt-0.5">
                    Provide dimensions and your contact info so we can craft your estimate.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={details.name}
                      onChange={(e) => setDetails({ ...details, name: e.target.value })}
                      placeholder="e.g. Ayesha Khan"
                      className="w-full px-4 py-2.5 bg-cream-light/40 border border-sage/60 rounded-xl text-xs text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={details.phone}
                      onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 bg-cream-light/40 border border-sage/60 rounded-xl text-xs text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
                      Dimensions / Size Preference
                    </label>
                    <input
                      type="text"
                      value={details.dimensions}
                      onChange={(e) => setDetails({ ...details, dimensions: e.target.value })}
                      placeholder="e.g. 25cm x 18cm or Medium (M)"
                      className="w-full px-4 py-2.5 bg-cream-light/40 border border-sage/60 rounded-xl text-xs text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
                      Target Budget
                    </label>
                    <select
                      value={details.budget}
                      onChange={(e) => setDetails({ ...details, budget: e.target.value })}
                      className="w-full px-4 py-2.5 bg-cream-light/40 border border-sage/60 rounded-xl text-xs text-primary focus:outline-none focus:border-primary"
                    >
                      <option>Under ₹1,500</option>
                      <option>₹1,500 - ₹3,000</option>
                      <option>₹3,000 - ₹5,000</option>
                      <option>₹5,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
                    Describe Your Vision / Inspiration Notes
                  </label>
                  <textarea
                    rows={3}
                    value={details.notes}
                    onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                    placeholder="Tell us about specific patterns, pearl accents, handle styles or occasion details..."
                    className="w-full px-4 py-2.5 bg-cream-light/40 border border-sage/60 rounded-xl text-xs text-primary focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Summary Pill */}
                <div className="p-4 rounded-xl bg-cream-light/60 border border-sage-light text-xs text-primary space-y-1">
                  <p><strong>Piece:</strong> {selectedCategory} • <strong>Yarn:</strong> {selectedYarn}</p>
                  <p><strong>Color Tone:</strong> {selectedPalette}</p>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-sage text-primary text-xs font-semibold hover:bg-cream-light transition"
                  >
                    <FiChevronLeft size={14} /> Back
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-button transition"
                  >
                    <FaWhatsapp size={16} />
                    <span>Send Custom Request on WhatsApp</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
