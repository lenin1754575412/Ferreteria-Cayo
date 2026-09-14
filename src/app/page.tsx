import Link from "next/link";

import {
  Header,
} from "@/features/navigation";

import {
  Footer,
} from "@/features/layout";

import {
  categories,
  categoryImages,
  products,
  slugify,
  CategoryGrid,
  ProductGrid,
  type CategoryGridItem,
} from "@/features/catalog";

export default function Home() {

  const categoryItems: CategoryGridItem[] =
    categories.map(
      (category) => ({
        title: category,
        image: categoryImages[category],
        href:
          `/subcategorias/${slugify(category)}`,
      })
    );

  const featuredOffers =
    products
      .filter(
        (product) =>
          product.oldPrice
      )
      .slice(0, 4);

  return (
    <>

      <Header />

      <section className="hero">

        <div className="hero-overlay">

          <div className="hero-content">

            <span className="eyebrow">
              FERRETERÍA CAYO
            </span>

            <h1>
              Todo para construir,
              <br />

              <strong>
                reparar y mejorar
              </strong>
            </h1>

            <p>
              Herramientas, pintura,
              iluminación, seguridad,
              gasfitería y materiales
              con atención rápida.
            </p>

            <div className="hero-actions">

              <Link
                className="btn btn-yellow"
                href="/productos"
              >
                Ver productos
              </Link>

              <Link
                className="btn btn-outline"
                href="/productos?ofertas=1"
              >
                Ver ofertas
              </Link>

            </div>

          </div>

        </div>

      </section>

      <section className="benefits">

        <div>
          ✓ Precios competitivos
        </div>

        <div>
          ✓ Productos para hogar y obra
        </div>

        <div>
          ✓ Atención por WhatsApp
        </div>

        <div>
          ✓ Catálogo actualizado
        </div>

      </section>

      <main className="wrap">

        <div className="section-head">

          <div>

            <span className="eyebrow dark">
              ENCUENTRA LO QUE NECESITAS
            </span>

            <h2 className="title">
              Categorías principales
            </h2>

          </div>

          <Link href="/productos">
            Ver todo →
          </Link>

        </div>

        <CategoryGrid
          items={categoryItems}
        />

        <div className="section-head deals-head">

          <div>

            <span className="eyebrow dark">
              PRECIOS ESPECIALES
            </span>

            <h2 className="title">
              Ofertas destacadas
            </h2>

          </div>

          <Link href="/productos?ofertas=1">
            Todas las ofertas →
          </Link>

        </div>

        <ProductGrid
          products={featuredOffers}
        />

      </main>

      <Footer />

    </>
  );
}