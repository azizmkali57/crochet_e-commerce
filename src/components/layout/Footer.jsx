"use client";

import { FiInstagram, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaWhatsapp, FaPinterestP } from "react-icons/fa";

export default function Footer() {
  const quickLinks = ["Collections", "Custom Orders", "About Us", "Contact"];
  const helpLinks = ["Shipping & Delivery", "Returns & Refunds", "Track Order", "FAQs"];

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
        <div className="col-span-1">
          <h4
            className="font-semibold text-sm mb-4"
            style={{ color: "#3D5938" }}
          >
            Quick Links
          </h4>
          <ul className="space-y-2.5">
            {quickLinks.map((link, i) => (
              <li
                key={i}
                className="text-xs text-warm hover:text-primary cursor-pointer transition"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Help */}
        <div className="col-span-1">
          <h4
            className="font-semibold text-sm mb-4"
            style={{ color: "#3D5938" }}
          >
            Help
          </h4>
          <ul className="space-y-2.5">
            {helpLinks.map((link, i) => (
              <li
                key={i}
                className="text-xs text-warm hover:text-primary cursor-pointer transition"
              >
                {link}
              </li>
            ))}
          </ul>
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
              @crochet_alif
            </li>
            <li className="flex items-center gap-2 text-xs text-warm">
              <FiPhone size={13} style={{ color: "#3D5938" }} />
              70891 06227
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
          <div className="flex items-center gap-2 flex-wrap">
            <div className="px-3 py-1.5 bg-white rounded shadow-soft text-[11px] font-bold text-blue-700">
              VISA
            </div>
            <div className="px-3 py-1.5 bg-white rounded shadow-soft text-[11px] font-bold text-red-600">
              MC
            </div>
            <div className="px-3 py-1.5 bg-white rounded shadow-soft text-[11px] font-bold" style={{ color: "#3D5938" }}>
              UPI
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