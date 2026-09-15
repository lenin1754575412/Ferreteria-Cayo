"use client";

import {
  useCart
} from "@/features/cart";

export function CartIndicator() {
  const {
    count
  } = useCart();

  return (
    <span className="cart">
      {count}
    </span>
  );
}