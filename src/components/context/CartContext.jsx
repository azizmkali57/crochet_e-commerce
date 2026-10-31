"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

// Helper to generate a unique key for cart items considering color variant
const getItemKey = (id, selectedColor) => `${id}_${selectedColor || "default"}`;

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to parse cart from localStorage:", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage whenever cart changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem("cart", JSON.stringify(cart));
      } catch (e) {
        console.error("Failed to save cart to localStorage:", e);
      }
    }
  }, [cart, isHydrated]);

  // ADD ITEM (with support for custom quantity & color variants)
  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return;

    const itemKey = getItemKey(product.id, product.selectedColor);
    const qtyToAdd = Math.max(1, Number(quantity) || 1);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => getItemKey(item.id, item.selectedColor) === itemKey
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const currentItem = updated[existingIndex];
        const maxStock = currentItem.stockCount ?? product.stockCount ?? 99;
        const newQty = Math.min(maxStock, currentItem.qty + qtyToAdd);

        updated[existingIndex] = {
          ...currentItem,
          qty: newQty,
          price: Number(product.price) || currentItem.price,
          image: product.image || currentItem.image,
          name: product.name || currentItem.name,
          slug: product.slug || currentItem.slug,
          stockCount: maxStock,
        };
        return updated;
      }

      const maxStock = product.stockCount ?? 99;
      const initialQty = Math.min(maxStock, qtyToAdd);

      return [
        ...prev,
        {
          id: product.id,
          cartKey: itemKey,
          slug: product.slug || "",
          name: product.name || "Handcrafted Crochet Piece",
          price: Number(product.price) || 0,
          image: product.image || "/images/Granny_Sweater.png",
          selectedColor: product.selectedColor || null,
          qty: initialQty,
          stockCount: maxStock,
        },
      ];
    });
  };

  // REMOVE ITEM (by itemKey or id)
  const removeFromCart = (id, selectedColor = null) => {
    const targetKey = getItemKey(id, selectedColor);
    setCart((prev) =>
      prev.filter((item) => {
        const itemKey = item.cartKey || getItemKey(item.id, item.selectedColor);
        return itemKey !== targetKey && item.id !== id;
      })
    );
  };

  // CLEAR ALL
  const clearCart = () => {
    setCart([]);
  };

  // INCREASE QTY
  const increaseQty = (id, selectedColor = null) => {
    const targetKey = getItemKey(id, selectedColor);
    setCart((prev) =>
      prev.map((item) => {
        const itemKey = item.cartKey || getItemKey(item.id, item.selectedColor);
        if (itemKey === targetKey || item.id === id) {
          const maxStock = item.stockCount ?? 99;
          const nextQty = item.qty < maxStock ? item.qty + 1 : item.qty;
          return { ...item, qty: nextQty };
        }
        return item;
      })
    );
  };

  // DECREASE QTY
  const decreaseQty = (id, selectedColor = null) => {
    const targetKey = getItemKey(id, selectedColor);
    setCart((prev) =>
      prev
        .map((item) => {
          const itemKey = item.cartKey || getItemKey(item.id, item.selectedColor);
          if (itemKey === targetKey || item.id === id) {
            return { ...item, qty: item.qty - 1 };
          }
          return item;
        })
        .filter((item) => item.qty > 0)
    );
  };

  // DIRECT UPDATE QTY
  const updateQty = (id, selectedColor = null, newQty = 1) => {
    const targetKey = getItemKey(id, selectedColor);
    const validQty = Math.max(0, Number(newQty) || 0);

    if (validQty === 0) {
      removeFromCart(id, selectedColor);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        const itemKey = item.cartKey || getItemKey(item.id, item.selectedColor);
        if (itemKey === targetKey || item.id === id) {
          const maxStock = item.stockCount ?? 99;
          return { ...item, qty: Math.min(maxStock, validQty) };
        }
        return item;
      })
    );
  };

  const cartCount = cart.reduce((acc, item) => acc + (Number(item.qty) || 0), 0);

  const cartTotal = cart.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.qty) || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isHydrated,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        updateQty,
        cartCount,
        cartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);