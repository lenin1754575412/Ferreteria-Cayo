"use client";

import {
  ShoppingCart
} from "lucide-react";

import {
  useCart
} from "@/features/cart";

import type {
  Product
} from "@/features/catalog";

export function AddToCartButton({
  product
}: {
  product: Product;
}) {

  const {
    addItem
  } = useCart();

  return (
    <button
      className="btn product-btn"
      disabled={product.stock <= 0}
      onClick={() => addItem(product)}
      type="button"
    >
      <ShoppingCart size={16} />

      {product.stock > 0
        ? "Agregar al carrito"
        : "Agotado"}
    </button>
  );
}