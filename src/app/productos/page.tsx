import {
  Header
} from "@/features/navigation";

import {
  Footer
} from "@/features/layout";

import {
  CatalogFilters,
  ProductGrid,
  filterProducts,
  type CatalogSearchParams
} from "@/features/catalog";

import {
  getCatalogProducts
} from "@/features/catalog/server/product.repository";

import {
  PageHero
} from "@/shared/ui";

export default async function Productos({
  searchParams
}: {
  searchParams: CatalogSearchParams;
}) {

  const products =
    await getCatalogProducts();

  const filtered =
    filterProducts(
      products,
      searchParams
    );

  const title =
    searchParams.ofertas === "1"
      ? "Ofertas"
      : searchParams.categoria ||
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
        title={title}
        description={`${filtered.length} productos encontrados`}
      />

      <main className="wrap products-layout">

        <CatalogFilters
          categoria={searchParams.categoria}
          marca={searchParams.marca}
          precio={searchParams.precio}
          ordenar={searchParams.ordenar}
          stock={searchParams.stock === "1"}
          ofertas={searchParams.ofertas === "1"}
        />

        <section className="catalog">

          <ProductGrid
            products={filtered}
          />

          {filtered.length === 0 ? (
            <div className="empty">

              <h2>
                No encontramos productos
              </h2>

              <a
                className="btn"
                href="/productos"
              >
                Ver catálogo completo
              </a>

            </div>
          ) : null}

        </section>

      </main>

      <Footer />

    </>
  );
}