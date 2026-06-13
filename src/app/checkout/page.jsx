"use client";

import { useState } from "react";
import { useCart } from "@/components/context/CartContext";
import { FiShoppingBag, FiCreditCard, FiMapPin, FiUser } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
const router = useRouter();

  const handlePlaceOrder = () => {
  if (
    !form.name ||
    !form.phone ||
    !form.address ||
    !form.city ||
    !form.pincode
  ) {
    alert("Please fill all details");
    return;
  }

  const orderItems = cart
    .map(
      (item) =>
        `• ${item.name} x ${item.qty} - ₹${item.price * item.qty}`
    )
    .join("\n");

  const message = `
🧶 *New Crochet Order*

👤 Name: ${form.name}
📞 Phone: ${form.phone}

📍 Address:
${form.address}
${form.city} - ${form.pincode}

🛍️ Order Items:
${orderItems}

💰 Total: ₹${cartTotal}
`;

  const whatsappNumber = "917000577651"; // Your WhatsApp Number

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  // Open WhatsApp
  window.open(whatsappURL, "_blank");

  // Clear cart
  clearCart();

  // Redirect to homepage after 1 second
  setTimeout(() => {
    router.push("/");
  }, 1000);
};
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className="bg-[#FAF8F4] min-h-screen px-4 lg:px-10 py-16">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-[#3D5938] flex items-center gap-3">
          <FiShoppingBag />
          Checkout
        </h1>
        <p className="text-gray-500 mt-2">
          Complete your order securely
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
        {/* LEFT - FORM */}
        <div className="lg:col-span-2 space-y-6">
          {/* CONTACT */}
          <div className="bg-white rounded-3xl p-6 border border-[#3D5938]/10">
            <h2 className="text-lg font-bold text-[#3D5938] mb-4 flex items-center gap-2">
              <FiUser /> Contact Details
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className="border rounded-xl px-4 py-3 outline-none focus:border-[#3D5938]"
              />
              <input
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                className="border rounded-xl px-4 py-3 outline-none focus:border-[#3D5938]"
              />
            </div>
          </div>

          {/* ADDRESS */}
          <div className="bg-white rounded-3xl p-6 border border-[#3D5938]/10">
            <h2 className="text-lg font-bold text-[#3D5938] mb-4 flex items-center gap-2">
              <FiMapPin /> Shipping Address
            </h2>

            <div className="space-y-4">
              <input
                name="address"
                placeholder="Full Address"
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#3D5938]"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-3 outline-none focus:border-[#3D5938]"
                />
                <input
                  name="pincode"
                  placeholder="PIN Code"
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-3 outline-none focus:border-[#3D5938]"
                />
              </div>
            </div>
          </div>

          {/* PAYMENT (UI ONLY) */}
          <div className="bg-white rounded-3xl p-6 border border-[#3D5938]/10">
            <h2 className="text-lg font-bold text-[#3D5938] mb-4 flex items-center gap-2">
              <FiCreditCard /> Payment Method
            </h2>

            <div className="space-y-3">
              <label className="flex items-center gap-3 border p-3 rounded-xl cursor-pointer">
                <input type="radio" name="payment" defaultChecked />
                Cash on Delivery (COD)
              </label>

              <label className="flex items-center gap-3 border p-3 rounded-xl cursor-pointer">
                <input type="radio" name="payment" />
                Online Payment (UPI / Card)
              </label>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Secure payments powered by trusted gateways
            </p>
          </div>
        </div>

        {/* RIGHT - ORDER SUMMARY */}
        <div className="bg-white rounded-3xl p-6 border border-[#3D5938]/10 h-fit shadow-sm">
          <h2 className="text-xl font-bold text-[#3D5938] mb-5">
            Order Summary
          </h2>

          <div className="space-y-3 text-gray-600 text-sm">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between font-bold text-[#3D5938]">
            <span>Total</span>
            <span>₹{cartTotal}</span>
          </div>

          {/* PLACE ORDER BUTTON */}
          <button
  onClick={handlePlaceOrder}
  className="mt-6 w-full bg-[#3D5938] text-white py-3.5 rounded-full font-semibold hover:bg-[#2f452c] transition"
>
  Place Order
</button>

          <p className="text-xs text-gray-500 mt-3 text-center">
            You will receive confirmation after order placement
          </p>
        </div>
      </div>
    </main>
  );
}