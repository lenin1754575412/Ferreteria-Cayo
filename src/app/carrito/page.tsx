import Link from "next/link";
import { Header } from "@/features/navigation";
import { Footer } from "@/features/layout";

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
                0
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

          {/* RESUMEN */}
          <aside className="cayo-cart-summary">
            <div className="cayo-cart-summary-head">
              <div>
                <span>RESUMEN</span>
                <h3>Tu pedido</h3>
              </div>

              <div className="cayo-cart-summary-count">
                0
              </div>
            </div>

            <div className="cayo-cart-summary-line">
              <span>Productos</span>
              <strong>0</strong>
            </div>

            <div className="cayo-cart-summary-line">
              <span>Subtotal</span>
              <strong>S/ 0.00</strong>
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

              <strong>S/ 0.00</strong>
            </div>

            <Link
              href="/productos"
              className="cayo-cart-summary-button"
            >
              Empezar mi compra
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
        </section>

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
