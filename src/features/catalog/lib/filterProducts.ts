import type { Product } from "../data/store";

export type CatalogSearchParams = {
  q?: string;
  categoria?: string;
  ofertas?: string;
  marca?: string;
  stock?: string;
  precio?: string;
  ordenar?: string;
};

export function filterProducts(
  products: Product[],
  params: CatalogSearchParams
) {
  const q = (params.q ?? "").trim().toLowerCase();

  let result = products.filter((product) => {
    const text =
      `${product.name} ${product.cat} ${product.brand} ${product.description} ${product.sku}`
        .toLowerCase();

    if (q && !text.includes(q)) return false;

    if (
      params.categoria &&
      product.cat !== params.categoria
    ) {
      return false;
    }

    if (
      params.marca &&
      product.brand !== params.marca
    ) {
      return false;
    }

    if (
      params.ofertas === "1" &&
      !product.oldPrice
    ) {
      return false;
    }

    if (
      params.stock === "1" &&
      product.stock <= 0
    ) {
      return false;
    }

    if (
      params.precio === "0-50" &&
      product.price >= 50
    ) {
      return false;
    }

    if (
      params.precio === "50-100" &&
      !(product.price >= 50 && product.price <= 100)
    ) {
      return false;
    }

    if (
      params.precio === "100-250" &&
      !(product.price > 100 && product.price <= 250)
    ) {
      return false;
    }

    if (
      params.precio === "250+" &&
      product.price <= 250
    ) {
      return false;
    }

    return true;
  });

  if (params.ordenar === "precio-asc") {
    result = [...result].sort((a, b) => a.price - b.price);
  }

  if (params.ordenar === "precio-desc") {
    result = [...result].sort((a, b) => b.price - a.price);
  }

  if (params.ordenar === "nombre") {
    result = [...result].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  return result;
}