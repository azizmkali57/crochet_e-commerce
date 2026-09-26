"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiCheckCircle,
  FiMoreVertical
} from "react-icons/fi";
import { getAllProducts } from "../../../../lib/productData";

export default function DashboardProductsPage() {
  const products = getAllProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = products.filter((p) => {
    const matchName = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchName;
  });

  return (
    <div className="space-y-6">
      
      {/* HEADER ROW */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#1C2C1D]">
            Products Inventory
          </h1>
          <p className="text-xs text-[#62775E] mt-0.5">
            Manage your handmade crochet items, catalog stock & pricing.
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#203322] hover:bg-[#112316] text-white text-xs font-semibold shadow-button self-start sm:self-auto transition">
          <FiPlus size={16} /> Add New Crochet Piece
        </button>
      </div>

      {/* FILTER & SEARCH ROW */}
      <div className="bg-white rounded-2xl p-4 border border-[#D5E0D0] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search crochet products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F3F6F0] border border-[#DCE4D8] rounded-xl text-xs text-[#203322] placeholder-gray-400 focus:outline-none focus:border-[#3D5938]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {["All", "Bags", "Sweaters", "Plushies", "Home Decor"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-[#3D5938] text-white"
                  : "bg-[#F3F6F0] text-[#5F7A5E] hover:bg-[#E6EDE1]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS TABLE CARD */}
      <div className="bg-white rounded-2xl border border-[#D5E0D0] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAF6] text-[#5F7A5E] uppercase tracking-wider text-[11px] font-bold border-b border-[#EAEFE8]">
              <tr>
                <th className="py-3.5 px-5">Product</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4">Badge</th>
                <th className="py-3.5 px-4">Stock Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFE8] text-[#1C2C1D]">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#F9FBF8] transition">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#F0F4EC] border border-[#D8E2D3] overflow-hidden flex-shrink-0">
                        <img
                          src={p.images?.[0] || "/images/Granny_Sweater.png"}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-[#1C2C1D]">{p.name}</p>
                        <p className="text-[11px] text-[#738870]">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#1C2C1D]">
                    ₹{p.price.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-[#5F7A5E] font-medium">
                    ⭐ {p.rating} ({p.reviews})
                  </td>
                  <td className="py-3.5 px-4">
                    {p.badge ? (
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F4EA] text-[#137333]">
                        {p.badge}
                      </span>
                    ) : (
                      <span className="text-[11px] text-gray-400">Regular</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F4EA] text-[#137333]">
                      <FiCheckCircle size={11} /> In Stock
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/collection/${p.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#3D5938] hover:bg-[#F0F4EC] transition"
                        title="View Live"
                      >
                        <FiEye size={15} />
                      </Link>
                      <button
                        className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-[#F0F4EC] transition"
                        title="Edit"
                      >
                        <FiEdit2 size={15} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="Delete"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
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
