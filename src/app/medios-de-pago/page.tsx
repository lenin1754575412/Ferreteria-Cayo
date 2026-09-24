import Link from "next/link";

import { Header } from "@/features/navigation";
import { Footer } from "@/features/layout";
import { PageHero } from "@/shared/ui";

export const metadata = {
  title: "Medios de pago | Ferretería Cayo",
  description:
    "Información sobre medios de pago disponibles en Ferretería Cayo.",
};

export default function MediosPagoPage() {
  return (
    <>
      <Header />

      <PageHero
        eyebrow="COMPRA SEGURA"
        title="Medios de pago"
        description="Consulta las opciones disponibles antes de confirmar tu pedido."
      />

      <main className="wrap info-page">

        <section className="info-grid">

          <article className="info-card">

            <div className="info-icon">
              💵
            </div>

            <h3>
              Pago coordinado
            </h3>

            <p>
              Confirma con la tienda el medio de pago disponible
              para tu pedido.
            </p>

          </article>

          <article className="info-card">

            <div className="info-icon">
              📱
            </div>

            <h3>
              Consulta por WhatsApp
            </h3>

            <p>
              Antes de realizar un pago, confirma el monto,
              productos y datos directamente con Ferretería Cayo.
            </p>

          </article>

          <article className="info-card">

            <div className="info-icon">
              🧾
            </div>

            <h3>
              Confirma tu pedido
            </h3>

            <p>
              Verifica que los productos, cantidades y precios
              coincidan antes de completar la compra.
            </p>

          </article>

        </section>

        <section className="payment-warning">

          <strong>
            Importante
          </strong>

          <p>
            Utiliza únicamente los medios de pago confirmados
            directamente por Ferretería Cayo.
          </p>

        </section>

        <section className="info-contact">

          <div>

            <span>
              ¿Listo para comprar?
            </span>

            <h2>
              Confirma tu pedido
            </h2>

          </div>

          <Link
            href="https://wa.me/51992110555"
            className="btn"
            target="_blank"
          >
            WhatsApp Ventas
          </Link>

        </section>

      </main>

      <Footer />
    </>
  );
}