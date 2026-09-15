import Link from "next/link";

import type {
  Product
} from "../../data/store";

import {
  ProductBadge
} from "../atoms/ProductBadge";

import {
  ProductPrice
} from "../atoms/ProductPrice";

import {
  AddToCartButton
} from "@/features/cart/ui/AddToCartButton";

export function ProductCard({
  product
}: {
  product: Product;
}) {

  return (
    <article className="product">

      <Link
        href={`/productos/${product.slug}`}
      >
        <div className="product-image">

          <img
            src={product.img}
            alt={product.name}
            loading="lazy"
          />

          <ProductBadge
            value={product.badge}
          />

        </div>
      </Link>

      <div>

        <p className="product-cat">
          {product.cat}
        </p>

        <p className="product-brand">
          {product.brand}
        </p>

        <Link
          href={`/productos/${product.slug}`}
        >
          <h3>
            {product.name}
          </h3>
        </Link>

        <p className="product-desc">
          {product.description}
        </p>

        <p
          className={
            product.stock <= 0
              ? "stock-out"
              : product.stock <= 5
                ? "stock-low"
                : "stock-ok"
          }
        >
          {product.stock <= 0
            ? "Agotado"
            : `${product.stock} disponibles`}
        </p>

        <ProductPrice
          price={product.price}
          oldPrice={product.oldPrice}
        />

        <AddToCartButton
          product={product}
        />

        <Link
          className="product-detail-link"
          href={`/productos/${product.slug}`}
        >
          Ver producto →
        </Link>

      </div>

    </article>
  );
}