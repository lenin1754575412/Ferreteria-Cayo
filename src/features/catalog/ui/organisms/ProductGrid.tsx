import type {
  Product,
} from "../../data/store";

import {
  ProductCard,
} from "../molecules/ProductCard";

type ProductGridProps = {
  products: Product[];
  compact?: boolean;
};

export function ProductGrid({
  products,
  compact = false,
}: ProductGridProps) {

  return (
    <div className="products">

      {products.map((product) => (

        <ProductCard
          key={`${product.cat}-${product.name}`}
          product={product}
          compact={compact}
        />

      ))}

    </div>
  );
}