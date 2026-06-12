"use client";

import {
  FiPackage,
  FiTruck,
  FiSearch,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiPhone,
  FiMail,
} from "react-icons/fi";

export default function TrackOrderPage() {
  return (
    <main className="bg-[#FAF8F4] min-h-screen">
      {/* Hero */}
      <section className="py-20 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#3D5938]/10 text-[#3D5938] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <FiPackage />
            Order Tracking
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#3D5938] mb-6">
            Track Your Order
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated on your order journey. Enter your Order ID below to
            check the latest shipping and delivery status.
          </p>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="px-6 lg:px-16 pb-16">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#3D5938]/10 shadow-sm p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <FiSearch className="text-[#3D5938]" size={24} />
            <h2 className="text-2xl font-semibold text-[#3D5938]">
              Find Your Order
            </h2>
          </div>

          <div className="grid md:grid-cols-[1fr_auto] gap-4">
            <input
              type="text"
              placeholder="Enter Order ID (e.g. ORD12345)"
              className="w-full px-5 py-4 rounded-xl border border-[#3D5938]/20 focus:outline-none focus:ring-2 focus:ring-[#3D5938]/20"
            />

            <button className="px-8 py-4 rounded-xl bg-[#3D5938] text-white font-medium hover:opacity-90 transition">
              Track Order
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Enter the Order ID received in your confirmation email or WhatsApp
            message.
          </p>
        </div>
      </section>

      {/* Example Status */}
      <section className="px-6 lg:px-16 pb-16">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#3D5938]/10 shadow-sm p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-[#3D5938] mb-8">
            Order Status
          </h2>

          <div className="space-y-8">
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-full bg-[#3D5938] text-white flex items-center justify-center flex-shrink-0">
                <FiCheckCircle size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-[#3D5938]">
                  Order Confirmed
                </h3>
                <p className="text-gray-600 mt-1">
                  Your order has been successfully placed.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-full bg-[#3D5938] text-white flex items-center justify-center flex-shrink-0">
                <FiPackage size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-[#3D5938]">
                  Order Packed
                </h3>
                <p className="text-gray-600 mt-1">
                  Your handmade products have been packed securely.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-full bg-[#3D5938] text-white flex items-center justify-center flex-shrink-0">
                <FiTruck size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-[#3D5938]">
                  Shipped
                </h3>
                <p className="text-gray-600 mt-1">
                  Your package is on its way.
                </p>
              </div>
            </div>

            <div className="flex gap-5 opacity-60">
              <div className="w-12 h-12 rounded-full bg-[#3D5938]/20 text-[#3D5938] flex items-center justify-center flex-shrink-0">
                <FiMapPin size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-[#3D5938]">
                  Out for Delivery
                </h3>
                <p className="text-gray-600 mt-1">
                  Awaiting dispatch from local delivery hub.
                </p>
              </div>
            </div>

            <div className="flex gap-5 opacity-60">
              <div className="w-12 h-12 rounded-full bg-[#3D5938]/20 text-[#3D5938] flex items-center justify-center flex-shrink-0">
                <FiCheckCircle size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-[#3D5938]">
                  Delivered
                </h3>
                <p className="text-gray-600 mt-1">
                  Package delivered successfully.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="px-6 lg:px-16 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-[#3D5938]/10 shadow-sm">
            <FiClock className="text-[#3D5938] mb-4" size={28} />
            <h3 className="text-xl font-semibold text-[#3D5938] mb-3">
              Processing Time
            </h3>
            <p className="text-gray-600">
              Orders are usually processed within 1–3 business days.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-[#3D5938]/10 shadow-sm">
            <FiTruck className="text-[#3D5938] mb-4" size={28} />
            <h3 className="text-xl font-semibold text-[#3D5938] mb-3">
              Shipping Updates
            </h3>
            <p className="text-gray-600">
              Tracking updates are shared once your order is dispatched.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-[#3D5938]/10 shadow-sm">
            <FiCheckCircle className="text-[#3D5938] mb-4" size={28} />
            <h3 className="text-xl font-semibold text-[#3D5938] mb-3">
              Safe Delivery
            </h3>
            <p className="text-gray-600">
              Every package is securely packed and monitored during transit.
            </p>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="px-6 lg:px-16 pb-20">
        <div className="max-w-6xl mx-auto bg-[#3D5938] rounded-3xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-8">
            Need Help With Your Order?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <FiMail size={24} />
              <div>
                <h3 className="font-semibold mb-1">Email Support</h3>
                <p className="text-white/80">
                  support@yourstore.com
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <FiPhone size={24} />
              <div>
                <h3 className="font-semibold mb-1">Customer Support</h3>
                <p className="text-white/80">
                  +91 XXXXX XXXXX
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}