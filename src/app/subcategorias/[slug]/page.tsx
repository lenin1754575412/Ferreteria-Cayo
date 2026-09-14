import {
  Header,
} from "@/features/navigation";

import {
  Footer,
} from "@/features/layout";

import {
  CategoryGrid,
  ProductGrid,
  categoryFromSlug,
  makeProducts,
  makeSubcategories,
  type CategoryGridItem,
} from "@/features/catalog";

import {
  PageHero,
} from "@/shared/ui";

export default function SubcategoryPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {

  const title =
    categoryFromSlug(
      params.slug
    );

  const subcategories =
    makeSubcategories(
      title
    );

  const products =
    makeProducts(
      title
    );

  const categoryItems: CategoryGridItem[] =
    subcategories.map(
      (item) => ({
        title: item.title,
        image: item.img,
        href: item.href,
      })
    );

  return (
    <>

      <Header />

      <PageHero
        title={title}
        description="Productos seleccionados para tus proyectos."
      />

      <div className="crumb">

        <div className="wrap">
          ⌂ Inicio / Productos / {title}
        </div>

      </div>

      <main className="wrap">

        <h2 className="title small-title">
          Explora {title}
        </h2>

        <CategoryGrid
          items={categoryItems}
          compact
        />

        <div className="section-head deals-head">

          <div>

            <span className="eyebrow dark">
              RECOMENDADOS
            </span>

            <h2 className="title">
              Productos de {title}
            </h2>

          </div>

        </div>

        <ProductGrid
          products={products}
          compact
        />

      </main>

      <Footer />

    </>
  );
}