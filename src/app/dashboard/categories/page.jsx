"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
  FiFolder,
  FiLayers,
  FiX,
  FiSave,
  FiRefreshCw
} from "react-icons/fi";
import { BsBag, BsHouseDoor, BsScissors, BsImage, BsHeart } from "react-icons/bs";

export default function DashboardCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "/images/Bags_&_Pouches.png",
    icon: "BsBag",
    displayOrder: 1,
    isActive: true,
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/categories");
      const json = await res.json();
      if (json.success && json.data) {
        setCategories(json.data);
      } else {
        // Fallback to public categories if admin route returns non-success
        const pubRes = await fetch("/api/categories");
        const pubJson = await pubRes.json();
        if (pubJson.success && pubJson.data) {
          setCategories(pubJson.data);
        }
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      image: "/images/Bags_&_Pouches.png",
      icon: "BsBag",
      displayOrder: categories.length + 1,
      isActive: true,
    });
    setErrorMsg("");
    setModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name || "",
      slug: cat.slug || "",
      description: cat.description || "",
      image: cat.image || "/images/Bags_&_Pouches.png",
      icon: cat.icon || "BsBag",
      displayOrder: cat.displayOrder ?? 0,
      isActive: cat.isActive !== undefined ? cat.isActive : true,
    });
    setErrorMsg("");
    setModalOpen(true);
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: editingCategory ? prev.slug : generatedSlug,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    try {
      const isEdit = !!editingCategory;
      const url = "/api/admin/categories";
      const method = isEdit ? "PUT" : "POST";
      const payload = isEdit
        ? { ...formData, id: editingCategory._id || editingCategory.id }
        : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save category.");
      }

      setModalOpen(false);
      fetchCategories();
    } catch (err) {
      setErrorMsg(err.message || "An error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this category?")) return;
    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        fetchCategories();
      } else {
        alert(data.error || "Failed to delete category.");
      }
    } catch (err) {
      alert("Error deleting category: " + err.message);
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* TOP HEADER ROW */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#1C2C1D]">
            Collections & Categories
          </h1>
          <p className="text-xs text-[#62775E] mt-0.5">
            Organize handmade crochet products, manage storefront categories & collection banners.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={fetchCategories}
            className="p-2.5 rounded-xl bg-white hover:bg-[#F3F6F0] border border-[#D5E0D0] text-[#3D5938] transition shadow-2xs"
            title="Refresh"
          >
            <FiRefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>
          
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#203322] hover:bg-[#112316] text-white text-xs font-semibold shadow-button transition"
          >
            <FiPlus size={16} /> Add Category
          </button>
        </div>
      </div>

      {/* SEARCH AND STATS BAR */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 bg-white rounded-2xl p-3.5 border border-[#D5E0D0] shadow-2xs flex items-center justify-between">
          <div className="relative w-full">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search categories by name or slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#F3F6F0] border border-[#DCE4D8] rounded-xl text-xs text-[#203322] placeholder-gray-400 focus:outline-none focus:border-[#3D5938]"
            />
          </div>
        </div>

        <div className="bg-[#203322] text-white rounded-2xl p-3.5 border border-[#30523A] shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-[#A3B89E]">Active Categories</p>
            <p className="text-xl font-heading font-bold mt-0.5">
              {categories.filter((c) => c.isActive !== false).length} <span className="text-xs font-sans text-[#A3B89E] font-normal">/ {categories.length} total</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#30523A] flex items-center justify-center text-[#C2DDB9]">
            <FiLayers size={18} />
          </div>
        </div>
      </div>

      {/* CATEGORIES GRID */}
      {loading ? (
        <div className="bg-white rounded-3xl p-12 border border-[#D5E0D0] text-center">
          <div className="w-8 h-8 border-3 border-[#3D5938] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-[#62775E]">Loading collections...</p>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-[#D5E0D0] text-center">
          <FiFolder className="w-12 h-12 text-[#A3B89E] mx-auto mb-3" />
          <h3 className="font-heading text-lg font-bold text-[#1C2C1D]">No Categories Found</h3>
          <p className="text-xs text-[#62775E] max-w-sm mx-auto mt-1 mb-4">
            {searchTerm ? "No categories match your search query." : "No categories configured yet. Create one to organize products."}
          </p>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#203322] text-white text-xs font-semibold hover:bg-[#112316] transition"
          >
            <FiPlus size={15} /> Add First Category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCategories.map((cat) => {
            const catId = cat._id || cat.id;
            return (
              <div
                key={catId}
                className="bg-white rounded-2xl border border-[#D5E0D0] overflow-hidden shadow-2xs hover:shadow-md transition duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Category Banner Image & Status */}
                  <div className="relative h-36 bg-[#D4DDC8] overflow-hidden">
                    <img
                      src={cat.image || "/images/Bags_&_Pouches.png"}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/400x200/D4DDC8/3D5938?text=" + encodeURIComponent(cat.name);
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide ${
                        cat.isActive !== false ? "bg-emerald-500 text-white" : "bg-gray-500 text-white"
                      }`}>
                        {cat.isActive !== false ? <FiCheckCircle size={10} /> : <FiXCircle size={10} />}
                        {cat.isActive !== false ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="font-heading text-lg font-bold drop-shadow-sm leading-snug">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-white/80 font-mono">
                        slug: /{cat.slug}
                      </p>
                    </div>
                  </div>

                  {/* Description & Order Details */}
                  <div className="p-4 space-y-3">
                    <p className="text-xs text-[#62775E] line-clamp-2 min-h-[32px]">
                      {cat.description || "No description added for this category."}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-[#EDF2EB] text-xs">
                      <span className="text-[#83977F]">Display Priority</span>
                      <span className="font-semibold text-[#1C2C1D] px-2 py-0.5 bg-[#F3F6F0] rounded-md border border-[#DCE4D8]">
                        #{cat.displayOrder ?? 0}
                      </span>
                    </div>

                    {cat.productCount !== undefined && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#83977F]">Assigned Products</span>
                        <span className="font-bold text-[#3D5938]">
                          {cat.productCount} items
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="px-4 py-3 bg-[#FAFBF9] border-t border-[#EDF2EB] flex items-center justify-between gap-2">
                  <Link
                    href={`/collection?category=${cat.slug}`}
                    target="_blank"
                    className="text-xs font-semibold text-[#3D5938] hover:underline"
                  >
                    View in Store →
                  </Link>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="p-1.5 rounded-lg text-[#62775E] hover:text-[#203322] hover:bg-white border border-transparent hover:border-[#D5E0D0] transition"
                      title="Edit Category"
                    >
                      <FiEdit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(catId)}
                      className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition"
                      title="Deactivate Category"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* CREATE / EDIT CATEGORY MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden border border-[#D5E0D0] shadow-xl animate-fade-in">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#F3F6F0] border-b border-[#DCE4D8] flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#1C2C1D]">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h3>
                <p className="text-[11px] text-[#62775E]">
                  Configure category name, slug, and storefront banner thumbnail.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-[#1C2C1D] p-1.5 rounded-xl hover:bg-white transition"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-[#1C2C1D] uppercase tracking-wider mb-1.5">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Bags & Pouches"
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full px-3.5 py-2.5 bg-[#F9FAF8] border border-[#DCE4D8] rounded-xl text-xs text-[#1C2C1D] focus:outline-none focus:border-[#3D5938]"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-xs font-bold text-[#1C2C1D] uppercase tracking-wider mb-1.5">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., bags"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F9FAF8] border border-[#DCE4D8] rounded-xl text-xs font-mono text-[#1C2C1D] focus:outline-none focus:border-[#3D5938]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#1C2C1D] uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Short description of this handcrafted category..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F9FAF8] border border-[#DCE4D8] rounded-xl text-xs text-[#1C2C1D] focus:outline-none focus:border-[#3D5938]"
                />
              </div>

              {/* Banner Image URL */}
              <div>
                <label className="block text-xs font-bold text-[#1C2C1D] uppercase tracking-wider mb-1.5">
                  Banner Image Path / URL
                </label>
                <input
                  type="text"
                  placeholder="/images/Bags_&_Pouches.png"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F9FAF8] border border-[#DCE4D8] rounded-xl text-xs text-[#1C2C1D] focus:outline-none focus:border-[#3D5938]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Display Order */}
                <div>
                  <label className="block text-xs font-bold text-[#1C2C1D] uppercase tracking-wider mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F9FAF8] border border-[#DCE4D8] rounded-xl text-xs text-[#1C2C1D] focus:outline-none focus:border-[#3D5938]"
                  />
                </div>

                {/* Active Toggle */}
                <div className="flex flex-col justify-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1C2C1D]">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 rounded text-[#3D5938] focus:ring-[#3D5938] accent-[#3D5938]"
                    />
                    <span>Active on Storefront</span>
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#EDF2EB] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#DCE4D8] text-xs font-semibold text-[#62775E] hover:bg-[#F3F6F0] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#203322] hover:bg-[#112316] text-white text-xs font-semibold shadow-button transition disabled:opacity-70"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <FiSave size={14} />
                      <span>{editingCategory ? "Update Category" : "Save Category"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
