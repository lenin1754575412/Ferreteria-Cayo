import Link from "next/link";
import { Header } from "@/features/navigation";
import { Footer } from "@/features/layout";
import { CarritoClient } from "./CarritoClient";

const categorias = [
  {
    titulo: "Herramientas",
    descripcion:
      "Taladros, martillos, llaves, accesorios y herramientas para cada trabajo.",
    href: "/subcategorias/herramientas-manuales",
    numero: "01",
  },
  {
    titulo: "Construcción",
    descripcion:
      "Materiales, cemento, adhesivos y soluciones para obra y remodelación.",
    href: "/subcategorias/materiales-de-construccion",
    numero: "02",
  },
  {
    titulo: "Pinturas",
    descripcion:
      "Pinturas, colores, rodillos, brochas, selladores y acabados.",
    href: "/subcategorias/pinturas-y-acabados",
    numero: "03",
  },
];

export default function CarritoPage() {
  return (
    <>
      <Header />

      <main className="cayo-cart-page">
        <CarritoClient />

        {/* CATEGORÍAS */}
        <section className="wrap cayo-cart-categories">
          <div className="cayo-cart-section-heading">
            <div>
              <span>EXPLORA FERRETERÍA CAYO</span>
              <h2>¿Qué necesitas hoy?</h2>
            </div>

            <Link href="/productos">
              Ver catálogo completo →
            </Link>
          </div>

          <div className="cayo-cart-category-grid">
            {categorias.map((categoria) => (
              <Link
                key={categoria.titulo}
                href={categoria.href}
                className="cayo-cart-category-card"
              >
                <div className="cayo-cart-category-number">
                  {categoria.numero}
                </div>

                <div>
                  <span>FERRETERÍA CAYO</span>
                  <h3>{categoria.titulo}</h3>
                  <p>{categoria.descripcion}</p>
                </div>

                <div className="cayo-cart-category-link">
                  Explorar categoría
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* AYUDA */}
        <section className="wrap cayo-cart-help-wrap">
          <div className="cayo-cart-help">
            <div>
              <span>¿NECESITAS UNA COTIZACIÓN?</span>

              <h2>También atendemos pedidos por WhatsApp</h2>

              <p>
                Consulta precios, disponibilidad y opciones de
                entrega directamente con Ferretería Cayo.
              </p>
            </div>

            <a
              href="https://wa.me/51992110555"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Ventas
              <span>→</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
