"use client";

import React, { useState } from "react";
import {
  FiSettings,
  FiShield,
  FiBell,
  FiLock,
  FiSave,
  FiCheckCircle
} from "react-icons/fi";

export default function DashboardSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    storeName: "Crochet Alif",
    storeEmail: "artisan@crochetalif.com",
    whatsappNumber: "917000577651",
    currency: "INR (₹)",
    freeShippingThreshold: 1999,
    enableNotifications: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* HEADER */}
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#1C2C1D]">
          Store Settings & Security
        </h1>
        <p className="text-xs text-[#62775E] mt-0.5">
          Configure your handmade store settings, WhatsApp order triggers & admin credentials.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D5E0D0] shadow-2xs space-y-6">
        
        {saved && (
          <div className="p-4 rounded-xl bg-[#E6F4EA] border border-[#B7E1CD] text-[#137333] text-xs font-semibold flex items-center gap-2">
            <FiCheckCircle size={16} /> Store settings updated successfully!
          </div>
        )}

        <div className="space-y-4">
          <h3 className="font-heading text-base font-bold text-[#1C2C1D] pb-2 border-b border-[#EAEFE8]">
            General Store Configuration
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1C2C1D] uppercase tracking-wider mb-2">
                Store Name
              </label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F3F6F0] border border-[#DCE4D8] rounded-xl text-xs text-[#203322] focus:outline-none focus:border-[#3D5938]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1C2C1D] uppercase tracking-wider mb-2">
                WhatsApp Order Number
              </label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F3F6F0] border border-[#DCE4D8] rounded-xl text-xs text-[#203322] focus:outline-none focus:border-[#3D5938]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1C2C1D] uppercase tracking-wider mb-2">
                Notification Email
              </label>
              <input
                type="email"
                value={settings.storeEmail}
                onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F3F6F0] border border-[#DCE4D8] rounded-xl text-xs text-[#203322] focus:outline-none focus:border-[#3D5938]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1C2C1D] uppercase tracking-wider mb-2">
                Free Shipping Threshold (₹)
              </label>
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-[#F3F6F0] border border-[#DCE4D8] rounded-xl text-xs text-[#203322] focus:outline-none focus:border-[#3D5938]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#EAEFE8] flex items-center justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#203322] hover:bg-[#112316] text-white text-xs font-semibold shadow-button transition"
          >
            <FiSave size={14} /> Save Configuration
          </button>
        </div>

      </form>

    </div>
  );
}
