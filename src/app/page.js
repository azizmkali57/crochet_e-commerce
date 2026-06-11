import Header from "@/components/layout/Header";
import HeroSection from "@/components/home/heroSection";
import Collections from "@/components/home/collections";
import PieceOfHeart from "@/components/home/pieceOfHeart";
import Bestsellers from "@/components/home/BestSellers";
import Vision from "@/components/home/vision";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />  
      <HeroSection />
      <Collections />
      <PieceOfHeart />
      <Bestsellers />
      <Vision />
      <Footer />
    </main>
  );
} 