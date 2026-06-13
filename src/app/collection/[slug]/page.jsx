"use client"

// ============================================
// app/collection/[slug]/page.jsx
// ============================================
// Simplified page that uses the reusable ProductDetailPage component

import { useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductDetailPage from "@/components/ProductDetail/ProductDetailPage";

export default function CollectionDetailPage() {
  // Note: In Server Components, you get params directly in the component
  // But since ProductDetailPage is a Client Component, we need to pass it
  // This is a thin wrapper that handles the routing
  
  // For Next.js 13+ with app router and dynamic routes:
  return (
    <div className="min-h-screen bg-[#faf8f4] font-sans">
      <Header />
      <ProductDetailPageWrapper />
      <Footer />
    </div>
  );
}

// Client wrapper to handle the slug parameter
function ProductDetailPageWrapper() {
  "use client";
  
  const params = useParams();
  const slug = params?.slug;
  
  return <ProductDetailPage slug={slug} />;
}