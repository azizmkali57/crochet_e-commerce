"use client";

import { PiChatCircleBold, PiScissorsBold, PiTruckBold, PiHeartBold, PiFlowerBold, PiPackageBold } from "react-icons/pi";

export default function YourVision() {
  const steps = [
    { icon: <PiChatCircleBold size={28} />, number: "01", title: "Share Your Idea", desc: "Tell us what you have in mind." },
    { icon: <PiScissorsBold size={28} />, number: "02", title: "We Create", desc: "Our hands bring your idea to life." },
    { icon: <PiTruckBold size={28} />, number: "03", title: "We Deliver", desc: "Delivered to your doorstep with love." },
    { icon: <PiHeartBold size={28} />, number: "04", title: "You Cherish", desc: "Made to be loved, made to last." },
  ];

  const trustItems = [
    { icon: <PiHeartBold size={26} />, title: "100% Handmade", desc: "Made with love and dedication" },
    { icon: <PiFlowerBold size={26} />, title: "Premium Quality", desc: "Finest yarns and materials" },
    { icon: <PiPackageBold size={26} />, title: "Secure Packaging", desc: "Packed with care, delivered safely" },
    { icon: <PiTruckBold size={26} />, title: "Fast & Reliable", desc: "On-time delivery, every time" },
  ];

  return (
    <>
      {/* ── YOUR VISION SECTION ── */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "460px" }}>

        {/* Full-width background image */}
        <img
          src="/images/your_vision1.jpeg"
          alt="Hands crocheting"
          className="absolute inset-0 w-full h-full object-cover object-left"
        />

        {/* Light cream overlay over the whole section */}
        <div
          className="absolute inset-0"
        />

        {/* Content — RIGHT aligned */}
        <div className="relative z-10 w-full min-h-[460px] flex flex-col justify-center items-end px-6 md:px-16 py-16">
          <div className="w-full md:w-[58%] flex flex-col items-left text-left">

            {/* Label */}
            <p
              className="text-[10px] tracking-[0.4em] uppercase font-semibold mb-3"
              style={{ color: "#5a6b50" }}
            >
              Custom Made Just For You
            </p>

            {/* Heading */}
            <h2
              className="font-heading text-[42px] md:text-[52px] leading-tight mb-12"
              style={{ color: "#1a1a1a" }}
            >
              Your Vision,
              <br />
              Our Craft.{" "}
              <span style={{ color: "#3D5938" }}>♥</span>
            </h2>

            {/* 4 Steps — single row */}
            <div className="grid grid-cols-4 gap-6 md:gap-10 w-full">
              {steps.map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2">

                  {/* Icon circle */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.88)",
                      boxShadow: "0 4px 16px rgba(61,89,56,0.13)",
                      color: "#3D5938",
                    }}
                  >
                    {s.icon}
                  </div>

                  {/* Number */}
                  <p className="text-[12px] font-semibold tracking-widest" style={{ color: "#5a6b50" }}>
                    {s.number}
                  </p>

                  {/* Title */}
                  <p className="text-[13px] font-semibold" style={{ color: "#1a1a1a" }}>
                    {s.title}
                  </p>

                  {/* Desc */}
                  <p className="text-[11px] leading-relaxed" style={{ color: "#4a5543" }}>
                    {s.desc}
                  </p>

                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="w-full py-6" style={{ backgroundColor: "#6b7c5a" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
          {trustItems.map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-8 md:px-12 py-3">
              <div className="flex-shrink-0" style={{ color: "rgba(255,255,255,0.7)" }}>
                {item.icon}
              </div>
              <div>
                <p className="font-bold text-[11px] tracking-widest uppercase mb-1 text-white">{item.title}</p>
                <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}