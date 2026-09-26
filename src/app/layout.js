import { CartProvider } from "@/components/context/CartContext";
import { WishlistProvider } from "@/components/context/WishlistContext";
import AuthProvider from "@/components/providers/AuthProvider";
import "./globals.css";

export const metadata = {
  title: "Crochet By Alif",
  description: "Timeless crochet creations, thoughtfully handcrafted.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ colorScheme: "light", backgroundColor: "#F5F1E8" }}>
      <body style={{ backgroundColor: "#F5F1E8" }}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>{children}</WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}