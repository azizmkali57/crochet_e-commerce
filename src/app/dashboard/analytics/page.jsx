"use client";

import React from "react";
import {
  FiTrendingUp,
  FiArrowUpRight,
  FiArrowDownRight,
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiEye
} from "react-icons/fi";
import { FaYarn } from "react-icons/fa6";

export default function DashboardAnalyticsPage() {
  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#1C2C1D]">
          Sales & Yarn Analytics
        </h1>
        <p className="text-xs text-[#62775E] mt-0.5">
          Detailed metrics on artisan revenue, best-selling crochet collections & customer growth.
        </p>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "₹1,93,450", change: "+35%", up: true, icon: FiDollarSign },
          { label: "Handmade Orders", value: "482 pcs", change: "+18%", up: true, icon: FiShoppingBag },
          { label: "Active Patrons", value: "318", change: "+12%", up: true, icon: FiUsers },
          { label: "Catalog Views", value: "565K", change: "-4%", up: false, icon: FiEye },
        ].map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-[#D5E0D0] shadow-2xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#5F7A5E] uppercase tracking-wider">
                  {m.label}
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#EEF2EB] flex items-center justify-center text-[#3D5938]">
                  <Icon size={16} />
                </div>
              </div>
              <p className="font-heading text-2xl font-extrabold text-[#1C2C1D] mb-1">
                {m.value}
              </p>
              <div
                className={`flex items-center gap-1 text-[11px] font-bold ${
                  m.up ? "text-[#137333]" : "text-[#C5221F]"
                }`}
              >
                {m.up ? <FiArrowUpRight size={14} /> : <FiArrowDownRight size={14} />}
                <span>{m.change} vs prior month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CATEGORY BREAKDOWN CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#D5E0D0] shadow-2xs space-y-4">
          <h3 className="font-heading text-base font-bold text-[#1C2C1D]">
            Top Crochet Categories by Sales
          </h3>
          <div className="space-y-3 text-xs">
            {[
              { name: "Granny Square Sweaters & Cardigans", share: "45%", count: "189 orders" },
              { name: "Pearl Pouches & Handbags", share: "30%", count: "142 orders" },
              { name: "Handcrafted Amigurumi & Plushies", share: "15%", count: "88 orders" },
              { name: "Wall Hangings & Home Decor", share: "10%", count: "63 orders" },
            ].map((cat, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#F8FAF6] border border-[#EAEFE8] flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#1C2C1D]">{cat.name}</p>
                  <p className="text-[11px] text-[#738870]">{cat.count}</p>
                </div>
                <span className="font-bold text-[#3D5938] bg-[#E6F4EA] px-2.5 py-1 rounded-full text-xs">
                  {cat.share}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#D5E0D0] shadow-2xs space-y-4">
          <h3 className="font-heading text-base font-bold text-[#1C2C1D]">
            Yarn Utilization & Material Stats
          </h3>
          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-[#1C2C1D] mb-1">
                <span>Premium Cotton Yarn (Olive & Sage)</span>
                <span>85% Utilized</span>
              </div>
              <div className="w-full h-2.5 bg-[#EEF2EB] rounded-full overflow-hidden">
                <div className="h-full bg-[#3D5938] rounded-full" style={{ width: "85%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-[#1C2C1D] mb-1">
                <span>Ivory & Pastel Wool Blend</span>
                <span>62% Utilized</span>
              </div>
              <div className="w-full h-2.5 bg-[#EEF2EB] rounded-full overflow-hidden">
                <div className="h-full bg-[#A8CF45] rounded-full" style={{ width: "62%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-[#1C2C1D] mb-1">
                <span>Pearl & Wooden Beading Accessories</span>
                <span>40% Utilized</span>
              </div>
              <div className="w-full h-2.5 bg-[#EEF2EB] rounded-full overflow-hidden">
                <div className="h-full bg-[#E88D39] rounded-full" style={{ width: "40%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
