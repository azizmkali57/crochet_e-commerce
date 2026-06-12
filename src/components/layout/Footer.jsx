"use client";

import { FaGooglePay, FaCcVisa } from "react-icons/fa";
import { SiPaytm } from "react-icons/si";
import { FiInstagram, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaWhatsapp, FaPinterestP } from "react-icons/fa";
import Link from "next/link";
export default function Footer() {
  const quickLinks = [
    { name: "Collections", href: "/collection" },
    { name: "Custom Orders", href: "/contact" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const helpLinks = [
    { name: "Shipping & Delivery", href: "/legal/shipping-delivery" },
    { name: "Returns & Refunds", href: "/legal/return-refund" },
    { name: "Track Order", href: "/legal/track-order" },
    { name: "FAQs", href: "/legal/FAQ" },
  ];

  return (
    <footer className="relative pt-12 pb-6 px-6 md:px-12 mt-20">
      {/* MAIN GRID */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-10 py-10">
        {/* Column 1: Logo + tagline + socials — full width on mobile */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src="/images/main_logo.png"
                alt="Crochet Alif"
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className="font-script text-xl leading-none"
              style={{ color: "#3D5938" }}
            >
              Crochet Alif
            </span>
          </div>
          <p className="text-xs text-warm leading-relaxed mb-4 max-w-xs">
            Thank you for trusting and supporting our handmade dreams.
          </p>
          <div className="flex items-center gap-3">
            {[FiInstagram, FaWhatsapp, FaPinterestP, FiMail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-full border border-sage/50 flex items-center justify-center hover:bg-white transition"
                style={{ color: "#3D5938" }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-3">
          {quickLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-sm hover:translate-x-1 transition-transform"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Column 3: Help */}
        <div className="space-y-3">
          {helpLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-sm hover:translate-x-1 transition-transform"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Column 4: Let's Connect */}
        <div className="col-span-1">
          <h4
            className="font-semibold text-sm mb-4"
            style={{ color: "#3D5938" }}
          >
            Let's Connect
          </h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-xs text-warm">
              <FiInstagram size={13} style={{ color: "#3D5938" }} />
              <Link
                href="https://www.instagram.com/crochet_alif"
                target="_blank"
                rel="noopener noreferrer"
              >
                @crochet_alif
              </Link>
            </li>
            <li className="flex items-center gap-2 text-xs text-warm">
              <FiPhone size={13} style={{ color: "#3D5938" }} />
              <Link
                href="tel:7089106227"
                target="_blank"
                rel="noopener noreferrer"
              >
                70891 06227
              </Link>
            </li>
            <li className="flex items-center gap-2 text-xs text-warm">
              <FiMapPin size={13} style={{ color: "#3D5938" }} />
              Rajgarh M.P India
            </li>
          </ul>
        </div>

        {/* Column 5: We Accept */}
        <div className="col-span-1">
          <h4
            className="font-semibold text-sm mb-4"
            style={{ color: "#3D5938" }}
          >
            We Accept
          </h4>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Google Pay */}
            <div className="bg-white rounded-lg p-2 shadow-soft">
              <FaGooglePay size={36} />
            </div>

            {/* Paytm */}
            <div className="bg-white rounded-lg p-2 shadow-soft">
              <SiPaytm size={30} color="#00BAF2" />
            </div>

            {/* Visa */}
            <div className="bg-white rounded-lg p-2 shadow-soft">
              <FaCcVisa size={36} color="#1A1F71" />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM — Copyright */}
      <div className="pt-6 border-t border-gray-300/40 text-center">
        <p className="text-xs text-muted">
          © 2026 Crochet Alif. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
