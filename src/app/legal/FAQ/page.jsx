"use client";

import { useState } from "react";
import {
  FiHelpCircle,
  FiChevronDown,
  FiChevronUp,
  FiMessageCircle,
} from "react-icons/fi";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How long does delivery take?",
      a: "Delivery usually takes 3–7 business days depending on your location. Remote areas may take slightly longer.",
    },
    {
      q: "How can I track my order?",
      a: "You can track your order using the Track Order page by entering your Order ID sent to your email or WhatsApp.",
    },
    {
      q: "Do you accept custom orders?",
      a: "Yes! We specialize in handmade custom orders. You can contact us with your requirements before placing an order.",
    },
    {
      q: "What is your return policy?",
      a: "We accept returns within 7 days of delivery for unused and undamaged items. Custom items are not eligible for return.",
    },
    {
      q: "When will I get my refund?",
      a: "Refunds are processed within 5–10 business days after the returned item is inspected and approved.",
    },
    {
      q: "How do I contact customer support?",
      a: "You can reach us via email, phone, or WhatsApp. Details are available on our Contact page.",
    },
  ];

  return (
    <main className="bg-[#FAF8F4] min-h-screen">
      {/* HERO */}
      <section className="py-20 px-6 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#3D5938]/10 text-[#3D5938] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <FiHelpCircle />
            Frequently Asked Questions
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#3D5938] mb-6">
            We’re Here to Help
          </h1>

          <p className="text-gray-600 text-lg">
            Find quick answers to the most common questions about orders,
            shipping, returns, and custom products.
          </p>
        </div>
      </section>

      {/* FAQ LIST */}
      <section className="px-6 lg:px-16 pb-20">
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white border border-[#3D5938]/10 rounded-2xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-[#3D5938]">
                    {item.q}
                  </span>

                  {isOpen ? (
                    <FiChevronUp className="text-[#3D5938]" />
                  ) : (
                    <FiChevronDown className="text-[#3D5938]" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SUPPORT CTA */}
      <section className="px-6 lg:px-16 pb-20">
        <div className="max-w-5xl mx-auto bg-[#3D5938] text-white rounded-3xl p-10 md:p-14 text-center">
          <FiMessageCircle className="mx-auto mb-4" size={32} />

          <h2 className="text-3xl font-bold mb-4">
            Still Have Questions?
          </h2>

          <p className="text-white/80 mb-6">
            Our support team is always ready to help you with orders,
            shipping, and custom requests.
          </p>

          <a
            href="/contact"
            className="inline-block bg-white text-[#3D5938] px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
          >
            Contact Support
          </a>
        </div>
      </section>
    </main>
  );
}