import {
  FiTruck,
  FiPackage,
  FiMapPin,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Shipping & Delivery | Your Brand",
};

const shippingFeatures = [
  {
    icon: <FiTruck size={24} />,
    title: "Express Dispatch",
    desc: "Orders are carefully prepared and dispatched within 1–3 business days.",
  },
  {
    icon: <FiPackage size={24} />,
    title: "Luxury Packaging",
    desc: "Every order arrives beautifully wrapped and protected.",
  },
  {
    icon: <FiMapPin size={24} />,
    title: "Worldwide Delivery",
    desc: "We ship handcrafted collections to customers globally.",
  },
  {
    icon: <FiShield size={24} />,
    title: "Secure Transit",
    desc: "Tracked and insured shipping for complete peace of mind.",
  },
];

const journey = [
  "Order Confirmed",
  "Handcrafted & Quality Checked",
  "Luxury Packaging",
  "Shipped Securely",
  "Delivered To Your Door",
];

export default function ShippingDeliveryPage() {
  return (
    <main className="bg-[#FAF7F1] text-[#1F1F1F] overflow-hidden">

      {/* HERO */}
      <section className="relative py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#D4AF3720,transparent_40%)]" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">

          <div>
            <span className="uppercase tracking-[0.3em] text-[#B28A2E] text-sm">
              Delivered With Care
            </span>

            <h1 className="mt-6 text-6xl md:text-7xl leading-none font-light">
              Shipping &
              <span className="block text-[#B28A2E]">
                Delivery
              </span>
            </h1>

            <p className="mt-8 text-lg text-gray-600 leading-relaxed max-w-xl">
              From our studio to your doorstep, every order is
              carefully packed, protected, and delivered with
              exceptional attention to detail.
            </p>

            <button className="mt-10 bg-[#B28A2E] hover:bg-[#9B7726] transition px-8 py-4 text-white rounded-full flex items-center gap-3">
              Track My Order
              <FiArrowRight />
            </button>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-8 -left-8 bg-white rounded-3xl p-6 shadow-xl">
              <p className="text-[#B28A2E] font-semibold">
                Premium Packaging
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Beautifully wrapped with care.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <span className="text-[#B28A2E] uppercase tracking-[0.25em]">
              Our Promise
            </span>

            <h2 className="text-5xl mt-4 font-light">
              A Premium Delivery Experience
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

            {shippingFeatures.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-xl transition duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#B28A2E]/10 flex items-center justify-center text-[#B28A2E]">
                  {item.icon}
                </div>

                <h3 className="text-xl mt-6 font-medium">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-20">
            <span className="uppercase tracking-[0.3em] text-[#B28A2E]">
              Journey
            </span>

            <h2 className="text-5xl mt-4 font-light">
              From Studio To Doorstep
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-8">

            {journey.map((step, index) => (
              <div
                key={index}
                className="relative text-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#B28A2E] text-white flex items-center justify-center mx-auto text-2xl">
                  {index + 1}
                </div>

                <h3 className="mt-6 font-medium">
                  {step}
                </h3>

                {index !== journey.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-full h-px bg-[#D8C089]" />
                )}
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* PACKAGING */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
              alt=""
              className="rounded-[40px] shadow-2xl"
            />
          </div>

          <div>
            <span className="uppercase tracking-[0.3em] text-[#B28A2E]">
              Luxury Packaging
            </span>

            <h2 className="text-5xl mt-4 font-light">
              Packed Beautifully,
              Protected Perfectly
            </h2>

            <p className="mt-8 text-lg text-gray-600 leading-relaxed">
              Every order is presented with elegant packaging,
              protective materials, and meticulous finishing
              touches that reflect the quality of the collection
              inside.
            </p>

            <ul className="mt-10 space-y-5 text-gray-700">
              <li>✓ Premium gift-style presentation</li>
              <li>✓ Protective transit packaging</li>
              <li>✓ Eco-conscious materials</li>
              <li>✓ Tracking information provided</li>
            </ul>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">

          <div className="bg-[#111111] rounded-[40px] p-14 md:p-20 text-center">

            <span className="uppercase tracking-[0.3em] text-[#D4AF37]">
              Need Assistance?
            </span>

            <h2 className="text-white text-5xl mt-6 font-light">
              Track Your Order Anytime
            </h2>

            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
              Follow your package from dispatch to delivery
              through our dedicated tracking system.
            </p>

            <button className="mt-10 bg-[#D4AF37] text-black px-8 py-4 rounded-full font-medium hover:scale-105 transition">
              Track Order
            </button>

          </div>

        </div>
      </section>
      <Footer />
    </main>
  );
}