"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  FiCalendar,
  FiMenu,
  FiX,
  FiShoppingCart,
  FiUser,
  FiHeart,
  FiLogOut,
  FiShield,
  FiAward,
} from "react-icons/fi";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/components/context/CartContext";
import { useWishlist } from "@/components/context/WishlistContext";

export default function Header() {
  const { data: session, status } = useSession();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collection" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="absolute py-5 top-0 left-0 right-0 z-50">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/images/main_logo.png"
            alt="Crochet Alif"
            className="w-13 h-13 sm:w-14 sm:h-14 object-cover rounded-full shadow-xs transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span
              className="font-script text-[26px] sm:text-[30px] leading-tight"
              style={{ color: "#2d4a22" }}
            >
              Crochet Alif
            </span>
            <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#6E8F6A] -mt-1">
              Handcrafted with Love
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-10 text-[14px]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`cursor-pointer transition-all ${isActive ? "font-semibold border-b-2 pb-1" : "hover:opacity-80"
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

            {/* Admin link in nav if admin */}
            {session?.user?.role === "admin" && (
              <li>
                <Link
                  href="/admin"
                  className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full font-semibold text-xs flex items-center gap-1.5 hover:bg-amber-200 transition"
                >
                  <FiShield size={13} />
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Custom Order button */}
          <Link
            href="/contact"
            className="hidden md:flex items-center gap-2 px-5 py-3 rounded-full bg-white/80 backdrop-blur-sm transition hover:bg-white text-xs sm:text-sm font-medium"
            style={{
              color: "#3D5938",
              border: "1px solid rgba(61,89,56,0.15)",
            }}
          >
            Custom Order
            <FiCalendar size={14} />
          </Link>

          {/* Wishlist button */}
          <Link
            href="/wishlist"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center relative transition hover:bg-white bg-white/80 backdrop-blur-sm"
            style={{
              color: "#3D5938",
              border: "1px solid rgba(61,89,56,0.15)",
            }}
            title="My Wishlist"
          >
            <FiHeart size={18} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#3D5938] text-white font-bold text-[10px] rounded-full flex items-center justify-center border border-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* User / Auth dropdown button */}
          <div className="relative" ref={dropdownRef}>
            {status === "authenticated" && session?.user ? (
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center relative transition hover:bg-white bg-white/80 backdrop-blur-sm overflow-hidden p-0.5"
                style={{
                  border: "2px solid #3D5938",
                }}
                title={session.user.name || "Account"}
              >
                {session.user.avatar ? (
                  <img
                    src={session.user.avatar}
                    alt={session.user.name || "User"}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-sage-light flex items-center justify-center text-primary font-bold text-xs">
                    {session.user.name ? session.user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
              </button>
            ) : (
              <Link
                href="/login"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition hover:bg-white bg-white/80 backdrop-blur-sm"
                style={{
                  color: "#3D5938",
                  border: "1px solid rgba(61,89,56,0.15)",
                }}
                title="Sign In / Register"
              >
                <FiUser size={18} />
              </Link>
            )}

            {/* Authenticated User Dropdown Menu */}
            {userDropdownOpen && session?.user && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-sage-light/80 p-3 z-50 animate-fade-in">
                <div className="px-3 py-2 border-b border-sage-light/50 mb-2">
                  <p className="text-xs font-semibold text-primary truncate">
                    {session.user.name}
                  </p>
                  <p className="text-[11px] text-warm truncate">{session.user.email}</p>

                  {/* Loyalty Points Badge */}
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cream-light border border-sage text-[11px] font-medium text-primary">
                    <FiAward className="text-amber-500" />
                    <span>{session.user.stitchPoints ?? 100} Stitch Points</span>
                  </div>
                </div>

                <div className="space-y-1">
                  {session.user.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-xl transition"
                    >
                      <FiShield size={14} className="text-amber-600" />
                      Admin Panel
                    </Link>
                  )}

                  <Link
                    href="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-primary hover:bg-cream-light rounded-xl transition"
                  >
                    <FiUser size={14} />
                    Profile
                  </Link>

                  <Link
                    href="/wishlist"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-primary hover:bg-cream-light rounded-xl transition"
                  >
                    <FiHeart size={14} />
                    My Wishlist ({wishlistCount})
                  </Link>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl transition mt-1"
                  >
                    <FiLogOut size={14} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart button */}
          <Link
            href="/cart"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center relative transition hover:bg-white bg-white/80 backdrop-blur-sm"
            style={{
              color: "#3D5938",
              border: "1px solid rgba(61,89,56,0.15)",
            }}
            title="Cart"
          >
            <FiShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] rounded-full flex items-center justify-center font-semibold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Hamburger - mobile/tablet only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-11 h-11 sm:w-12 sm:h-12 rounded-full text-white flex items-center justify-center"
            style={{ backgroundColor: "#3D5938" }}
            aria-label="Toggle Navigation"
          >
            {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Menu Dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-xl mx-4 mt-2 rounded-2xl overflow-hidden border border-sage-light">
          <ul className="flex flex-col">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.name} className="border-b border-gray-100">
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-6 py-4 text-[15px] transition-colors ${isActive ? "font-semibold bg-[#f0f5ee]" : ""
                      }`}
                    style={{ color: "#3D5938" }}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}

            {session?.user?.role === "admin" && (
              <li className="border-b border-gray-100">
                <Link
                  href="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-6 py-4 text-[15px] font-semibold text-amber-900 bg-amber-50"
                >
                  <FiShield size={16} />
                  Admin Panel
                </Link>
              </li>
            )}

            <li className="border-b border-gray-100">
              <Link
                href="/wishlist"
                onClick={() => setMenuOpen(false)}
                className={`block px-6 py-4 text-[15px] transition-colors ${pathname === "/wishlist" ? "font-semibold bg-[#f0f5ee]" : ""
                  }`}
                style={{ color: "#3D5938" }}
              >
                My Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
              </Link>
            </li>

            {status === "authenticated" ? (
              <>
                <li className="border-b border-gray-100">
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="block px-6 py-4 text-[15px] font-medium text-primary"
                  >
                    My Profile & Orders ({session.user.stitchPoints ?? 100} pts)
                  </Link>
                </li>
                <li className="border-b border-gray-100">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="w-full text-left px-6 py-4 text-[15px] font-medium text-red-600"
                  >
                    Sign Out ({session.user.name})
                  </button>
                </li>
              </>
            ) : (
              <li className="border-b border-gray-100">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-4 text-[15px] font-semibold text-primary"
                >
                  Sign In / Register
                </Link>
              </li>
            )}

            <li className="px-6 py-4">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full font-medium text-white shadow-button"
                style={{ backgroundColor: "#3D5938" }}
              >
                Custom Order
                <FiCalendar size={14} />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
