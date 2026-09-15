"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

import type {
  Product
} from "@/features/catalog";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  setQuantity: (
    id: string,
    quantity: number
  ) => void;
  clearCart: () => void;
};

const CartContext =
  createContext<CartContextType | null>(
    null
  );

const KEY = "ferreteria-cayo-cart";

export function CartProvider({
  children
}: {
  children: ReactNode;
}) {

  const [items, setItems] =
    useState<CartItem[]>([]);

  const [loaded, setLoaded] =
    useState(false);

  useEffect(() => {
    try {
      const value =
        localStorage.getItem(KEY);

      if (value) {
        setItems(JSON.parse(value));
      }
    } catch {}

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      KEY,
      JSON.stringify(items)
    );
  }, [items, loaded]);

  function addItem(product: Product) {
    if (product.stock <= 0) return;

    setItems((current) => {
      const item =
        current.find(
          (value) =>
            value.product.id === product.id
        );

      if (item) {
        return current.map((value) =>
          value.product.id === product.id
            ? {
                ...value,
                quantity: Math.min(
                  value.quantity + 1,
                  product.stock
                )
              }
            : value
        );
      }

      return [
        ...current,
        {
          product,
          quantity: 1
        }
      ];
    });
  }

  function removeItem(id: string) {
    setItems((current) =>
      current.filter(
        (item) =>
          item.product.id !== id
      )
    );
  }

  function setQuantity(
    id: string,
    quantity: number
  ) {
    setItems((current) =>
      current.map((item) => {
        if (item.product.id !== id) {
          return item;
        }

        return {
          ...item,
          quantity: Math.max(
            1,
            Math.min(
              quantity,
              item.product.stock
            )
          )
        };
      })
    );
  }

  function clearCart() {
    setItems([]);
  }

  const count =
    items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  const subtotal =
    items.reduce(
      (total, item) =>
        total +
        item.product.price *
          item.quantity,
      0
    );

  const value =
    useMemo(
      () => ({
        items,
        count,
        subtotal,
        addItem,
        removeItem,
        setQuantity,
        clearCart
      }),
      [items, count, subtotal]
    );

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart debe utilizarse dentro de CartProvider"
    );
  }

  return context;
}