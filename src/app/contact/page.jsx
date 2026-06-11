"use client";
import { useState } from "react";
import {
  FiInstagram,
  FiMessageCircle,
  FiMapPin,
  FiMail,
  FiPackage,
  FiRefreshCcw,
  FiGlobe,
  FiChevronDown,
  FiChevronUp,
  FiArrowRight,
  FiSend,
} from "react-icons/fi";
import { BsPinterest } from "react-icons/bs";
import Header from "@/components/layout/Header";
import Image from "next/image";

const contactMethods = [
  {
    icon: <FiInstagram size={24} className="text-[#3D5C3B]" />,
    title: "Instagram",
    sub: "DM us for quick queries",
    value: "@crochet_alif",
    badge: "Most active here",
    href: "https://instagram.com/crochet_alif",
  },
  {
    icon: <FiMessageCircle size={24} className="text-[#3D5C3B]" />,
    title: "WhatsApp",
    sub: "Custom orders & support",
    value: "+91 70891 08217",
    badge: "Responds within 2 hrs",
    href: "https://wa.me/917089108217",
  },
  {
    icon: <FiMapPin size={24} className="text-[#3D5C3B]" />,
    title: "Location",
    sub: "Based out of",
    value: "Suniram M P & Rajgarh M P, India",
    badge: "India",
    href: null,
  },
];

const infoRows = [
  { icon: <FiInstagram size={15} />, label: "@crochet_alif", href: "https://instagram.com/crochet_alif" },
  { icon: <FiMessageCircle size={15} />, label: "+91 70891 08217", href: "https://wa.me/917089108217" },
  { icon: <FiMapPin size={15} />, label: "Rajgarh M P, India", href: null },
];

const supportRows = [
  { icon: <FiPackage size={15} />, label: "Track your order via WhatsApp or Instagram DM" },
  { icon: <FiRefreshCcw size={15} />, label: "Returns & exchanges — see our policy in the footer" },
  { icon: <FiGlobe size={15} />, label: "Worldwide shipping — we will confirm your region" },
];

