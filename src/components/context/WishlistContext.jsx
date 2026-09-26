"use client";

import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("crochet_wishlist");
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load wishlist", e);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("crochet_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist", e);
    }
  }, [wishlist]);

  // Toggle item in Wishlist
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id || item.slug === product.slug);
      if (exists) {
        return prev.filter((item) => (item.id !== product.id && item.slug !== product.slug));
      } else {
        return [...prev, product];
      }
    });
  };

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id || item.slug === product.slug);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (idOrSlug) => {
    setWishlist((prev) => prev.filter((item) => item.id !== idOrSlug && item.slug !== idOrSlug));
  };

  const isInWishlist = (idOrSlug) => {
    return wishlist.some((item) => item.id === idOrSlug || item.slug === idOrSlug);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
