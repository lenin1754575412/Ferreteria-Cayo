import Link from "next/link";

import {
  Header
} from "@/features/navigation";

import {
  Footer
} from "@/features/layout";

import {
  categories,
  categoryImages,
  slugify,
  CategoryGrid,
  ProductGrid,
  type CategoryGridItem
} from "@/features/catalog";

import {
  getCatalogProducts
} from "@/features/catalog/server/product.repository";

export default async function Home() {

  const products =
    await getCatalogProducts();

  const categoryItems:
    CategoryGridItem[] =
    categories.map(
      (category) => ({
        title: category,
        image:
          categoryImages[category],
        href:
          `/subcategorias/${slugify(category)}`
      })
    );

  const offers =
    products
      .filter(
        (product) =>
          Boolean(product.oldPrice)
      )
      .slice(0, 4);

  const featured =
    products
      .filter(
        (product) =>
          product.featured
      )
      .slice(0, 4);

  return (
    <>
      <Header />

      <section className="hero">

        <div className="hero-overlay">

          <div className="hero-content">

            <span className="eyebrow">
              FERRETERÃA CAYO
            </span>

            <h1>
              Todo para construir,
              <br />

              <strong>
                reparar y mejorar
              </strong>
            </h1>

            <p>
              Herramientas, construcciÃ³n,
              pintura, iluminaciÃ³n y seguridad.
            </p>

            <div className="hero-actions">

              <Link
                href="/productos"
                className="btn btn-yellow"
              >
                Ver productos
              </Link>

              <Link
                href="/promociones"
                className="btn btn-outline"
              >
                Ver ofertas
              </Link>

            </div>

          </div>

        </div>

      </section>

                  <section className="benefits benefits-wave">

        <div className="benefit-item">
          <span className="benefit-check">✓</span>
          <strong>Precios competitivos</strong>
        </div>

        <div className="benefit-item">
          <span className="benefit-check">✓</span>
          <strong>Stock visible</strong>
        </div>

        <div className="benefit-item">
          <span className="benefit-check">✓</span>
          <strong>Pedido por WhatsApp</strong>
        </div>

        <div className="benefit-item">
          <span className="benefit-check">✓</span>
          <strong>Delivery y recojo</strong>
        </div>

      </section>

      <main className="wrap">

        <div className="section-head">
          <div>
            <span className="eyebrow dark">
              CATEGORÃAS
            </span>

            <h2 className="title">
              Encuentra lo que necesitas
            </h2>
          </div>
        </div>

        <CategoryGrid
          items={categoryItems}
        />

        {featured.length > 0 ? (
          <>
            <div className="section-head">
              <div>
                <span className="eyebrow dark">
                  RECOMENDADOS
                </span>

                <h2 className="title">
                  Productos destacados
                </h2>
              </div>
            </div>

            <ProductGrid
              products={featured}
            />
          </>
        ) : null}

        <div className="section-head">
          <div>
            <span className="eyebrow dark">
              PRECIOS ESPECIALES
            </span>

            <h2 className="title">
              Ofertas
            </h2>
          </div>
        </div>

        <ProductGrid
          products={offers}
        />

      </main>

      <Footer />
    </>
  );
}
