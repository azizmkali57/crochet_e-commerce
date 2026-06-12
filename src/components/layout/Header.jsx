"use client";
import Link from "next/link";
import { useState } from "react";
import { FiCalendar, FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/context/CartContext";

export default function Header() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collection" },
    // {name: "Custom Orders", href: "/contact" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  const pathname = usePathname();

  return (
    <header className="absolute py-6 top-0 left-0 right-0 z-50">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/images/main_logo.png"
            alt="Crochet Alif"
            className="w-16 h-16 object-cover rounded-full"
          />

          <span
            className="font-script text-[34px]"
            style={{ color: "#3D5938" }}
          >
            Crochet Alif
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-12 text-[14px]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`cursor-pointer transition-all ${
                      isActive ? "font-semibold border-b-2 pb-1" : ""
                    }`}
                    style={{
                      color: "#3D5938",
                      borderColor: "#3D5938",
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Custom Order button - desktop/tablet only */}
          <Link
            href="/contact"
            className="
    hidden md:flex
    items-center
    gap-2
    px-5
    py-3
    rounded-full
    bg-white/80
    backdrop-blur-sm
  "
            style={{
              color: "#3D5938",
              border: "1px solid rgba(61,89,56,0.15)",
            }}
          >
            Custom Order
            <FiCalendar size={14} />
          </Link>

          {/* Cart icon - always visible */}
          <Link
  href="/cart"
  className="
    w-12
    h-12
    rounded-full
    flex
    items-center
    justify-center
    relative
  "
  style={{
    color: "#3D5938",
    border: "1px solid rgba(61,89,56,0.15)",
    backgroundColor: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(4px)",
  }}
>
  <FiShoppingCart size={18} />

  {/* LIVE CART BADGE */}
  {cartCount > 0 && (
    <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] rounded-full flex items-center justify-center text-[10px] font-semibold">
      {cartCount}
    </span>
  )}
</Link>

          {/* Hamburger - mobile/tablet only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              lg:hidden
              w-12
              h-12
              rounded-full
              text-white
              flex
              items-center
              justify-center
            "
            style={{ backgroundColor: "#3D5938" }}
          >
            {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Menu Dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-lg mx-4 mt-2 rounded-2xl overflow-hidden border border-gray-100">
          <ul className="flex flex-col">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li
                  key={link.name}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-6 py-4 text-[15px] transition-colors ${
                      isActive ? "font-semibold bg-[#f0f5ee]" : ""
                    }`}
                    style={{ color: "#3D5938" }}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
            <li className="px-6 py-4">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full font-medium"
                style={{
                  color: "#fff",
                  backgroundColor: "#3D5938",
                }}
              >
                Custom Order
                <FiCalendar size={14} />
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
