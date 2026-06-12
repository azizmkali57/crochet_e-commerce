"use client";

import {
  FiTruck,
  FiPackage,
  FiClock,
  FiMapPin,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";

export default function ShippingDeliveryPage() {
  return (
    <main className="bg-[#FAF8F4] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#3D5938]/10 text-[#3D5938] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <FiTruck />
            Shipping & Delivery Information
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#3D5938] mb-6">
            Fast, Safe & Reliable Delivery
          </h1>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            We carefully pack every handmade product and ensure it reaches you
            safely. Our shipping process is designed to provide a smooth and
            trustworthy shopping experience from order placement to delivery.
          </p>
        </div>
      </section>

      {/* Shipping Highlights */}
      <section className="px-6 lg:px-16 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <FiPackage size={28} />,
              title: "Secure Packaging",
              desc: "Every order is packed with care to ensure products arrive safely.",
            },
            {
              icon: <FiClock size={28} />,
              title: "Quick Dispatch",
              desc: "Orders are typically processed and dispatched within 1–3 business days.",
            },
            {
              icon: <FiShield size={28} />,
              title: "Trusted Delivery",
              desc: "We work with reliable courier partners for safe deliveries.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-sm border border-[#3D5938]/10"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#3D5938]/10 flex items-center justify-center text-[#3D5938] mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-[#3D5938] mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shipping Policy */}
      <section className="px-6 lg:px-16 pb-16">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-[#3D5938]/10 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-[#3D5938] mb-8">
            Shipping Policy
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-xl text-[#3D5938] mb-3">
                Order Processing
              </h3>
              <p className="text-gray-600 leading-relaxed">
                All orders are processed within 1–3 business days after payment
                confirmation. During peak seasons, sales events, or holidays,
                processing times may be slightly longer.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-xl text-[#3D5938] mb-3">
                Delivery Timeline
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Standard delivery usually takes 3–7 business days depending on
                your location. Remote areas may require additional delivery
                time.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-xl text-[#3D5938] mb-3">
                Shipping Charges
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Shipping charges, if applicable, are calculated during checkout
                and displayed before payment confirmation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-xl text-[#3D5938] mb-3">
                Order Tracking
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Once your order is shipped, tracking details will be shared via
                email, SMS, or WhatsApp so you can monitor your shipment's
                progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Information */}
      <section className="px-6 lg:px-16 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#3D5938]/10">
            <div className="flex items-center gap-3 mb-5">
              <FiMapPin className="text-[#3D5938]" size={24} />
              <h3 className="text-2xl font-semibold text-[#3D5938]">
                Delivery Coverage
              </h3>
            </div>

            <p className="text-gray-600 leading-relaxed">
              We currently deliver across most serviceable locations. Delivery
              availability depends on courier service coverage in your area.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#3D5938]/10">
            <div className="flex items-center gap-3 mb-5">
              <FiTruck className="text-[#3D5938]" size={24} />
              <h3 className="text-2xl font-semibold text-[#3D5938]">
                Delivery Delays
              </h3>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Unexpected circumstances such as weather conditions, public
              holidays, or courier disruptions may occasionally impact delivery
              timelines.
            </p>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="px-6 lg:px-16 pb-20">
        <div className="max-w-6xl mx-auto bg-[#3D5938] rounded-3xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-8">Important Notes</h2>

          <div className="space-y-4">
            {[
              "Please ensure your shipping address and contact details are accurate.",
              "Orders cannot be redirected once shipped.",
              "Delivery times are estimates and may vary based on location.",
              "Customers should inspect packages upon delivery and report any issues promptly.",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <FiCheckCircle
                  className="flex-shrink-0 mt-1"
                  size={18}
                />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}