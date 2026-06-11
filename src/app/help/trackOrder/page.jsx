"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");

  return (
    <div className="bg-[#F8F5EE] min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl w-full bg-white rounded-[40px] p-10">

        <h1 className="text-5xl font-serif text-center">
          Track Your Order
        </h1>

        <p className="text-center text-gray-600 mt-4">
          Enter your order ID below.
        </p>

        <div className="flex mt-8 gap-4">
          <input
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Order ID"
            className="flex-1 border rounded-full px-6 py-4 outline-none"
          />

          <button className="bg-[#6A7756] text-white rounded-full px-8">
            <FiSearch />
          </button>
        </div>

        <div className="mt-10 bg-[#F8F5EE] rounded-3xl p-8">
          <h3 className="font-semibold text-lg">
            Example Status
          </h3>

          <p className="mt-3 text-gray-600">
            Order #CR12345 is currently out for delivery.
          </p>
        </div>
      </div>
    </div>
  );
}