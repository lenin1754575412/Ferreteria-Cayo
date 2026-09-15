import {
  products as staticProducts,
  type Product
} from "../data/store";

import {
  getDb
} from "@/shared/lib/mongodb";

export async function getCatalogProducts():
Promise<Product[]> {

  const db = await getDb();

  if (!db) {
    return staticProducts;
  }

  const docs =
    await db
      .collection("products")
      .find({
        active: {
          $ne: false
        }
      })
      .toArray();

  if (!docs.length) {
    return staticProducts;
  }

  return docs.map((doc: any) => {
    delete doc._id;
    return doc as Product;
  });
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {

  const db = await getDb();

  if (db) {
    const doc =
      await db
        .collection("products")
        .findOne({
          slug
        });

    if (doc) {
      delete (doc as any)._id;
      return doc as unknown as Product;
    }
  }

  return (
    staticProducts.find(
      (product) =>
        product.slug === slug
    ) ?? null
  );
}