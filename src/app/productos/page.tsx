import {
  Header,
} from "@/features/navigation";

import {
  Footer,
} from "@/features/layout";

import {
  CatalogFilters,
  ProductGrid,
  filterProducts,
  type CatalogSearchParams,
} from "@/features/catalog";

import {
  PageHero,
} from "@/shared/ui";

export default function Productos({
  searchParams,
}: {
  searchParams: CatalogSearchParams;
}) {

  const categoria =
    searchParams.categoria ?? "";

  const ofertas =
    searchParams.ofertas === "1";

  const filteredProducts =
    filterProducts(searchParams);

  const heading =
    ofertas
      ? "Ofertas"
      : categoria ||
        (
          searchParams.q
            ? `Resultados para “${searchParams.q}”`
            : "Nuestros productos"
        );

  return (
    <>

      <Header />

      <PageHero
        eyebrow="CATÁLOGO CAYO"
        title={heading}
        description={
          `${filteredProducts.length} productos encontrados`
        }
      />

      <main className="wrap products-layout">

        <CatalogFilters
          categoria={categoria}
          ofertas={ofertas}
        />

        <section className="catalog">

          <ProductGrid
            products={filteredProducts}
          />

          {
            filteredProducts.length === 0
              ? (
                <div className="empty">

                  <h2>
                    No encontramos productos
                  </h2>

                  <p>
                    Prueba con otra búsqueda o categoría.
                  </p>

                  <a
                    className="btn"
                    href="/productos"
                  >
                    Ver catálogo completo
                  </a>

                </div>
              )
              : null
          }

        </section>

      </main>

      <Footer />

    </>
  );
}