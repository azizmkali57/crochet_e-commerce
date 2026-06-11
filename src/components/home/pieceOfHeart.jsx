"use client";

import { FiArrowRight } from "react-icons/fi";

export default function PieceOfHeart() {
  return (
    <section className="relative overflow-hidden h-[560px] lg:h-[620px]">

      {/* Background Image */}
      <img
        src="/images/its_a_piece.png"
        alt="Handmade crochet bags"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          object-right
          select-none
          pointer-events-none
        "
        draggable={false}
      />

      {/* Content Layer */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 md:px-16">

        <div className="h-full flex items-center justify-self-start">

          <div className="max-w-[470px] ml-[8%] lg:ml-[12%]">

            {/* Label */}
            <p className="text-[11px] tracking-[0.35em] font-semibold uppercase text-[#8A9580] mb-4">
              More Than Just Crochet
            </p>

            {/* Heading */}
            <h2 className="font-heading text-5xl lg:text-[64px] leading-[1.05] text-[#151B2F] mb-6">
              It's a piece of <br />

              <span className="italic font-script text-[#3D5938]">
                heart.
              </span>

              <span className="text-pink-400 ml-2">♥</span>
            </h2>

            {/* Description */}
            <p className="text-[15px] lg:text-base leading-[1.9] text-[#6B7565] mb-8">
              Every piece we create carries a part of our heart and hours of
              dedication. From the smallest stitch to the final touch, we
              ensure quality that lasts and designs that speak to your soul.
            </p>

            {/* Button */}
            <button
              className="
                flex
                items-center
                gap-3
                px-6
                py-3
                rounded-full
                transition-all
                duration-300
                hover:scale-[1.03]
              "
              style={{
                backgroundColor: "#D4DDC8",
                color: "#3D5938",
              }}
            >
              <span className="font-semibold text-sm">
                Our Story
              </span>

              <span
                className="
                  w-7
                  h-7
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
                style={{
                  backgroundColor: "#3D5938",
                  color: "#fff",
                }}
              >
                <FiArrowRight size={12} />
              </span>
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}