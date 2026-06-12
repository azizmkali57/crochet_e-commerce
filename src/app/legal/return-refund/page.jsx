"use client";

import {
  FiRefreshCw,
  FiPackage,
  FiCheckCircle,
  FiAlertCircle,
  FiDollarSign,
  FiShield,
  FiClock,
} from "react-icons/fi";

export default function ReturnsRefundsPage() {
  return (
    <main className="bg-[#FAF8F4] min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#3D5938]/10 text-[#3D5938] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <FiRefreshCw />
            Returns & Refunds Policy
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#3D5938] mb-6">
            Simple, Fair & Customer-Friendly Returns
          </h1>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Your satisfaction is important to us. If there's an issue with your
            order, we're here to help. Please review our return and refund
            policy below for complete details.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="px-6 lg:px-16 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <FiShield size={28} />,
              title: "Customer Protection",
              desc: "We aim to resolve genuine order issues quickly and fairly.",
            },
            {
              icon: <FiClock size={28} />,
              title: "Fast Resolution",
              desc: "Eligible refund requests are reviewed as quickly as possible.",
            },
            {
              icon: <FiDollarSign size={28} />,
              title: "Transparent Process",
              desc: "No hidden conditions—our policy is straightforward and easy to understand.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border border-[#3D5938]/10 shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#3D5938]/10 flex items-center justify-center text-[#3D5938] mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-[#3D5938] mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Return Eligibility */}
      <section className="px-6 lg:px-16 pb-16">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-[#3D5938]/10 shadow-sm p-8 md:p-12">
          <h2 className="text-3xl font-bold text-[#3D5938] mb-8">
            Return Eligibility
          </h2>

          <div className="space-y-5">
            {[
              "Items must be returned in their original condition and packaging.",
              "Return requests should be submitted within 7 days of delivery.",
              "Products showing signs of use, damage, or alteration may not qualify for returns.",
              "Proof of purchase or order confirmation may be required.",
            ].map((item, index) => (
              <div key={index} className="flex gap-3">
                <FiCheckCircle
                  className="text-[#3D5938] mt-1 flex-shrink-0"
                  size={18}
                />
                <p className="text-gray-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Non Returnable Items */}
      <section className="px-6 lg:px-16 pb-16">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-[#3D5938]/10 shadow-sm p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <FiAlertCircle className="text-[#3D5938]" size={24} />
            <h2 className="text-3xl font-bold text-[#3D5938]">
              Non-Returnable Items
            </h2>
          </div>

          <div className="space-y-4 text-gray-600">
            <p>
              The following items may not be eligible for return:
            </p>

            <ul className="space-y-3">
              <li>• Custom-made or personalized products.</li>
              <li>• Gift items specifically created upon request.</li>
              <li>• Products damaged due to misuse or improper handling.</li>
              <li>• Items returned without prior approval where applicable.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Refund Process */}
      <section className="px-6 lg:px-16 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#3D5938] mb-8 text-center">
            Refund Process
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <FiPackage size={28} />,
                title: "Request Review",
                desc: "Our team reviews your return request and eligibility.",
              },
              {
                icon: <FiRefreshCw size={28} />,
                title: "Return Verification",
                desc: "Returned items are inspected upon receipt.",
              },
              {
                icon: <FiDollarSign size={28} />,
                title: "Refund Issued",
                desc: "Approved refunds are processed to the original payment method.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 border border-[#3D5938]/10 shadow-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#3D5938]/10 flex items-center justify-center text-[#3D5938] mb-5">
                  {step.icon}
                </div>

                <h3 className="text-xl font-semibold text-[#3D5938] mb-3">
                  {step.title}
                </h3>

                <p className="text-gray-600">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Refund Timeline */}
      <section className="px-6 lg:px-16 pb-20">
        <div className="max-w-6xl mx-auto bg-[#3D5938] rounded-3xl p-8 md:p-12 text-white">
          <div className="flex items-center gap-3 mb-6">
            <FiClock size={24} />
            <h2 className="text-3xl font-bold">
              Refund Timeline
            </h2>
          </div>

          <div className="space-y-4">
            <p>
              Once your return is approved, refunds are typically processed
              within 5–10 business days.
            </p>

            <p>
              Processing times may vary depending on your payment provider,
              banking institution, or payment method used during checkout.
            </p>

            <p>
              If you have not received your refund after the expected period,
              please contact our support team for assistance.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}