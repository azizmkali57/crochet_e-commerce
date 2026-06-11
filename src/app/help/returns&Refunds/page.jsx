import {
  FiRefreshCw,
  FiCheckCircle,
  FiXCircle,
  FiArrowRight,
  FiHeart,
  FiMail,
} from "react-icons/fi";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Returns & Refunds | Crochet Alif",
  description:
    "Learn about our return and refund policy for handmade crochet creations.",
};

const eligibleItems = [
  "Damaged products during delivery",
  "Incorrect item received",
  "Manufacturing defects",
  "Missing products in package",
];

const nonEligibleItems = [
  "Custom-made orders",
  "Personalized products",
  "Used or washed items",
  "Products damaged after delivery",
];

const steps = [
  {
    number: "01",
    title: "Submit Request",
    desc: "Contact us within 7 days of delivery and share your order details.",
  },
  {
    number: "02",
    title: "Review & Approval",
    desc: "Our team carefully reviews your request and guides you further.",
  },
  {
    number: "03",
    title: "Refund Processed",
    desc: "Once approved, your refund is initiated to the original payment method.",
  },
];

export default function ReturnsRefundsPage() {
  return (
    <main className="bg-cream min-h-screen">

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>
              <span
                className="uppercase tracking-[4px] text-xs font-medium"
                style={{ color: "#3D5938" }}
              >
                Customer Happiness First
              </span>

              <h1
                className="font-heading text-5xl md:text-7xl mt-4 leading-tight"
                style={{ color: "#3D5938" }}
              >
                Returns &
                <br />
                Refunds
              </h1>

              <p className="text-warm text-lg mt-6 max-w-xl leading-relaxed">
                Every Crochet Alif creation is handmade with love and attention.
                If something isn't right with your order, we're here to make it
                right with a simple and transparent return process.
              </p>

              <button
                className="mt-8 flex items-center gap-3 px-6 py-3 rounded-full text-white transition hover:opacity-90"
                style={{ backgroundColor: "#3D5938" }}
              >
                Contact Support
                <FiArrowRight />
              </button>
            </div>

            <div>
              <div className="bg-white rounded-[40px] shadow-soft p-8 md:p-10">

                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: "#F2F0EA",
                    }}
                  >
                    <FiHeart
                      size={22}
                      style={{ color: "#3D5938" }}
                    />
                  </div>

                  <div>
                    <h3
                      className="font-semibold"
                      style={{ color: "#3D5938" }}
                    >
                      Our Promise
                    </h3>

                    <p className="text-sm text-warm">
                      Handmade quality you can trust.
                    </p>
                  </div>
                </div>

                <p className="text-warm leading-relaxed">
                  We carefully inspect every product before shipping.
                  In the rare event that your order arrives damaged
                  or incorrect, we'll work quickly to resolve it.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RETURN PROCESS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="text-center mb-14">
            <h2
              className="font-heading text-4xl md:text-5xl"
              style={{ color: "#3D5938" }}
            >
              Simple Return Process
            </h2>

            <p className="text-warm mt-4">
              We've kept things easy and stress-free.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-[32px] shadow-soft p-8 hover:-translate-y-1 transition"
              >
                <div
                  className="text-4xl font-bold mb-4"
                  style={{ color: "#D7C8B6" }}
                >
                  {step.number}
                </div>

                <h3
                  className="font-semibold text-xl mb-3"
                  style={{ color: "#3D5938" }}
                >
                  {step.title}
                </h3>

                <p className="text-warm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="grid lg:grid-cols-2 gap-8">

            {/* ELIGIBLE */}
            <div className="bg-white rounded-[36px] p-8 shadow-soft">
              <h3
                className="text-2xl font-semibold mb-6"
                style={{ color: "#3D5938" }}
              >
                Eligible For Return
              </h3>

              <div className="space-y-4">
                {eligibleItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <FiCheckCircle
                      className="mt-1"
                      style={{ color: "#3D5938" }}
                    />

                    <p className="text-warm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* NON ELIGIBLE */}
            <div className="bg-white rounded-[36px] p-8 shadow-soft">
              <h3
                className="text-2xl font-semibold mb-6"
                style={{ color: "#3D5938" }}
              >
                Not Eligible
              </h3>

              <div className="space-y-4">
                {nonEligibleItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <FiXCircle
                      className="mt-1 text-red-400"
                    />

                    <p className="text-warm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* REFUND TIMELINE */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">

          <div className="bg-white rounded-[40px] shadow-soft p-10 md:p-14">

            <h2
              className="font-heading text-4xl text-center mb-12"
              style={{ color: "#3D5938" }}
            >
              Refund Timeline
            </h2>

            <div className="grid md:grid-cols-4 gap-6 text-center">

              {[
                "Request Submitted",
                "Review & Approval",
                "Refund Initiated",
                "Amount Credited",
              ].map((item, index) => (
                <div key={index}>
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto text-white font-bold"
                    style={{ backgroundColor: "#3D5938" }}
                  >
                    {index + 1}
                  </div>

                  <p className="mt-4 text-warm text-sm">
                    {item}
                  </p>
                </div>
              ))}

            </div>

            <p className="text-center text-warm mt-10">
              Refunds usually appear within 5–7 business days,
              depending on your payment provider.
            </p>

          </div>
        </div>
      </section>

      {/* SUPPORT CTA */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">

          <div
            className="rounded-[40px] p-10 md:p-16 text-center"
            style={{
              background:
                "linear-gradient(135deg,#F7F3EC 0%,#F0EBE3 100%)",
            }}
          >
            <h2
              className="font-heading text-4xl md:text-5xl"
              style={{ color: "#3D5938" }}
            >
              Need Assistance?
            </h2>

            <p className="text-warm mt-5 max-w-2xl mx-auto">
              Our team is always happy to help with returns,
              exchanges, order concerns, and product questions.
            </p>

            <button
              className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full text-white"
              style={{ backgroundColor: "#3D5938" }}
            >
              <FiMail />
              Contact Support
            </button>
          </div>

        </div>
      </section>
      <Footer />
    </main>
  );
}