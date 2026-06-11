"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Usually 3–10 business days depending on location.",
  },
  {
    question: "Do you accept custom orders?",
    answer:
      "Yes, we create custom handmade crochet products.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Returns are accepted within 7 days of delivery.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, worldwide shipping is available.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState(null);

  return (
    <div className="bg-[#F8F5EE] min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6">

        <p className="uppercase tracking-widest text-[#6A7756]">
          Help Center
        </p>

        <h1 className="text-5xl font-serif mt-4 mb-10">
          Frequently Asked Questions
        </h1>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="w-full p-6 flex justify-between items-center"
              >
                <span className="font-medium text-left">
                  {faq.question}
                </span>

                {open === index ? (
                  <FiMinus />
                ) : (
                  <FiPlus />
                )}
              </button>

              {open === index && (
                <div className="px-6 pb-6 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}