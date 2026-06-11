"use client";

import Link from "next/link";
import { useState } from "react";
import { FiCalendar, FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collection" },
 /*name: "Custom Orders", href: "/custom-orders" */
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  const pathname = usePathname();

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-16 py-6 flex items-center justify-between">
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
              isActive
                ? "font-semibold border-b-2 pb-1"
                : ""
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
          <button
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
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
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
    </header>
  );
}
