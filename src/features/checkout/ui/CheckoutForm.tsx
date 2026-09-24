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

  const [error, setError] =
    useState("");

  const [sending, setSending] =
    useState(false);

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
    if (sending) return;

    setError("");
    setSending(true);

    // Se abre antes del await para que el navegador no la bloquee como popup
    const waWindow = window.open("", "_blank");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name, phone, address, delivery, notes },
          items: items.map((item) => ({
            product: { id: item.product.id, slug: item.product.slug },
            quantity: item.quantity
          }))
        })
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        waWindow?.close();
        setError(data?.error ?? "No se pudo registrar el pedido. Intenta de nuevo.");
        return;
      }

      const order = {
        id: data.orderId,
        createdAt: new Date().toISOString(),
        status: "Pendiente",
        customer: { name, phone, address, delivery, notes },
        items,
        total: data.total
      };

      try {
        const previous = JSON.parse(localStorage.getItem("cayo-orders") ?? "[]");
        localStorage.setItem("cayo-orders", JSON.stringify([order, ...previous]));
      } catch {}

      const products = items.map(
        (item) =>
          `• ${item.product.name} x${item.quantity} - S/ ${(item.product.price * item.quantity).toFixed(2)}`
      );

      const text = [
        "Hola Ferretería Cayo, deseo hacer este pedido:",
        `Código: ${data.orderId}`,
        "",
        ...products,
        "",
        `TOTAL: S/ ${Number(data.total).toFixed(2)}`,
        "",
        `Cliente: ${name}`,
        `Teléfono: ${phone}`,
        `Entrega: ${delivery}`,
        `Dirección: ${address || "Por coordinar"}`,
        `Notas: ${notes || "Sin notas"}`
      ].join("\n");

      const url = `https://wa.me/${contactConfig.phoneWhatsApp}?text=${encodeURIComponent(text)}`;

      clearCart();

      if (waWindow) {
        waWindow.location.href = url;
      } else {
        window.location.href = url;
      }
    } catch {
      waWindow?.close();
      setError("Error de conexión. Revisa tu internet e intenta de nuevo.");
    } finally {
      setSending(false);
    }
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

        {error && (
          <p
            role="alert"
            style={{ color: "#c62828", fontWeight: 600, margin: "8px 0" }}
          >
            {error}
          </p>
        )}

        <button
          className="btn cart-checkout"
          type="submit"
          disabled={sending}
        >
          {sending ? "Registrando pedido..." : "Enviar pedido por WhatsApp"}
        </button>

      </aside>

    </form>
  );
}
