"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/features/cart";

export function CartView() {
  const {
    items,
    removeItem,
    setQuantity
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-empty-fixed">
        <h2>Tu carrito está vacío</h2>
        <p>Agrega productos para comenzar tu pedido.</p>

        <Link href="/productos" className="btn">
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-products-fixed">
      {items.map(({ product, quantity }) => (
        <article
          key={product.id}
          className="cart-product-fixed"
        >
          <img
            src={product.img}
            alt={product.name}
            className="cart-product-fixed-image"
          />

          <div className="cart-product-fixed-info">
            <span className="cart-product-fixed-brand">
              {product.brand}
            </span>

            <strong>
              {product.name}
            </strong>

            <span>
              S/ {product.price.toFixed(2)}
            </span>
          </div>

          <div className="cart-product-fixed-quantity">
            <button
              type="button"
              disabled={quantity <= 1}
              onClick={() =>
                setQuantity(
                  product.id,
                  quantity - 1
                )
              }
            >
              <Minus size={16} />
            </button>

            <span>{quantity}</span>

            <button
              type="button"
              disabled={quantity >= product.stock}
              onClick={() =>
                setQuantity(
                  product.id,
                  quantity + 1
                )
              }
            >
              <Plus size={16} />
            </button>
          </div>

          <strong className="cart-product-fixed-total">
            S/ {(product.price * quantity).toFixed(2)}
          </strong>

          <button
            type="button"
            className="cart-product-fixed-delete"
            onClick={() => removeItem(product.id)}
            aria-label="Eliminar producto"
          >
            <Trash2 size={18} />
          </button>
        </article>
      ))}
    </div>
  );
}
