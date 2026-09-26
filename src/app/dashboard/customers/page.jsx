"use client";

import React, { useState } from "react";
import {
  FiUsers,
  FiSearch,
  FiMail,
  FiPhone,
  FiMapPin,
  FiShoppingBag,
  FiAward
} from "react-icons/fi";
import { FaYarn } from "react-icons/fa6";

export default function DashboardCustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const customers = [
    {
      id: "CUST-01",
      name: "Ayesha Khan",
      email: "ayesha@crochetalif.com",
      phone: "+91 98765 43210",
      orders: 6,
      spent: "₹14,500",
      tier: "Artisan Patron",
      location: "Mumbai, MH",
    },
    {
      id: "CUST-02",
      name: "Rohit Sharma",
      email: "rohit.s@example.com",
      phone: "+91 91234 56789",
      orders: 2,
      spent: "₹4,999",
      tier: "Regular Collector",
      location: "Delhi, DL",
    },
    {
      id: "CUST-03",
      name: "Pooja Hegde",
      email: "pooja.h@craftmail.com",
      phone: "+91 99887 76655",
      orders: 4,
      spent: "₹9,200",
      tier: "Artisan Patron",
      location: "Bengaluru, KA",
    },
    {
      id: "CUST-04",
      name: "Sana Mir",
      email: "sana.mir@example.com",
      phone: "+91 98711 22334",
      orders: 1,
      spent: "₹1,499",
      tier: "New Patron",
      location: "Hyderabad, TS",
    },
    {
      id: "CUST-05",
      name: "Aditi Rao",
      email: "aditi.rao@gmail.com",
      phone: "+91 90011 44556",
      orders: 3,
      spent: "₹6,800",
      tier: "Regular Collector",
      location: "Pune, MH",
    },
  ];

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#1C2C1D]">
            Patrons & Customers
          </h1>
          <p className="text-xs text-[#62775E] mt-0.5">
            View loyal crochet patrons, stitch reward points & order frequencies.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search patrons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#DCE4D8] rounded-xl text-xs text-[#203322] placeholder-gray-400 focus:outline-none focus:border-[#3D5938]"
          />
        </div>
      </div>

      {/* CUSTOMER CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl p-5 border border-[#D5E0D0] shadow-2xs hover:shadow-soft transition space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#EEF2EB] border border-[#D5E0D0] flex items-center justify-center font-bold text-[#1C2C1D] text-sm">
                  {c.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-[#1C2C1D]">
                    {c.name}
                  </h3>
                  <p className="text-[11px] text-[#738870]">{c.location}</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333]">
                <FiAward size={11} /> {c.tier}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#F8FAF6] border border-[#EAEFE8] grid grid-cols-2 gap-2 text-center">
              <div>
                <p className="text-[10px] font-bold uppercase text-[#738870]">
                  Orders
                </p>
                <p className="font-heading text-base font-bold text-[#1C2C1D]">
                  {c.orders}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-[#738870]">
                  Total Spent
                </p>
                <p className="font-heading text-base font-bold text-[#1C2C1D]">
                  {c.spent}
                </p>
              </div>
            </div>

            <div className="text-xs text-[#5F7A5E] space-y-1.5 pt-1">
              <p className="flex items-center gap-2">
                <FiMail size={13} className="text-[#3D5938]" /> {c.email}
              </p>
              <p className="flex items-center gap-2">
                <FiPhone size={13} className="text-[#3D5938]" /> {c.phone}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
