"use client";

import Image from "next/image";
import {
  FiArrowRight,
  FiHeart,
  FiAward,
} from "react-icons/fi";
import Header from "@/components/layout/Header";

export default function AboutPage() {
  const timeline = [
    {
      year: "2022",
      title: "The Beginning",
      desc: "Crochet Alif started with a crochet hook, yarn and a passion for creating handmade pieces.",
    },
    {
      year: "2023",
      title: "First 100 Orders",
      desc: "Our creations found homes across the country and became part of people's stories.",
    },
    {
      year: "2024",
      title: "Custom Creations",
      desc: "We expanded into personalized crochet pieces tailored to each customer.",
    },
    {
      year: "2025",
      title: "Growing Worldwide",
      desc: "Crochet Alif now reaches handmade lovers around the globe.",
    },
  ];

  return (
    <main className="bg-[#F8F5EF] overflow-hidden">
        <Header />

      {/* ================= HERO ================= */}

      <section className="relative min-h-screen flex items-center">

        <div className="absolute i z-10" />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('/images/about_sction.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-20 w-full">

          <div className="max-w-3xl">

            <span className="uppercase tracking-[4px] text-[#6A7C58] text-sm">
              Handmade With Love
            </span>

            <h1 className="mt-6 text-6xl lg:text-8xl font-serif text-[#2D2419] leading-[1.05]">
              Every Stitch
              <br />
              Has A
              <span className="italic text-[#56714F]">
                {" "}
                Story
              </span>
            </h1>

            <p className="mt-8 text-lg text-[#5F5549] leading-relaxed max-w-xl">
              Crochet Alif is more than a handmade brand.
              Every piece carries patience, creativity,
              and countless hours of craftsmanship.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <a
                href="/collection"
                className="px-8 py-4 rounded-full bg-[#3D5C3B] text-white flex items-center gap-2 hover:scale-105 transition"
              >
                Explore Collection
                <FiArrowRight />
              </a>

              <a
                href="/contact"
                className="px-8 py-4 rounded-full border border-[#3D5C3B] text-[#3D5C3B]"
              >
                Custom Order
              </a>

            </div>

          </div>

        </div>


      </section>
{/* ================= STORY ================= */}

<section className="py-20 lg:py-24">

  <div className="max-w-7xl mx-auto px-6 lg:px-16">

   <div className="grid lg:grid-cols-2 gap-16 items-center">
      {/* TEXT */}

      <div className="max-w-xl">

        <span className="uppercase tracking-[3px] text-[#56714F] text-sm">
          Our Story
        </span>

        <h2 className="mt-4 text-5xl lg:text-6xl font-serif text-[#2D2419] leading-[1.05]">
          From Passion
          <br />
          To Purpose
        </h2>

        <p className="mt-8 text-[#5F5549] text-lg leading-8">
          Crochet Alif began in a quiet corner of home.
          What started as a creative escape quickly
          turned into something meaningful.
        </p>

        <p className="mt-5 text-[#5F5549] text-lg leading-8">
          Each creation became more than yarn and
          stitches. It became a memory, a gift,
          and a piece of art carrying emotion.
        </p>

        <p className="mt-5 text-[#5F5549] text-lg leading-8">
          Today, our mission remains unchanged:
          create handmade treasures that bring
          warmth and happiness into everyday life.
        </p>

      </div>

      {/* IMAGE */}

      <div className="relative">

        <div className="h-[500px] lg:h-[550px] rounded-[40px] w-[200px] lg:w-[300px] overflow-hidden shadow-lg">

          <Image
            src="/images/about_story.png"
            alt="story"
            fill
            className="object-cover"
            priority
          />

        </div>

      </div>

    </div>

  </div>

</section>

      {/* ================= FOUNDER LETTER ================= */}

      <section className="bg-[#3D5C3B] py-32">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <span className="uppercase tracking-[3px] text-[#C9D7B2]">
            A Letter From The Founder
          </span>

          <h2 className="mt-5 text-5xl text-white font-serif">
            Dear Friend,
          </h2>

          <div className="max-w-3xl mx-auto mt-12">

            <p className="text-white/80 text-lg leading-loose">
              Thank you for being here.
            </p>

            <p className="mt-6 text-white/80 text-lg leading-loose">
              Crochet Alif started with a simple crochet
              hook, a ball of yarn, and a dream to create
              something meaningful.
            </p>

            <p className="mt-6 text-white/80 text-lg leading-loose">
              Every piece you receive has been touched by
              my hands and crafted with patience, care,
              and love.
            </p>

            <p className="mt-6 text-white/80 text-lg leading-loose">
              Thank you for supporting handmade artistry.
              Your support helps keep this beautiful craft
              alive.
            </p>

            <h3 className="mt-12 text-[#C9D7B2] text-4xl italic font-serif">
              — Alif
            </h3>

          </div>

        </div>

      </section>

      {/* ================= TIMELINE ================= */}

      <section className="py-32">

        <div className="max-w-7xl mx-auto px-6 lg:px-16">

          <div className="text-center">

            <span className="uppercase tracking-[3px] text-[#56714F] text-sm">
              Our Journey
            </span>

            <h2 className="mt-4 text-5xl font-serif text-[#2D2419]">
              Milestones That
              <br />
              Shaped Us
            </h2>

          </div>

         <div className="mt-16 space-y-10">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="grid lg:grid-cols-[150px_1fr] gap-10 border-b border-[#ddd] pb-10"
              >
                <h3 className="text-5xl font-serif text-[#56714F]">
                  {item.year}
                </h3>

                <div>
                  <h4 className="text-2xl font-serif text-[#2D2419]">
                    {item.title}
                  </h4>

                  <p className="mt-3 text-[#5F5549]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ================= GALLERY ================= */}

      <section className="pb-32">

        <div className="max-w-7xl mx-auto px-6 lg:px-16">

          <div className="text-center">

            <span className="uppercase tracking-[3px] text-[#56714F] text-sm">
              Behind The Stitches
            </span>

            <h2 className="mt-4 text-5xl font-serif text-[#2D2419]">
              Moments From
              <br />
              Our Crafting Journey
            </h2>

          </div>

     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">

  {[1, 2, 3, 4].map((item) => (
    <div
      key={item}
      className="relative aspect-[3/4] rounded-[30px] overflow-hidden"
    >
      <Image
        src={`/images/stich_0${item}.png`}
        alt={`Moment ${item}`}
        fill
        className="object-fill transition-transform duration-300 hover:scale-105"
      />
    </div>
  ))}

</div>

        </div>

      </section>
            {/* ================= VALUES ================= */}

      <section className="bg-white py-32">

        <div className="max-w-7xl mx-auto px-6 lg:px-16">

          <div className="text-center">

            <span className="uppercase tracking-[3px] text-[#56714F] text-sm">
              Our Values
            </span>

            <h2 className="mt-4 text-5xl font-serif text-[#2D2419]">
              What Makes
              <br />
              Crochet Alif Different
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

            {[
              {
                icon: <FiHeart size={26} />,
                title: "Made With Love",
                desc: "Every piece is handcrafted with care and passion."
              },
              {
                icon: <FiAward size={26} />,
                title: "Premium Quality",
                desc: "Only carefully selected materials make it into our creations."
              },
              {
                icon: <FiHeart size={26} />,
                title: "Unique Designs",
                desc: "Every creation carries a personality of its own."
              },
              {
                icon: <FiAward size={26} />,
                title: "Customer First",
                desc: "Your satisfaction is at the heart of everything we do."
              }
            ].map((item, index) => (
              <div
                key={index}
                className="p-8 rounded-[30px] border border-[#E5DED2] hover:shadow-xl transition-all duration-300"
              >

                <div className="w-14 h-14 rounded-full bg-[#F8F5EF] flex items-center justify-center text-[#56714F]">
                  {item.icon}
                </div>

                <h3 className="mt-6 text-2xl font-serif text-[#2D2419]">
                  {item.title}
                </h3>

                <p className="mt-4 text-[#5F5549] leading-relaxed">
                  {item.desc}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ================= TESTIMONIALS ================= */}

      <section className="py-32 bg-[#F8F5EF]">

        <div className="max-w-7xl mx-auto px-6 lg:px-16">

          <div className="text-center">

            <span className="uppercase tracking-[3px] text-[#56714F] text-sm">
              Customer Love
            </span>

            <h2 className="mt-4 text-5xl font-serif text-[#2D2419]">
              Words From
              <br />
              Our Customers
            </h2>

          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-20">

            {[
              {
                name: "Sarah",
                text: "The attention to detail was absolutely incredible. Every stitch felt perfect."
              },
              {
                name: "Fatima",
                text: "Exactly what I imagined. Beautiful quality and amazing craftsmanship."
              },
              {
                name: "Aisha",
                text: "The packaging, quality and handmade touch made it feel truly special."
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[30px] p-10 shadow-sm"
              >

                <div className="text-[#F0B429] text-xl">
                  ★★★★★
                </div>

                <p className="mt-6 text-[#5F5549] leading-loose">
                  "{item.text}"
                </p>

                <h4 className="mt-8 text-xl font-serif text-[#2D2419]">
                  — {item.name}
                </h4>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ================= PROCESS ================= */}

      <section className="py-32 bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-16">

          <div className="text-center">

            <span className="uppercase tracking-[3px] text-[#56714F] text-sm">
              Our Process
            </span>

            <h2 className="mt-4 text-5xl font-serif text-[#2D2419]">
              From Yarn To
              <br />
              Your Doorstep
            </h2>

          </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
            {[
              "Choose Design",
              "Handcrafting",
              "Quality Check",
              "Delivered"
            ].map((step, index) => (
              <div key={index} className="text-center">

                <div className="w-24 h-24 rounded-full border-2 border-[#56714F] flex items-center justify-center mx-auto">
                  <span className="text-3xl font-serif text-[#56714F]">
                    {index + 1}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-serif text-[#2D2419]">
                  {step}
                </h3>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="bg-[#3D5C3B] py-32">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <span className="uppercase tracking-[3px] text-[#C9D7B2]">
            Start Your Handmade Journey
          </span>

          <h2 className="mt-6 text-5xl lg:text-6xl font-serif text-white leading-tight">
            Ready To Own
            <br />
            Something Truly Handmade?
          </h2>

          <p className="mt-8 text-white/70 max-w-2xl mx-auto leading-loose">
            Explore our handcrafted collections or let us create
            something uniquely yours through a custom order.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-12">

            <a
              href="/collection"
              className="px-8 py-4 rounded-full bg-white text-[#3D5C3B] font-medium hover:scale-105 transition"
            >
              Shop Collection
            </a>

            <a
              href="/contact"
              className="px-8 py-4 rounded-full border border-white text-white"
            >
              Custom Order
            </a>

          </div>

        </div>
          </section>
    </main>
  );
}