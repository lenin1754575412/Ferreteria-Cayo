import Link from "next/link";

import { Header } from "@/features/navigation";
import { Footer } from "@/features/layout";
import { PageHero } from "@/shared/ui";

export const metadata = {
  title: "Nosotros | Ferretería Cayo",
  description:
    "Conoce Ferretería Cayo, productos, atención y servicios para tus proyectos.",
};

export default function NosotrosPage() {
  return (
    <>
      <Header />

      <PageHero
        eyebrow="FERRETERÍA CAYO"
        title="Nosotros"
        description="Herramientas, construcción, pintura y ferretería para tus proyectos."
      />

      <main className="wrap info-page">

        <section className="info-intro">

          <span className="eyebrow dark">
            SOBRE NOSOTROS
          </span>

          <h2>
            Todo lo que necesitas para construir, reparar y mejorar
          </h2>

          <p>
            Ferretería Cayo reúne productos para construcción,
            herramientas, pintura, iluminación, seguridad,
            fontanería y mantenimiento.
          </p>

          <p>
            Nuestro catálogo muestra precios, disponibilidad
            y diferentes categorías para ayudarte a encontrar
            rápidamente lo que necesitas.
          </p>

        </section>

        <section className="info-grid">

          <article className="info-card">
            <div className="info-icon">🔧</div>

            <h3>
              Variedad de productos
            </h3>

            <p>
              Herramientas, materiales, pinturas, iluminación,
              fontanería, seguridad y accesorios.
            </p>
          </article>

          <article className="info-card">
            <div className="info-icon">📦</div>

            <h3>
              Stock visible
            </h3>

            <p>
              Consulta la disponibilidad de los productos
              directamente desde nuestro catálogo.
            </p>
          </article>

          <article className="info-card">
            <div className="info-icon">💬</div>

            <h3>
              Atención por WhatsApp
            </h3>

            <p>
              Puedes comunicarte con nosotros para consultar
              productos, precios y disponibilidad.
            </p>
          </article>

          <article className="info-card">
            <div className="info-icon">🚚</div>

            <h3>
              Delivery y recojo
            </h3>

            <p>
              Consulta las opciones disponibles para recibir
              o recoger tus productos.
            </p>
          </article>

        </section>

        <section className="info-contact">

          <div>

            <span>
              ¿Necesitas ayuda?
            </span>

            <h2>
              Estamos para ayudarte
            </h2>

            <p>
              Consulta disponibilidad, precios o productos.
            </p>

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