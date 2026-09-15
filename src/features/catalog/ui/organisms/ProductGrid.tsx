import type {
  Product
} from "../../data/store";

import {
  ProductCard
} from "../molecules/ProductCard";

export function ProductGrid({
  products
}: {
  products: Product[];
  compact?: boolean;
}) {

  return (
    <div className="products">

      {products.map(
        (product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        )
      )}

    </div>
  );
}