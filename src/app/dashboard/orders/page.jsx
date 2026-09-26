"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiFilter,
  FiEye,
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiPhone,
  FiDownload
} from "react-icons/fi";
import { FaYarn } from "react-icons/fa6";

export default function DashboardOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const orders = [
    {
      id: "CAL-89214",
      customer: "Ayesha Khan",
      email: "ayesha@crochetalif.com",
      phone: "+91 98765 43210",
      date: "Sep 24, 2026",
      items: "Pearl Crochet Pouch (x1), Wallet (x1)",
      total: 2499,
      status: "In Stitching",
      statusColor: "bg-[#FEF7E0] text-[#B06000] border-amber-200",
      payment: "UPI Paid",
    },
    {
      id: "CAL-89213",
      customer: "Rohit Sharma",
      email: "rohit.s@example.com",
      phone: "+91 91234 56789",
      date: "Sep 24, 2026",
      items: "Granny Square Sweater (x1)",
      total: 3499,
      status: "Ready for Dispatch",
      statusColor: "bg-[#E8F0FE] text-[#1A73E8] border-blue-200",
      payment: "Cash on Delivery",
    },
    {
      id: "CAL-89212",
      customer: "Pooja Hegde",
      email: "pooja.h@craftmail.com",
      phone: "+91 99887 76655",
      date: "Sep 23, 2026",
      items: "Strawberry Backpack (x1)",
      total: 2899,
      status: "Delivered",
      statusColor: "bg-[#E6F4EA] text-[#137333] border-emerald-200",
      payment: "UPI Paid",
    },
    {
      id: "CAL-89211",
      customer: "Sana Mir",
      email: "sana.mir@example.com",
      phone: "+91 98711 22334",
      date: "Sep 22, 2026",
      items: "Crochet Sheep Shamsheer (x1)",
      total: 1499,
      status: "Delivered",
      statusColor: "bg-[#E6F4EA] text-[#137333] border-emerald-200",
      payment: "UPI Paid",
    },
    {
      id: "CAL-89210",
      customer: "Aditi Rao",
      email: "aditi.rao@gmail.com",
      phone: "+91 90011 44556",
      date: "Sep 21, 2026",
      items: "Boho Wall Hanging (x1)",
      total: 1999,
      status: "In Stitching",
      statusColor: "bg-[#FEF7E0] text-[#B06000] border-amber-200",
      payment: "WhatsApp Order",
    },
  ];

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#1C2C1D]">
            Order Management
          </h1>
          <p className="text-xs text-[#62775E] mt-0.5">
            Track customer orders, yarn crafting phases & parcel dispatches.
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#D5E0D0] text-[#1C2C1D] text-xs font-semibold rounded-xl shadow-2xs hover:bg-[#F3F6F0] transition self-start sm:self-auto">
          <FiDownload size={14} /> Export CSV
        </button>
      </div>

      {/* FILTER CONTROLS */}
      <div className="bg-white rounded-2xl p-4 border border-[#D5E0D0] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by Order ID or Customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F3F6F0] border border-[#DCE4D8] rounded-xl text-xs text-[#203322] placeholder-gray-400 focus:outline-none focus:border-[#3D5938]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {["All", "In Stitching", "Ready for Dispatch", "Delivered"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                statusFilter === st
                  ? "bg-[#3D5938] text-white"
                  : "bg-[#F3F6F0] text-[#5F7A5E] hover:bg-[#E6EDE1]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* ORDERS TABLE */}
      <div className="bg-white rounded-2xl border border-[#D5E0D0] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAF6] text-[#5F7A5E] uppercase tracking-wider text-[11px] font-bold border-b border-[#EAEFE8]">
              <tr>
                <th className="py-3.5 px-5">Order ID & Date</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Handcrafted Items</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Crafting Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFE8] text-[#1C2C1D]">
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-[#F9FBF8] transition">
                  <td className="py-3.5 px-5">
                    <p className="font-mono font-bold text-[#1C2C1D]">#{o.id}</p>
                    <p className="text-[11px] text-[#738870]">{o.date}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-[#1C2C1D]">{o.customer}</p>
                    <p className="text-[11px] text-[#738870]">{o.phone}</p>
                  </td>
                  <td className="py-3.5 px-4 text-[#5F7A5E] font-medium max-w-xs truncate">
                    {o.items}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[11px] font-semibold text-[#1C2C1D] bg-[#F0F4EC] px-2 py-0.5 rounded-md">
                      {o.payment}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#1C2C1D]">
                    ₹{o.total.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${o.statusColor}`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button className="px-3 py-1.5 rounded-lg bg-[#3D5938] text-white text-[11px] font-semibold hover:bg-[#203322] transition">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
