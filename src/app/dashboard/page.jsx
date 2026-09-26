"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiArrowUpRight,
  FiArrowDownRight,
  FiMoreHorizontal,
  FiCalendar,
  FiShoppingBag,
  FiCheckCircle,
  FiClock,
  FiChevronRight,
  FiTrendingUp,
  FiEye,
  FiGift
} from "react-icons/fi";
import { FaYarn } from "react-icons/fa6";

export default function DashboardOverviewPage() {
  const [dateRange, setDateRange] = useState("Jan 2026 - May 2026");

  // Recent Transactions Data (handcrafted products)
  const transactions = [
    {
      id: "ORD-9481",
      product: "Pearl Crochet Pouch",
      date: "Sep 24th 2026",
      status: "Completed",
      statusColor: "bg-[#E6F4EA] text-[#137333]",
      img: "/images/Pearl_Pouch.png",
      code: "CRO-8921-SNC",
      price: "₹1,299",
    },
    {
      id: "ORD-9480",
      product: "Granny Square Sweater",
      date: "Sep 24th 2026",
      status: "In Stitching",
      statusColor: "bg-[#FEF7E0] text-[#B06000]",
      img: "/images/Granny_Sweater.png",
      code: "CRO-8410-LNK",
      price: "₹3,499",
    },
    {
      id: "ORD-9479",
      product: "Strawberry Backpack",
      date: "Sep 23rd 2026",
      status: "In Stitching",
      statusColor: "bg-[#FEF7E0] text-[#B06000]",
      img: "/images/Strawberry_Backpack.png",
      code: "CRO-7729-SNC",
      price: "₹2,899",
    },
    {
      id: "ORD-9478",
      product: "Handcrafted Crochet Sheep",
      date: "Sep 22nd 2026",
      status: "Completed",
      statusColor: "bg-[#E6F4EA] text-[#137333]",
      img: "/images/Crochet_Sheep.png",
      code: "CRO-6502-PLM",
      price: "₹1,499",
    },
    {
      id: "ORD-9477",
      product: "Vintage Handmade Wallet",
      date: "Sep 21st 2026",
      status: "Completed",
      statusColor: "bg-[#E6F4EA] text-[#137333]",
      img: "/images/Handmade_Wallet.png",
      code: "CRO-5190-VNT",
      price: "₹1,200",
    },
    {
      id: "ORD-9476",
      product: "Boho Wall Hanging Tapestry",
      date: "Sep 20th 2026",
      status: "Completed",
      statusColor: "bg-[#E6F4EA] text-[#137333]",
      img: "/images/Wall_Hanging.png",
      code: "CRO-4012-BOH",
      price: "₹1,999",
    },
  ];

  // Revenue Bar Heights (Income vs Expenses)
  const revenueBars = [
    { month: "Jan", income: 65, expense: 40 },
    { month: "Feb", income: 85, expense: 45 },
    { month: "Mar", income: 55, expense: 35 },
    { month: "Apr", income: 95, expense: 50 },
    { month: "May", income: 75, expense: 40 },
    { month: "Jun", income: 90, expense: 60 },
    { month: "Jul", income: 80, expense: 45 },
  ];

  return (
    <div className="space-y-6">
      
      {/* TOP TITLE ROW & DATE FILTER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#1C2C1D]">
            Dashboard
          </h1>
          <p className="text-xs text-[#62775E] mt-0.5">
            An artisan way to manage handmade sales with care and precision.
          </p>
        </div>

        {/* Date Filter button */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#D5E0D0] text-xs font-semibold text-[#2F4430] shadow-2xs self-start sm:self-auto cursor-pointer">
          <FiCalendar size={14} className="text-[#5F7A5E]" />
          <span>{dateRange}</span>
        </div>
      </div>

      {/* 3-COLUMN MAIN DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT & CENTER 8 COLS */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* STATS TOP 3 CARDS ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* 1. DARK ACCENT CARD (Highlight) */}
            <div className="bg-[#142A1A] text-white rounded-2xl p-5 shadow-xs flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#A8CF45]/10 rounded-full blur-xl pointer-events-none" />
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#A8CF45] animate-pulse" />
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#A8CF45]">
                    Artisan Update
                  </span>
                </div>
                <p className="text-[11px] text-[#8EA88B]">Sep 24th 2026</p>
                <h3 className="font-heading text-lg font-bold mt-1 text-white leading-snug">
                  Handcrafted revenue increased 42% in 1 week
                </h3>
              </div>
              <Link
                href="/dashboard/analytics"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#A8CF45] hover:underline"
              >
                See Statistics <FiChevronRight size={14} />
              </Link>
            </div>

            {/* 2. NET INCOME CARD */}
            <div className="bg-white rounded-2xl p-5 border border-[#D5E0D0] shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#5F7A5E] uppercase tracking-wider">
                  Net Income
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <FiMoreHorizontal size={16} />
                </button>
              </div>
              <div className="my-2">
                <p className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1C2C1D]">
                  ₹1,93,450
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#137333]">
                <FiArrowUpRight size={14} />
                <span>+35% from last month</span>
              </div>
            </div>

            {/* 3. TOTAL RETURN / REFUND */}
            <div className="bg-white rounded-2xl p-5 border border-[#D5E0D0] shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#5F7A5E] uppercase tracking-wider">
                  Total Return
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <FiMoreHorizontal size={16} />
                </button>
              </div>
              <div className="my-2">
                <p className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1C2C1D]">
                  ₹3,200
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#C5221F]">
                <FiArrowDownRight size={14} />
                <span>-24% from last month</span>
              </div>
            </div>

          </div>

          {/* REVENUE GRAPH & RECENT TRANSACTIONS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* RECENT TRANSACTIONS TABLE (7 cols) */}
            <div className="md:col-span-7 bg-white rounded-2xl p-5 border border-[#D5E0D0] shadow-2xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EAEFE8]">
                <h3 className="font-heading text-base font-bold text-[#1C2C1D]">
                  Recent Orders
                </h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <FiMoreHorizontal size={16} />
                </button>
              </div>

              <div className="space-y-3.5">
                {transactions.slice(0, 5).map((t) => (
                  <div key={t.id} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F0F4EC] border border-[#D8E2D3] overflow-hidden flex-shrink-0">
                        <img
                          src={t.img}
                          alt={t.product}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-bold text-[#1C2C1D] truncate">
                          {t.product}
                        </h4>
                        <p className="text-[10px] text-[#738870]">{t.date}</p>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${t.statusColor}`}
                      >
                        {t.status}
                      </span>
                      <p className="text-[10px] font-mono text-[#8C9E89] mt-0.5">
                        {t.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-[#EAEFE8] text-center">
                <Link
                  href="/dashboard/orders"
                  className="text-xs font-bold text-[#3D5938] hover:underline"
                >
                  View All Orders &rarr;
                </Link>
              </div>
            </div>

            {/* REVENUE BAR CHART (5 cols) */}
            <div className="md:col-span-5 bg-white rounded-2xl p-5 border border-[#D5E0D0] shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#5F7A5E] uppercase tracking-wider">
                    Revenue
                  </span>
                  <div className="flex items-center gap-3 text-[10px] font-semibold">
                    <span className="flex items-center gap-1 text-[#142A1A]">
                      <span className="w-2 h-2 rounded-full bg-[#142A1A]" /> Income
                    </span>
                    <span className="flex items-center gap-1 text-[#8FB535]">
                      <span className="w-2 h-2 rounded-full bg-[#A8CF45]" /> Expenses
                    </span>
                  </div>
                </div>

                <div className="my-2">
                  <p className="font-heading text-xl font-extrabold text-[#1C2C1D]">
                    ₹1,93,000
                  </p>
                  <p className="text-[10px] font-bold text-[#137333] flex items-center gap-1 mt-0.5">
                    <FiArrowUpRight size={12} /> +35% from last month
                  </p>
                </div>
              </div>

              {/* Bar visualization */}
              <div className="h-44 pt-4 flex items-end justify-between gap-2 border-b border-[#EAEFE8]">
                {revenueBars.map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="w-full flex items-end justify-center gap-1 h-full">
                      {/* Income Bar (Dark Olive) */}
                      <div
                        className="w-2.5 sm:w-3 bg-[#142A1A] rounded-t-md transition-all duration-500 hover:opacity-80"
                        style={{ height: `${bar.income}%` }}
                        title={`Income: ${bar.income}%`}
                      />
                      {/* Expense Bar (Lime/Sage Accent) */}
                      <div
                        className="w-2.5 sm:w-3 bg-[#A8CF45] rounded-t-md transition-all duration-500 hover:opacity-80"
                        style={{ height: `${bar.expense}%` }}
                        title={`Expense: ${bar.expense}%`}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-[#738870]">
                      {bar.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* SALES REPORT HORIZONTAL BARS */}
          <div className="bg-white rounded-2xl p-5 border border-[#D5E0D0] shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EAEFE8]">
              <h3 className="font-heading text-base font-bold text-[#1C2C1D]">
                Sales & Crafting Report
              </h3>
              <button className="text-gray-400 hover:text-gray-600">
                <FiMoreHorizontal size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Row 1 */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#1C2C1D] mb-1.5">
                  <span>Product Launched (233)</span>
                  <span className="text-[#5F7A5E]">78%</span>
                </div>
                <div className="w-full h-3 bg-[#EEF2EB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#A8CF45] rounded-full" style={{ width: "78%" }} />
                </div>
              </div>

              {/* Row 2 */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#1C2C1D] mb-1.5">
                  <span>Ongoing Crafting Commissions (23)</span>
                  <span className="text-[#5F7A5E]">45%</span>
                </div>
                <div className="w-full h-3 bg-[#EEF2EB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#A8CF45] rounded-full" style={{ width: "45%" }} />
                </div>
              </div>

              {/* Row 3 */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#1C2C1D] mb-1.5">
                  <span>Product Sold (482)</span>
                  <span className="text-[#5F7A5E]">92%</span>
                </div>
                <div className="w-full h-3 bg-[#EEF2EB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#3D5938] rounded-full" style={{ width: "92%" }} />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT 4 COLS (DONUT CHART & ARTISAN PROMO) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* TOTAL VIEW PERFORMANCE (Donut Chart) */}
          <div className="bg-white rounded-2xl p-6 border border-[#D5E0D0] shadow-2xs flex flex-col items-center text-center">
            <h3 className="font-heading text-base font-bold text-[#1C2C1D] self-start mb-6">
              Total View Performance
            </h3>

            {/* Donut Chart Mockup using SVG with colors */}
            <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {/* Segment 1: Sage/Olive 68% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#A8CF45"
                  strokeWidth="14"
                  strokeDasharray="162 238"
                  strokeDashoffset="0"
                />
                {/* Segment 2: Dark Forest 23% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#142A1A"
                  strokeWidth="14"
                  strokeDasharray="55 238"
                  strokeDashoffset="-162"
                />
                {/* Segment 3: Warm Orange 16% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#E88D39"
                  strokeWidth="14"
                  strokeDasharray="38 238"
                  strokeDashoffset="-217"
                />
              </svg>

              {/* Center Counter */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-[10px] uppercase font-bold text-[#738870]">
                  Total Count
                </span>
                <span className="font-heading text-2xl font-extrabold text-[#1C2C1D]">
                  565K
                </span>
              </div>
            </div>

            <p className="text-xs text-[#62775E] mb-4">
              Here are some handcrafted insights on how to improve your crochet store visibility.
            </p>

            <button className="w-full py-2.5 rounded-xl border border-[#D5E0D0] text-xs font-semibold text-[#1C2C1D] hover:bg-[#F3F6F0] transition shadow-2xs">
              Guide Views
            </button>

            {/* Legend Pills */}
            <div className="flex items-center justify-center gap-3 mt-4 text-[10px] font-semibold text-[#62775E]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#A8CF45]" /> View Count
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#142A1A]" /> Percentage
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#E88D39]" /> Sales
              </span>
            </div>
          </div>

          {/* LEVEL UP SALES / ARTISAN PROMO CARD */}
          <div className="relative rounded-2xl bg-gradient-to-br from-[#E3EBDC] via-[#DBE6D3] to-[#C9D9BE] p-6 border border-[#C5D5BC] shadow-2xs overflow-hidden">
            {/* Background geometric decorative flower */}
            <div className="absolute -right-8 -bottom-8 w-40 h-40 opacity-20 pointer-events-none">
              <FaYarn className="w-full h-full text-[#3D5938]" />
            </div>

            <div className="relative z-10">
              <div className="w-8 h-8 rounded-lg bg-[#3D5938] text-white flex items-center justify-center mb-3 shadow-xs">
                <FaYarn size={16} />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1C2C1D] leading-snug">
                Level up your artisan sales to the next level.
              </h3>
              <p className="text-xs text-[#52694E] mt-1.5 leading-relaxed">
                Unlock automated inventory alerts, multi-channel yarn orders, and customer insights.
              </p>

              <button className="mt-5 w-full py-3 rounded-xl bg-[#203322] hover:bg-[#112316] text-white text-xs font-semibold shadow-button transition">
                Upgrade to Artisan Pro+
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
