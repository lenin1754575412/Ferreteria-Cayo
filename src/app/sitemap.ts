import type {
  MetadataRoute
} from "next";

import {
  getCatalogProducts
} from "@/features/catalog/server/product.repository";

export default async function sitemap():
Promise<MetadataRoute.Sitemap> {

  const site =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://ferreteria-cayo.vercel.app";

  const products =
    await getCatalogProducts();

  const pages = [
    "",
    "/productos",
    "/promociones",
    "/marcas",
    "/envios",
    "/contacto",
    "/privacidad",
    "/terminos"
  ];

  return [
    ...pages.map(
      (page) => ({
        url:
          `${site}${page}`,
        lastModified:
          new Date()
      })
    ),

    ...products.map(
      (product) => ({
        url:
          `${site}/productos/${product.slug}`,
        lastModified:
          new Date()
      })
    )
  ];
}