import {
  Header
} from "@/features/navigation";

import {
  Footer
} from "@/features/layout";

import {
  ProductGrid
} from "@/features/catalog";

import {
  getCatalogProducts
} from "@/features/catalog/server/product.repository";

import {
  PageHero
} from "@/shared/ui";

export default async function Promociones() {

  const products =
    await getCatalogProducts();

  const offers =
    products.filter(
      (product) =>
        Boolean(product.oldPrice)
    );

  return (
    <>
      <Header />

      <PageHero
        eyebrow="PRECIOS ESPECIALES"
        title="Promociones"
        description="Productos con descuentos y ofertas."
      />

      <main className="wrap">
        <ProductGrid
          products={offers}
        />
      </main>

      <Footer />
    </>
  );
}