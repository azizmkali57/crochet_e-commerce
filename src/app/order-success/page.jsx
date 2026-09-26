"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  FiCheckCircle, 
  FiShoppingBag, 
  FiArrowRight, 
  FiPrinter, 
  FiClock, 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiShield
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FaYarn } from "react-icons/fa6";

export default function OrderSuccessPage() {
  const orderId = "CAL-94821";
  const orderDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-12 max-w-[900px] mx-auto w-full">
        
        {/* SUCCESS CONFIRMATION CARD */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-12 border border-sage/60 shadow-soft text-center relative overflow-hidden">
          
          {/* Subtle Glows */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-sage-light/30 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cream rounded-full blur-2xl pointer-events-none" />

          {/* Success Icon Badge */}
          <div className="relative z-10 w-20 h-20 bg-cream-light rounded-full flex items-center justify-center mx-auto mb-5 text-primary border border-sage ring-8 ring-primary/5">
            <FiCheckCircle size={44} className="text-primary" />
          </div>

          <span className="text-[11px] uppercase tracking-widest font-bold text-muted mb-1 block">
            Order Confirmed & Received
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-2">
            Thank You for Supporting Handmade!
          </h1>
          <p className="text-xs sm:text-sm text-warm max-w-md mx-auto mb-8">
            Your handcrafted order has been placed. Our artisans are preparing the pure cotton yarns and stitching with love.
          </p>

          {/* ORDER RECEIPT SUMMARY BOX */}
          <div className="bg-[#FAFBF8] rounded-2xl border border-sage/60 p-5 sm:p-6 text-left mb-8 space-y-4">
            
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sage-light">
              <div>
                <p className="text-[11px] uppercase tracking-wider font-semibold text-muted">
                  Order Number
                </p>
                <p className="font-mono text-sm font-bold text-primary">#{orderId}</p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-wider font-semibold text-muted">
                  Order Date
                </p>
                <p className="text-xs font-semibold text-primary">{orderDate}</p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-wider font-semibold text-muted">
                  Status
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  <FiClock size={11} /> Artisan Queued
                </span>
              </div>
            </div>

            {/* Timeline info */}
            <div className="py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-primary flex-shrink-0">
                  <FaYarn size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary">
                    Estimated Crafting & Dispatch Timeline
                  </h4>
                  <p className="text-[11px] text-warm">
                    Estimated delivery within 4-6 business days. You will receive live WhatsApp updates as stitches progress.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
            <Link
              href="/profile"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition shadow-button"
            >
              Track in My Profile / Orders
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-sage text-primary text-xs font-semibold hover:bg-cream-light transition"
            >
              Continue Shopping
            </Link>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
