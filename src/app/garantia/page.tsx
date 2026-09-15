import Link from "next/link";

import { Header } from "@/features/navigation";
import { Footer } from "@/features/layout";
import { PageHero } from "@/shared/ui";

export const metadata = {
  title: "Garantía | Ferretería Cayo",
  description:
    "Información general sobre garantías de productos en Ferretería Cayo.",
};

export default function GarantiaPage() {
  return (
    <>
      <Header />

      <PageHero
        eyebrow="INFORMACIÓN"
        title="Garantía"
        description="Información general para compras y productos."
      />

      <main className="wrap info-page">

        <section className="info-grid">

          <article className="info-card">

            <div className="info-icon">
              ✅
            </div>

            <h3>
              Revisa tu producto
            </h3>

            <p>
              Comprueba el estado y características del producto
              al momento de recibirlo.
            </p>

          </article>

          <article className="info-card">

            <div className="info-icon">
              🧾
            </div>

            <h3>
              Conserva tu comprobante
            </h3>

            <p>
              Guarda la información relacionada con tu compra
              para cualquier consulta posterior.
            </p>

          </article>

          <article className="info-card">

            <div className="info-icon">
              🛠️
            </div>

            <h3>
              Garantía del fabricante
            </h3>

            <p>
              La cobertura y duración pueden variar según
              el producto y las condiciones del fabricante.
            </p>

          </article>

        </section>

        <section className="payment-warning">

          <strong>
            Antes de solicitar atención
          </strong>

          <p>
            Comunícate con la tienda indicando el producto,
            la fecha de compra y el inconveniente encontrado.
          </p>

        </section>

        <section className="info-contact">

          <div>

            <span>
              ¿Necesitas atención?
            </span>

            <h2>
              Contáctanos
            </h2>

          </div>

          <Link
            href="/contacto"
            className="btn"
          >
            Ir a contacto
          </Link>

        </section>

      </main>

      <Footer />
    </>
  );
}