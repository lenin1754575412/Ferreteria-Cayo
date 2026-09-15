"use client";

import {
  FormEvent,
  useState
} from "react";

import Link from "next/link";

import {
  useCart
} from "@/features/cart";

import {
  contactConfig
} from "@/features/contact";

export function CheckoutForm() {

  const {
    items,
    subtotal,
    clearCart
  } = useCart();

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [delivery, setDelivery] =
    useState("Delivery");

  const [notes, setNotes] =
    useState("");

  if (!items.length) {
    return (
      <div className="empty">

        <h2>
          Tu carrito está vacío
        </h2>

        <Link
          href="/productos"
          className="btn"
        >
          Ver productos
        </Link>

      </div>
    );
  }

  async function submit(
    event: FormEvent
  ) {
    event.preventDefault();

    const order = {
      id: `CAYO-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "Pendiente",
      customer: {
        name,
        phone,
        address,
        delivery,
        notes
      },
      items,
      total: subtotal
    };

    try {
      await fetch(
        "/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body:
            JSON.stringify(order)
        }
      );
    } catch {}

    const previous =
      JSON.parse(
        localStorage.getItem(
          "cayo-orders"
        ) ?? "[]"
      );

    localStorage.setItem(
      "cayo-orders",
      JSON.stringify([
        order,
        ...previous
      ])
    );

    const products =
      items.map(
        (item) =>
          `• ${item.product.name} x${item.quantity} - S/ ${(item.product.price * item.quantity).toFixed(2)}`
      );

    const text = [
      "Hola Ferretería Cayo, deseo hacer este pedido:",
      "",
      ...products,
      "",
      `TOTAL: S/ ${subtotal.toFixed(2)}`,
      "",
      `Cliente: ${name}`,
      `Teléfono: ${phone}`,
      `Entrega: ${delivery}`,
      `Dirección: ${address || "Por coordinar"}`,
      `Notas: ${notes || "Sin notas"}`
    ].join("\n");

    clearCart();

    window.open(
      `https://wa.me/${contactConfig.phoneWhatsApp}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }

  return (
    <form
      className="checkout-layout"
      onSubmit={submit}
    >

      <section className="checkout-form">

        <h2>
          Datos del cliente
        </h2>

        <label>
          Nombre
        </label>

        <input
          required
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
        />

        <label>
          Teléfono
        </label>

        <input
          required
          type="tel"
          value={phone}
          onChange={(event) =>
            setPhone(event.target.value)
          }
        />

        <label>
          Entrega
        </label>

        <select
          value={delivery}
          onChange={(event) =>
            setDelivery(
              event.target.value
            )
          }
        >
          <option>
            Delivery
          </option>

          <option>
            Recojo en tienda
          </option>
        </select>

        <label>
          Dirección
        </label>

        <input
          value={address}
          onChange={(event) =>
            setAddress(
              event.target.value
            )
          }
        />

        <label>
          Notas
        </label>

        <textarea
          rows={4}
          value={notes}
          onChange={(event) =>
            setNotes(
              event.target.value
            )
          }
        />

      </section>

      <aside className="cart-summary">

        <h2>
          Pedido
        </h2>

        {items.map(
          (item) => (
            <div
              key={item.product.id}
            >
              <span>
                {item.product.name}
                {" "}x{item.quantity}
              </span>

              <strong>
                S/ {
                  (
                    item.product.price *
                    item.quantity
                  ).toFixed(2)
                }
              </strong>
            </div>
          )
        )}

        <div>
          <b>
            TOTAL
          </b>

          <strong>
            S/ {subtotal.toFixed(2)}
          </strong>
        </div>

        <button
          className="btn cart-checkout"
          type="submit"
        >
          Enviar pedido por WhatsApp
        </button>

      </aside>

    </form>
  );
}