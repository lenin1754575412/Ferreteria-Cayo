import { products } from "../data/store";

export type CatalogSearchParams = {
  q?: string;
  categoria?: string;
  ofertas?: string;
};

export function filterProducts(
  params: CatalogSearchParams
) {

  const query =
    (params.q ?? "")
      .trim()
      .toLowerCase();

  const category =
    params.categoria ?? "";

  const offersOnly =
    params.ofertas === "1";

  return products.filter((product) => {

    const searchable =
      `${product.name} ${product.cat} ${product.description}`
        .toLowerCase();

    const matchesQuery =
      !query ||
      searchable.includes(query);

    const matchesCategory =
      !category ||
      product.cat === category;

    const matchesOffer =
      !offersOnly ||
      Boolean(product.oldPrice);

    return (
      matchesQuery &&
      matchesCategory &&
      matchesOffer
    );
  });
}