"use client";

import Link from "next/link";
import { useCart } from "@/features/cart";
import { CartView } from "@/features/cart/ui/CartView";

export function CarritoClient() {
  const { items, count, subtotal } = useCart();

  return (
    <>
      {/* HERO */}
      <section className="cayo-cart-hero">
        <div className="wrap cayo-cart-hero-inner">
          <div>
            <span className="cayo-cart-eyebrow">
              FERRETERÍA CAYO
            </span>

            <h1>Tu carrito</h1>

            <p>
              Revisa tus productos, cantidades y precios antes de
              continuar con tu compra.
            </p>
          </div>

          <div className="cayo-cart-hero-side">
            <div className="cayo-cart-hero-number">
              {count}
            </div>

            <div>
              <strong>Productos</strong>
              <span>agregados al carrito</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <section className="wrap cayo-cart-main">
        {items.length ? (
          <div className="cayo-cart-items">
            <CartView />
          </div>
        ) : (
          <div className="cayo-cart-empty">
            <div className="cayo-cart-empty-icon">
              <svg
                viewBox="0 0 64 64"
                width="78"
                height="78"
                aria-hidden="true"
              >
                <path
                  d="M8 11h7l6.2 27.2a5 5 0 0 0 4.9 3.8h23.5a5 5 0 0 0 4.8-3.6L59 21H19"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="27" cy="51" r="4" fill="currentColor" />
                <circle cx="49" cy="51" r="4" fill="currentColor" />
              </svg>
            </div>

            <span className="cayo-cart-empty-label">
              TU CARRITO ESTÁ ESPERANDO
            </span>

            <h2>Tu carrito está vacío</h2>

            <p>
              Todavía no agregaste productos. Explora nuestro catálogo
              y encuentra herramientas, materiales de construcción,
              pinturas y mucho más.
            </p>

            <div className="cayo-cart-empty-actions">
              <Link
                href="/productos"
                className="cayo-cart-primary-button"
              >
                Explorar productos
                <span>→</span>
              </Link>

              <Link
                href="/promociones"
                className="cayo-cart-secondary-button"
              >
                Ver ofertas
              </Link>
            </div>

            <div className="cayo-cart-trust">
              <div>
                <strong>Compra fácil</strong>
                <span>Agrega tus productos en pocos pasos.</span>
              </div>

              <div>
                <strong>Atención personalizada</strong>
                <span>Te ayudamos con tus dudas y pedidos.</span>
              </div>

              <div>
                <strong>Stock disponible</strong>
                <span>Consulta disponibilidad antes de comprar.</span>
              </div>
            </div>
          </div>
        )}

        {/* RESUMEN */}
        <aside className="cayo-cart-summary">
          <div className="cayo-cart-summary-head">
            <div>
              <span>RESUMEN</span>
              <h3>Tu pedido</h3>
            </div>

            <div className="cayo-cart-summary-count">
              {count}
            </div>
          </div>

          <div className="cayo-cart-summary-line">
            <span>Productos</span>
            <strong>{count}</strong>
          </div>

          <div className="cayo-cart-summary-line">
            <span>Subtotal</span>
            <strong>S/ {subtotal.toFixed(2)}</strong>
          </div>

          <div className="cayo-cart-summary-line">
            <span>Delivery</span>
            <strong>Por coordinar</strong>
          </div>

          <div className="cayo-cart-summary-total">
            <div>
              <span>Total estimado</span>
              <small>Sin incluir delivery</small>
            </div>

            <strong>S/ {subtotal.toFixed(2)}</strong>
          </div>

          <Link
            href={items.length ? "/checkout" : "/productos"}
            className="cayo-cart-summary-button"
          >
            {items.length ? "Continuar con el pedido" : "Empezar mi compra"}
          </Link>


          <a


            href="https://wa.me/51992110555"
          target="_blank"
          rel="noreferrer"
          className="cayo-cart-whatsapp"
            >
          ¿Necesitas ayuda? Escríbenos
        </a>

        <p className="cayo-cart-summary-info">
          Cuando agregues productos, aquí aparecerán las
          cantidades, subtotales y el total de tu pedido.
        </p>
      </aside>
    </section >
    </>
  );
}

