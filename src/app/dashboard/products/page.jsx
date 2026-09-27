"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiUploadCloud,
  FiX,
  FiSave,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertTriangle,
  FiImage
} from "react-icons/fi";

export default function DashboardProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    originalPrice: "",
    category: "Bags & Pouches",
    categorySlug: "bags",
    description: "",
    images: [],
    details: [
      "100% premium combed cotton yarn",
      "Hand-crocheted by master artisans",
      "Takes 3-5 crafting days to weave",
    ],
    yarnMaterial: "100% Premium Cotton",
    craftingDays: 4,
    colors: ["#3D5938", "#B5C5A8", "#E8EDE0"],
    badge: "",
    badgeColor: "bg-amber-500",
    stockCount: 10,
    inStock: true,
    isFeatured: false,
    isActive: true,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/categories"),
      ]);

      const prodData = await prodRes.json();
      const catData = await catRes.json();

      if (prodData.success && prodData.data) {
        setProducts(prodData.data);
      }
      if (catData.success && catData.data) {
        setCategories(catData.data);
      }
    } catch (err) {
      console.error("Failed to load dashboard product data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      slug: "",
      price: "",
      originalPrice: "",
      category: categories[0]?.name || "Bags & Pouches",
      categorySlug: categories[0]?.slug || "bags",
      description: "",
      images: [],
      details: [
        "100% premium combed cotton yarn",
        "Hand-crocheted by master artisans",
        "Takes 3-5 crafting days to weave",
      ],
      yarnMaterial: "100% Premium Cotton",
      craftingDays: 4,
      colors: ["#3D5938", "#B5C5A8", "#E8EDE0"],
      badge: "",
      badgeColor: "bg-amber-500",
      stockCount: 10,
      inStock: true,
      isFeatured: false,
      isActive: true,
    });
    setErrorMsg("");
    setModalOpen(true);
  };

  const openEditModal = (prod) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name || "",
      slug: prod.slug || "",
      price: prod.price ?? "",
      originalPrice: prod.originalPrice ?? "",
      category: prod.category || "Bags & Pouches",
      categorySlug: prod.categorySlug || "bags",
      description: prod.description || "",
      images: prod.images || [],
      details: prod.details?.length ? prod.details : ["100% premium combed cotton yarn"],
      yarnMaterial: prod.yarnMaterial || "100% Premium Cotton",
      craftingDays: prod.craftingDays ?? 4,
      colors: prod.colors?.length ? prod.colors : ["#3D5938"],
      badge: prod.badge || "",
      badgeColor: prod.badgeColor || "bg-amber-500",
      stockCount: prod.stockCount ?? 10,
      inStock: prod.inStock !== false,
      isFeatured: !!prod.isFeatured,
      isActive: prod.isActive !== false,
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
      slug: editingProduct ? prev.slug : generatedSlug,
    }));
  };

  // ImageKit Upload Handler
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploadingImage(true);
    setErrorMsg("");

    try {
      for (const file of files) {
        const body = new FormData();
        body.append("file", file);
        body.append("fileName", `${formData.slug || "crochet"}-${Date.now()}`);
        body.append("folder", "/crochet-alif/products");

        const res = await fetch("/api/admin/uploads/imagekit-upload", {
          method: "POST",
          body,
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to upload image to ImageKit.");
        }

        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, data.url],
        }));
      }
    } catch (err) {
      setErrorMsg("ImageKit Upload Error: " + err.message);
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    try {
      const isEdit = !!editingProduct;
      const url = "/api/admin/products";
      const method = isEdit ? "PUT" : "POST";
      const payload = isEdit
        ? { ...formData, id: editingProduct._id || editingProduct.id }
        : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save product.");
      }

      setModalOpen(false);
      fetchData();
    } catch (err) {
      setErrorMsg(err.message || "Failed to save product.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this product?")) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        fetchData();
      } else {
        alert(data.error || "Failed to delete product.");
      }
    } catch (err) {
      alert("Error deleting product: " + err.message);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchName = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === "All" || p.category === selectedCategory || p.categorySlug === selectedCategory;
    return matchName && matchCat;
  });

  return (
    <div className="space-y-6">

      {/* TOP HEADER ROW */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#1C2C1D]">
            Products Inventory
          </h1>
          <p className="text-xs text-[#62775E] mt-0.5">
            Manage your handmade crochet items, ImageKit media gallery, stock & pricing.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={fetchData}
            className="p-2.5 rounded-xl bg-white hover:bg-[#F3F6F0] border border-[#D5E0D0] text-[#3D5938] transition shadow-2xs"
            title="Refresh"
          >
            <FiRefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#203322] hover:bg-[#112316] text-white text-xs font-semibold shadow-button transition"
          >
            <FiPlus size={16} /> Add New Crochet Piece
          </button>
        </div>
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

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${selectedCategory === "All"
                ? "bg-[#3D5938] text-white"
                : "bg-[#F3F6F0] text-[#62775E] hover:bg-[#E8EDE5]"
              }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id || cat.slug}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${selectedCategory === cat.name
                  ? "bg-[#3D5938] text-white"
                  : "bg-[#F3F6F0] text-[#62775E] hover:bg-[#E8EDE5]"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="bg-white rounded-2xl border border-[#D5E0D0] overflow-hidden shadow-2xs">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-3 border-[#3D5938] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-[#62775E]">Loading products catalog...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-xs text-[#62775E] mb-3">No products match the selected filters.</p>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#203322] text-white text-xs font-semibold hover:bg-[#112316] transition"
            >
              <FiPlus size={15} /> Add First Product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAF6] border-b border-[#D5E0D0] text-[#526B4E] uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-5 py-3.5 font-bold">Product</th>
                  <th className="px-4 py-3.5 font-bold">Category</th>
                  <th className="px-4 py-3.5 font-bold">Price</th>
                  <th className="px-4 py-3.5 font-bold">Stock</th>
                  <th className="px-4 py-3.5 font-bold">Status</th>
                  <th className="px-5 py-3.5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDF2EB]">
                {filteredProducts.map((p) => {
                  const prodId = p._id || p.id;
                  const thumb = p.images && p.images.length > 0 ? p.images[0] : "/images/Granny_Sweater.png";
                  const isLowStock = p.stockCount <= 5;

                  return (
                    <tr key={prodId} className="hover:bg-[#F9FAF8] transition">

                      {/* Product Name & Thumbnail */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#E8EDE5] overflow-hidden shrink-0 border border-[#D5E0D0]">
                            <img
                              src={thumb}
                              alt={p.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "https://placehold.co/100x100/E8EDE5/3D5938?text=" + encodeURIComponent(p.name);
                              }}
                            />
                          </div>
                          <div>
                            <p className="font-bold text-[#1C2C1D] text-sm leading-snug">{p.name}</p>
                            <p className="text-[11px] text-[#62775E] font-mono">/{p.slug}</p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3.5">
                        <span className="px-2.5 py-1 rounded-lg bg-[#F0F4EC] text-[#3D5938] font-semibold text-[11px] border border-[#DCE4D8]">
                          {p.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-4 py-3.5">
                        <p className="font-bold text-[#1C2C1D] text-sm">₹{Number(p.price).toLocaleString()}</p>
                        {p.originalPrice && (
                          <p className="text-[10px] text-gray-400 line-through">₹{Number(p.originalPrice).toLocaleString()}</p>
                        )}
                      </td>

                      {/* Stock */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-bold ${isLowStock ? "text-amber-600" : "text-[#1C2C1D]"}`}>
                            {p.stockCount} in stock
                          </span>
                          {isLowStock && <FiAlertTriangle className="text-amber-500" size={13} />}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${p.isActive !== false ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-gray-100 text-gray-500 border border-gray-200"
                          }`}>
                          {p.isActive !== false ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/collection/${p.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-[#62775E] hover:text-[#203322] hover:bg-[#F3F6F0] transition"
                            title="Preview on Store"
                          >
                            <FiEye size={14} />
                          </Link>
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1.5 rounded-lg text-[#62775E] hover:text-[#203322] hover:bg-[#F3F6F0] transition"
                            title="Edit Product"
                          >
                            <FiEdit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(prodId)}
                            className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition"
                            title="Delete Product"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT PRODUCT MODAL WITH IMAGEKIT INTEGRATION */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-3xl my-8 overflow-hidden border border-[#D5E0D0] shadow-xl animate-fade-in max-h-[90vh] flex flex-col">

            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#F3F6F0] border-b border-[#DCE4D8] flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#1C2C1D]">
                  {editingProduct ? "Edit Product" : "Add New Handcrafted Product"}
                </h3>
                <p className="text-[11px] text-[#62775E]">
                  Configure specs, ImageKit media CDN images, pricing, and stock.
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
            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              {/* IMAGEKIT GALLERY UPLOAD BOX */}
              <div className="p-4 rounded-2xl bg-[#FAFBF9] border border-[#DCE4D8]">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-[#1C2C1D] uppercase tracking-wider">
                    Product Image Gallery (ImageKit CDN)
                  </label>
                  <span className="text-[11px] text-[#62775E] font-medium">
                    {formData.images.length} images added
                  </span>
                </div>

                {/* Upload Button & Preview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  {formData.images.map((imgUrl, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-white border border-[#D5E0D0] group">
                      <img src={imgUrl} alt="Product" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-rose-500 text-white opacity-0 group-hover:opacity-100 transition shadow-xs"
                      >
                        <FiX size={12} />
                      </button>
                    </div>
                  ))}

                  <label className="border-2 border-dashed border-[#B5C5A8] rounded-xl flex flex-col items-center justify-center p-3 text-center cursor-pointer hover:border-[#3D5938] hover:bg-white transition aspect-square">
                    <input
                      type="file"
                      ref={fileInputRef}
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                    {uploadingImage ? (
                      <div className="w-6 h-6 border-2 border-[#3D5938] border-t-transparent rounded-full animate-spin mb-1" />
                    ) : (
                      <>
                        <FiUploadCloud size={20} className="text-[#3D5938] mb-1" />
                        <span className="text-[11px] font-bold text-[#3D5938]">Upload to ImageKit</span>
                        <span className="text-[9px] text-[#83977F]">PNG, JPG, WebP</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1C2C1D] uppercase tracking-wider mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Pearl Crochet Pouch"
                    value={formData.name}
                    onChange={handleNameChange}
                    className="w-full px-3.5 py-2.5 bg-[#F9FAF8] border border-[#DCE4D8] rounded-xl text-xs text-[#1C2C1D] focus:outline-none focus:border-[#3D5938]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C2C1D] uppercase tracking-wider mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., pearl-crochet-pouch"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F9FAF8] border border-[#DCE4D8] rounded-xl text-xs font-mono text-[#1C2C1D] focus:outline-none focus:border-[#3D5938]"
                  />
                </div>
              </div>

              {/* Price, Original Price, Stock, Category */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1C2C1D] uppercase tracking-wider mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="1299"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F9FAF8] border border-[#DCE4D8] rounded-xl text-xs text-[#1C2C1D] focus:outline-none focus:border-[#3D5938]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C2C1D] uppercase tracking-wider mb-1">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="1599"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F9FAF8] border border-[#DCE4D8] rounded-xl text-xs text-[#1C2C1D] focus:outline-none focus:border-[#3D5938]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C2C1D] uppercase tracking-wider mb-1">
                    Stock Count
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stockCount}
                    onChange={(e) => setFormData({ ...formData, stockCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F9FAF8] border border-[#DCE4D8] rounded-xl text-xs text-[#1C2C1D] focus:outline-none focus:border-[#3D5938]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C2C1D] uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const selected = categories.find((c) => c.name === e.target.value);
                      setFormData({
                        ...formData,
                        category: e.target.value,
                        categorySlug: selected?.slug || "bags",
                      });
                    }}
                    className="w-full px-3 py-2.5 bg-[#F9FAF8] border border-[#DCE4D8] rounded-xl text-xs text-[#1C2C1D] focus:outline-none focus:border-[#3D5938]"
                  >
                    {categories.map((c) => (
                      <option key={c._id || c.slug} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#1C2C1D] uppercase tracking-wider mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Detailed description of the handcrafted piece..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F9FAF8] border border-[#DCE4D8] rounded-xl text-xs text-[#1C2C1D] focus:outline-none focus:border-[#3D5938]"
                />
              </div>

              {/* Crafting Days & Yarn Material */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1C2C1D] uppercase tracking-wider mb-1">
                    Yarn Material
                  </label>
                  <input
                    type="text"
                    value={formData.yarnMaterial}
                    onChange={(e) => setFormData({ ...formData, yarnMaterial: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F9FAF8] border border-[#DCE4D8] rounded-xl text-xs text-[#1C2C1D] focus:outline-none focus:border-[#3D5938]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C2C1D] uppercase tracking-wider mb-1">
                    Crafting Duration (Days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.craftingDays}
                    onChange={(e) => setFormData({ ...formData, craftingDays: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F9FAF8] border border-[#DCE4D8] rounded-xl text-xs text-[#1C2C1D] focus:outline-none focus:border-[#3D5938]"
                  />
                </div>
              </div>

              {/* Sub-Category / Collection Tag & Badge Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1C2C1D] uppercase tracking-wider mb-1">
                    Storefront Section / Sub-Category
                  </label>
                  <select
                    value={formData.badge}
                    onChange={(e) => {
                      const val = e.target.value;
                      let color = "bg-amber-500";
                      if (val === "New Launch") color = "bg-emerald-500";
                      if (val === "Handmade Favorite") color = "bg-rose-500";
                      if (val === "Limited Edition") color = "bg-purple-500";
                      setFormData({
                        ...formData,
                        badge: val,
                        badgeColor: color,
                        isFeatured: val === "Bestseller" || val === "Trending Now" ? true : formData.isFeatured,
                      });
                    }}
                    className="w-full px-3 py-2.5 bg-[#F9FAF8] border border-[#DCE4D8] rounded-xl text-xs text-[#1C2C1D] focus:outline-none focus:border-[#3D5938]"
                  >
                    <option value="">Standard Catalog Item</option>
                    <option value="Bestseller">Trending Now (Bestseller)</option>
                    <option value="New Launch">New Arrivals (New Launch)</option>
                    <option value="Handmade Favorite">Handmade Favorite</option>
                    <option value="Artisan Pick">Artisan Pick</option>
                    <option value="Limited Edition">Limited Edition</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C2C1D] uppercase tracking-wider mb-1">
                    Badge Color Theme
                  </label>
                  <select
                    value={formData.badgeColor}
                    onChange={(e) => setFormData({ ...formData, badgeColor: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#F9FAF8] border border-[#DCE4D8] rounded-xl text-xs text-[#1C2C1D] focus:outline-none focus:border-[#3D5938]"
                  >
                    <option value="bg-amber-500">Amber / Gold (Bestseller)</option>
                    <option value="bg-emerald-500">Emerald Green (New Launch)</option>
                    <option value="bg-rose-500">Rose / Pink (Favorites)</option>
                    <option value="bg-purple-500">Purple (Limited Edition)</option>
                    <option value="bg-blue-500">Ocean Blue (Artisan Pick)</option>
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1C2C1D]">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#3D5938] accent-[#3D5938]"
                  />
                  <span>Featured in Hero & Trending</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1C2C1D]">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-[#3D5938] accent-[#3D5938]"
                  />
                  <span>Active in Store</span>
                </label>
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
                  disabled={saving || uploadingImage}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#203322] hover:bg-[#112316] text-white text-xs font-semibold shadow-button transition disabled:opacity-70"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <FiSave size={14} />
                      <span>{editingProduct ? "Update Product" : "Save Product"}</span>
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
