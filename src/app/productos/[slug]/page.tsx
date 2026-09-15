import {
  notFound
} from "next/navigation";

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
  ProductDetail
} from "@/features/catalog/ui/organisms/ProductDetail";

import {
  getCatalogProducts,
  getProductBySlug
} from "@/features/catalog/server/product.repository";

export default async function ProductPage({
  params
}: {
  params: {
    slug: string;
  };
}) {

  const product =
    await getProductBySlug(
      params.slug
    );

  if (!product) {
    notFound();
  }

  const products =
    await getCatalogProducts();

  const related =
    products
      .filter(
        (item) =>
          item.cat === product.cat &&
          item.id !== product.id
      )
      .slice(0, 4);

  return (
    <>

      <Header />

      <div className="crumb">
        <div className="wrap">
          Inicio / Productos / {product.name}
        </div>
      </div>

      <main className="wrap">

        <ProductDetail
          product={product}
        />

        {related.length > 0 ? (
          <>
            <div className="section-head">
              <div>
                <span className="eyebrow dark">
                  TAMBIÉN TE PUEDE INTERESAR
                </span>

                <h2 className="title">
                  Productos relacionados
                </h2>
              </div>
            </div>

            <ProductGrid
              products={related}
            />
          </>
        ) : null}

      </main>

      <Footer />

    </>
  );
}