const faqs = [
  {
    q: "How long does a custom order take?",
    a: "Custom orders typically take 5–10 working days depending on the complexity and size. We will confirm the exact timeline when you place your order.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes! We ship worldwide. International delivery typically takes 7–15 working days. Shipping costs are calculated at checkout based on your location.",
  },
  {
    q: "Can I request a specific colour or yarn?",
    a: "Absolutely! Custom colour and yarn requests are our speciality. Just mention your preferences when you place a custom order and we will do our best to match your vision.",
  },
  {
    q: "What is your return policy?",
    a: "Since all items are handmade, we handle returns on a case-by-case basis. If your item arrives damaged, please contact us within 48 hours with photos and we will make it right.",
  },
  {
    q: "How do I track my order?",
    a: "Once your order is dispatched, we will share a tracking link via WhatsApp or Instagram DM. You can also message us anytime for an update.",
  },
  {
    q: "Do you offer bulk or wholesale orders?",
    a: "Yes, we do consider bulk and wholesale enquiries. Please reach out via the contact form with details about your requirements and we will get back to you.",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      className={`rounded-2xl border cursor-pointer transition-all duration-200 p-6 ${
        open
          ? "bg-[#E8EFDF] border-[#8FAD8D]"
          : "bg-[#F7F3EE] border-[#5C7A5A]/20 hover:bg-[#E8EFDF] hover:border-[#8FAD8D]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-[#2C2418] flex-1 leading-snug">{q}</p>
        <div
          className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
            open
              ? "bg-[#3D5C3B] border-[#3D5C3B] text-white"
              : "bg-[#E8EFDF] border-[#8FAD8D] text-[#3D5C3B]"
          }`}
        >
          {open ? <FiChevronUp size={13} /> : <FiChevronDown size={13} />}
        </div>
      </div>
      {open && (
        <p className="text-sm text-[#5A4E3C] leading-[1.75] mt-3">{a}</p>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", topic: "", message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F7F3EE] font-sans text-[#2C2418]">

      <Header />
      {/* ── HERO ── */}
 <section className="relative overflow-hidden bg-[#E8EFDF] border-b border-[#5C7A5A]/20">

  {/* Background Image */}
  <div className="absolute inset-0">
    <Image
      src="/images/contact_Us_hero.png"
      alt="Contact Background"
      fill
      priority
      className="object-cover object-center opacity-80"
    />
  </div>

  {/* Soft overlay for readability */}
  <div className="absolute inset-0 bg-[#E8EFDF]/80" />

  {/* Content */}
  <div className="relative z-10 px-6 lg:px-16 py-24 text-center">
    <p className="text-[11px] font-medium tracking-[3px] uppercase text-[#5C7A5A] mb-4">
      WE WOULD LOVE TO HEAR FROM YOU
    </p>

    <h1 className="font-serif text-5xl lg:text-7xl leading-[1.1] text-[#2C2418] mb-6">
      Let us{" "}
      <span className="italic text-[#3D5C3B]">
        connect.
      </span>
    </h1>

    <p className="max-w-xl mx-auto text-[#5A4E3C] text-lg leading-relaxed">
      Have a question, a custom order in mind, or just want to say hello?
      We are always happy to chat.
    </p>
  </div>

</section>

 

      {/* ── CONTACT METHOD CARDS ── */}
      <div className="bg-white border-b border-[#5C7A5A]/20">
        <div className="max-w-5xl mx-auto px-6 lg:px-16 py-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {contactMethods.map((m, i) => (
            <div
              key={i}
              className="bg-[#F7F3EE] rounded-2xl p-8 border border-[#5C7A5A]/20 text-center hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(61,92,59,0.09)] transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-full bg-[#E8EFDF] border border-[#8FAD8D]/50 flex items-center justify-center mx-auto mb-5">
                {m.icon}
              </div>
              <h3 className="font-serif text-xl text-[#2C2418] mb-1">{m.title}</h3>
              <p className="text-xs text-[#9A8E7E] mb-3">{m.sub}</p>
              {m.href ? (
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[#3D5C3B] hover:underline"
                >
                  {m.value}
                </a>
              ) : (
                <p className="text-sm font-medium text-[#5A4E3C]">{m.value}</p>
              )}
              <span className="inline-block mt-3 bg-[#E8EFDF] text-[#3D5C3B] text-[11px] font-medium px-3 py-1 rounded-full">
                {m.badge}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RESPONSE BANNER ── */}
      <div className="bg-[#3D5C3B] px-6 lg:px-16 py-6 flex items-center justify-between">
        <p className="text-white/80 text-sm">
          We typically respond within{" "}
          <strong className="text-white font-medium">2–4 hours</strong> on WhatsApp &amp;
          Instagram — we are always around.
        </p>
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-[#C8D8A8] animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>

      {/* ── MAIN FORM + INFO ── */}
      <section className="bg-[#F7F3EE]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* FORM */}
          <div className="bg-white rounded-3xl border border-[#5C7A5A]/20 p-10">
            {!submitted ? (
              <>
                <h2 className="font-serif text-3xl text-[#2C2418] mb-1">Send a message</h2>
                <p className="text-sm text-[#9A8E7E] mb-8">
                  Fill in the form and we will get back to you soon.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#5A4E3C] mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="Aisha"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F7F3EE] border border-[#5C7A5A]/20 text-sm text-[#2C2418] placeholder-[#C4BAB0] outline-none focus:border-[#5C7A5A] focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#5A4E3C] mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Khan"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F7F3EE] border border-[#5C7A5A]/20 text-sm text-[#2C2418] placeholder-[#C4BAB0] outline-none focus:border-[#5C7A5A] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5A4E3C] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F3EE] border border-[#5C7A5A]/20 text-sm text-[#2C2418] placeholder-[#C4BAB0] outline-none focus:border-[#5C7A5A] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5A4E3C] mb-2">
                      Phone Number{" "}
                      <span className="text-[#9A8E7E] font-normal">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F3EE] border border-[#5C7A5A]/20 text-sm text-[#2C2418] placeholder-[#C4BAB0] outline-none focus:border-[#5C7A5A] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5A4E3C] mb-2">
                      What is this about?
                    </label>
                    <select
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F3EE] border border-[#5C7A5A]/20 text-sm text-[#2C2418] outline-none focus:border-[#5C7A5A] focus:bg-white transition-colors appearance-none"
                    >
                      <option value="">Select a topic</option>
                      <option>Custom Order Enquiry</option>
                      <option>Order Status / Tracking</option>
                      <option>Product Question</option>
                      <option>Shipping & Delivery</option>
                      <option>Returns & Refunds</option>
                      <option>Collaboration / Wholesale</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5A4E3C] mb-2">
                      Your Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell us what you have in mind — the more detail, the better!"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F3EE] border border-[#5C7A5A]/20 text-sm text-[#2C2418] placeholder-[#C4BAB0] outline-none focus:border-[#5C7A5A] focus:bg-white transition-colors resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#3D5C3B] text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#5C7A5A] transition-colors"
                  >
                    Send Message <FiSend size={15} />
                  </button>
                  <p className="text-center text-xs text-[#9A8E7E]">
                    We will never share your details with anyone. Promise.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#E8EFDF] border-2 border-[#8FAD8D] flex items-center justify-center mx-auto mb-5">
                  <FiSend size={24} className="text-[#3D5C3B]" />
                </div>
                <h3 className="font-serif text-2xl text-[#2C2418] mb-2">Message sent!</h3>
                <p className="text-sm text-[#5A4E3C]">
                  Thank you for reaching out. We will get back to you within 2–4 hours.
                </p>
              </div>
            )}
          </div>

          {/* INFO COLUMN */}
          <div>
            <h2 className="font-serif text-4xl lg:text-5xl leading-[1.2] text-[#2C2418] mb-4">
              We are here<br />for{" "}
              <em className="not-italic italic text-[#5C7A5A]">every stitch</em>
              <br />of your journey.
            </h2>
            <p className="text-sm text-[#5A4E3C] leading-[1.8] mb-10 max-w-md">
              Whether you are placing a custom order, tracking an existing one, or simply want to
              connect — we are just a message away.
            </p>

            {/* Get in touch */}
            <div className="mb-8 pb-8 border-b border-[#5C7A5A]/20">
              <p className="text-[11px] font-medium tracking-[2px] uppercase text-[#5C7A5A] mb-4">
                Get in Touch
              </p>
              <div className="space-y-3">
                {infoRows.map((row, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#E8EFDF] flex items-center justify-center text-[#3D5C3B] flex-shrink-0">
                      {row.icon}
                    </div>
                    {row.href ? (
                      <a
                        href={row.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#5A4E3C] hover:text-[#3D5C3B] transition-colors"
                      >
                        {row.label}
                      </a>
                    ) : (
                      <span className="text-sm text-[#5A4E3C]">{row.label}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Order support */}
            <div className="mb-8 pb-8 border-b border-[#5C7A5A]/20">
              <p className="text-[11px] font-medium tracking-[2px] uppercase text-[#5C7A5A] mb-4">
                Order Support
              </p>
              <div className="space-y-3">
                {supportRows.map((row, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#E8EFDF] flex items-center justify-center text-[#3D5C3B] flex-shrink-0 mt-0.5">
                      {row.icon}
                    </div>
                    <span className="text-sm text-[#5A4E3C] leading-[1.7]">{row.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="text-[11px] font-medium tracking-[2px] uppercase text-[#5C7A5A] mb-3">
                Follow Along
              </p>
              <p className="text-sm text-[#5A4E3C] mb-4">
                Stay updated on new collections, behind-the-scenes and exclusive drops.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/crochet_alif"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#5C7A5A]/20 text-sm font-medium text-[#5A4E3C] hover:bg-[#E8EFDF] hover:border-[#8FAD8D] hover:text-[#3D5C3B] transition-all"
                >
                  <FiInstagram size={15} /> Instagram
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#5C7A5A]/20 text-sm font-medium text-[#5A4E3C] hover:bg-[#E8EFDF] hover:border-[#8FAD8D] hover:text-[#3D5C3B] transition-all"
                >
                  <BsPinterest size={15} /> Pinterest
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white border-t border-[#5C7A5A]/20">
        <div className="max-w-4xl mx-auto px-6 lg:px-16 py-20">
          <div className="text-center mb-14">
            <p className="text-[11px] font-medium tracking-[3px] uppercase text-[#5C7A5A] mb-3">
              Common questions
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl text-[#2C2418] leading-[1.2] mb-3">
              Quick answers.
            </h2>
            <p className="text-sm text-[#5A4E3C]">
              Everything you might want to know before reaching out.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER STRIP ── */}
      <div className="bg-[#2C2418] px-6 lg:px-16 py-10 flex items-center justify-between">
        <p className="font-serif text-lg text-white">
          Crochet Alif —{" "}
          <em className="not-italic italic text-[#8FAD8D]">Always here for you.</em>
        </p>
        <p className="text-xs text-white/40">© 2025 Crochet Alif. All rights reserved.</p>
      </div>
    </div>
  );
}