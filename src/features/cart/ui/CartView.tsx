"use client";

import Link from "next/link";

import {
  Minus,
  Plus,
  Trash2
} from "lucide-react";

import {
  useCart
} from "@/features/cart";

export function CartView() {

  const {
    items,
    subtotal,
    removeItem,
    setQuantity
  } = useCart();

  if (!items.length) {
    return (
      <div className="empty">

        <h2>
          Tu carrito está vacío
        </h2>

        <p>
          Agrega productos para comenzar.
        </p>

        <Link
          href="/productos"
          className="btn"
        >
          Ver productos
        </Link>

      </div>
    );
  }

  return (
    <div className="cart-layout">

      <div className="cart-items">

        {items.map(
          (item) => (
            <article
              key={item.product.id}
              className="cart-item"
            >

              <img
                src={item.product.img}
                alt={item.product.name}
              />

              <div>

                <p className="product-brand">
                  {item.product.brand}
                </p>

                <h3>
                  {item.product.name}
                </h3>

                <p>
                  S/ {item.product.price.toFixed(2)}
                </p>

              </div>

              <div className="qty-control">

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(
                      item.product.id,
                      item.quantity - 1
                    )
                  }
                >
                  <Minus size={15} />
                </button>

                <strong>
                  {item.quantity}
                </strong>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(
                      item.product.id,
                      item.quantity + 1
                    )
                  }
                >
                  <Plus size={15} />
                </button>

              </div>

              <strong>
                S/ {
                  (
                    item.product.price *
                    item.quantity
                  ).toFixed(2)
                }
              </strong>

              <button
                className="remove-button"
                type="button"
                onClick={() =>
                  removeItem(
                    item.product.id
                  )
                }
              >
                <Trash2 size={18} />
              </button>

            </article>
          )
        )}

      </div>

      <aside className="cart-summary">

        <h2>
          Resumen
        </h2>

        <div>
          <span>
            Subtotal
          </span>

          <strong>
            S/ {subtotal.toFixed(2)}
          </strong>
        </div>

        <p>
          El costo de envío se coordina según ubicación.
        </p>

        <Link
          href="/checkout"
          className="btn cart-checkout"
        >
          Finalizar pedido
        </Link>

      </aside>

    </div>
  );
}