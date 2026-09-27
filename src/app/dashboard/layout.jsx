"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid,
  FiBarChart2,
  FiUsers,
  FiBox,
  FiMessageSquare,
  FiShoppingBag,
  FiSettings,
  FiShield,
  FiSearch,
  FiBell,
  FiPlus,
  FiChevronDown,
  FiMenu,
  FiX,
  FiArrowUpRight,
  FiArrowDownRight,
  FiMoreHorizontal,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiHome,
  FiLogOut,
  FiLayers
} from "react-icons/fi";
import { FaYarn } from "react-icons/fa6";
import { useSession, signOut } from "next-auth/react";

export default function DashboardLayout({ children }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { label: "Overview", href: "/dashboard", icon: FiGrid },
    { label: "Categories", href: "/dashboard/categories", icon: FiLayers },
    { label: "Product", href: "/dashboard/products", icon: FiBox, count: 24 },
    { label: "Orders", href: "/dashboard/orders", icon: FiShoppingBag, badge: "12" },
    { label: "Customers", href: "/dashboard/customers", icon: FiUsers },
    { label: "Statistics", href: "/dashboard/analytics", icon: FiBarChart2 },
  ];

  const generalItems = [
    { label: "Settings", href: "/dashboard/settings", icon: FiSettings },
    { label: "Security", href: "/dashboard/settings", icon: FiShield },
  ];

  return (
    <div className="min-h-screen bg-[#EEF2EB] text-[#2D382B] flex font-sans antialiased selection:bg-[#3D5938] selection:text-white">
      
      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* LEFT SIDEBAR (Dark Forest Green like reference) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#112316] text-[#A3B89E] flex flex-col justify-between p-5 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* LOGO & BRAND */}
          <div className="flex items-center justify-between pb-6 mb-4 border-b border-[#213828]">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-[#213828] border border-[#30523A] flex items-center justify-center text-white overflow-hidden shadow-sm">
                <img
                  src="/images/main_logo.png"
                  alt="Crochet Alif"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-script text-2xl text-white block leading-none">
                  Crochet Alif
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#6E8F6A]">
                  Admin Hub
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* MENU SECTION */}
          <div className="mb-6">
            <p className="text-[11px] font-bold tracking-widest uppercase text-[#547353] px-3 mb-2">
              Menu
            </p>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? "bg-[#3D5938] text-white shadow-sm"
                        : "text-[#A3B89E] hover:bg-[#1B3321] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={17}
                        className={isActive ? "text-[#C2DDB9]" : "text-[#73946E] group-hover:text-white"}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#A8CF45] text-[#112316]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* GENERAL SECTION */}
          <div>
            <p className="text-[11px] font-bold tracking-widest uppercase text-[#547353] px-3 mb-2">
              General
            </p>
            <nav className="space-y-1">
              {generalItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? "bg-[#3D5938] text-white"
                        : "text-[#A3B89E] hover:bg-[#1B3321] hover:text-white"
                    }`}
                  >
                    <Icon
                      size={17}
                      className={isActive ? "text-[#C2DDB9]" : "text-[#73946E] group-hover:text-white"}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* BOTTOM USER PROFILE CARD */}
        <div className="pt-4 border-t border-[#213828] flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            {session?.user?.avatar ? (
              <img
                src={session.user.avatar}
                alt="Admin"
                className="w-9 h-9 rounded-full object-cover shadow-xs border border-[#3D5938]"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#A8CF45] text-[#112316] font-bold flex items-center justify-center text-xs shadow-xs shrink-0">
                {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "A"}
              </div>
            )}
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">
                {session?.user?.name || "Admin"}
              </p>
              <p className="text-[11px] text-[#6E8F6A] truncate">
                {session?.user?.email || "admin@crochetalif.com"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Link
              href="/"
              title="View live website"
              className="p-2 rounded-lg hover:bg-[#1B3321] text-[#73946E] hover:text-white transition"
            >
              <FiHome size={16} />
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              title="Sign Out"
              className="p-2 rounded-lg hover:bg-red-950/40 text-red-400 hover:text-red-300 transition cursor-pointer"
            >
              <FiLogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        
        {/* TOP NAVBAR */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#D8E2D3] px-5 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-[#F0F4EC] text-[#3D5938]"
            >
              <FiMenu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg sm:text-xl font-bold text-[#203322]">
                Artisan Admin
              </span>
              <FiChevronDown className="text-gray-400 text-sm hidden sm:block" />
            </div>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search bar */}
            <div className="relative hidden md:block w-64 lg:w-72">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search orders, yarns, customers..."
                className="w-full pl-9 pr-4 py-2 bg-[#F3F6F0] border border-[#DCE4D8] rounded-xl text-xs text-[#203322] placeholder-gray-400 focus:outline-none focus:border-[#3D5938] focus:bg-white transition"
              />
            </div>

            {/* Notification */}
            <button className="relative w-9 h-9 rounded-xl border border-[#DCE4D8] bg-white flex items-center justify-center text-[#3D5938] hover:bg-[#F3F6F0] transition shadow-2xs">
              <FiBell size={16} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#A8CF45]" />
            </button>

            {/* Add New Product CTA */}
            <Link
              href="/dashboard/products"
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#203322] hover:bg-[#112316] text-white text-xs font-semibold shadow-xs transition"
            >
              <FiPlus size={15} />
              <span className="hidden sm:inline">Add new product</span>
            </Link>
          </div>
        </header>

        {/* MAIN PAGE INJECTION */}
        <main className="flex-1 p-5 sm:p-8 max-w-[1500px] mx-auto w-full">
          {children}
        </main>
      </div>

    </div>
  );
}
