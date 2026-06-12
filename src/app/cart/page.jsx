"use client";

import { useCart } from "@/components/context/CartContext";
import { FiTrash2, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty, cartTotal } =
    useCart();

  return (
    <main className="bg-[#FAF8F4] min-h-screen px-4 lg:px-10 py-16">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-[#3D5938] flex items-center gap-3">
          <FiShoppingBag />
          Shopping Cart
        </h1>
        <p className="text-gray-500 mt-2">Review your items before checkout</p>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
        {/* LEFT - CART ITEMS */}
        <div className="lg:col-span-2 space-y-5">
          {cart.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#3D5938]/10">
              <FiShoppingBag
                className="mx-auto text-[#3D5938] mb-4"
                size={40}
              />
              <h2 className="text-xl font-semibold text-[#3D5938]">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mt-2">
                Start adding beautiful handmade products ✨
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 flex items-center gap-5 border border-[#3D5938]/10 shadow-sm hover:shadow-md transition"
              >
                {/* IMAGE PLACEHOLDER */}
                <div className="w-20 h-20 rounded-2xl bg-gray-100 flex-shrink-0" />

                {/* DETAILS */}
                <div className="flex-1">
                  <h2 className="font-semibold text-[#3D5938] text-lg">
                    {item.name}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    ₹{item.price} per item
                  </p>

                  {/* Qty Controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      -
                    </button>

                    <span className="font-medium">{item.qty}</span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* PRICE */}
                <div className="text-right">
                  <p className="font-bold text-[#3D5938] text-lg">
                    ₹{item.price * item.qty}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 mt-3 hover:scale-110 transition"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT - SUMMARY */}
        {cart.length > 0 && (
          <div className="bg-white rounded-3xl p-6 border border-[#3D5938]/10 h-fit shadow-sm">
            <h2 className="text-xl font-bold text-[#3D5938] mb-5">
              Order Summary
            </h2>

            <div className="space-y-3 text-gray-600 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span>- ₹0</span>
              </div>
            </div>

            <div className="border-t mt-4 pt-4 flex justify-between font-bold text-[#3D5938] text-lg">
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>

            {/* CHECKOUT BUTTON */}
            <Link
              href="/checkout"
              className="mt-6 w-full bg-[#3D5938] text-white py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#2f452c] transition"
            >
              Proceed to Checkout <FiArrowRight />
            </Link>

            <p className="text-xs text-gray-500 mt-3 text-center">
              Secure checkout powered by trusted payment gateways
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
