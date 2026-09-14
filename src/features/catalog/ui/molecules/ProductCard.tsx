import type { Product } from "../../data/store";

import { contactConfig } from "@/features/contact";

import {
  ButtonLink,
} from "@/shared/ui";

import {
  ProductBadge,
} from "../atoms/ProductBadge";

import {
  ProductPrice,
} from "../atoms/ProductPrice";

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

export function ProductCard({
  product,
  compact = false,
}: ProductCardProps) {

  const message = encodeURIComponent(
    `Hola Ferretería Cayo, quiero consultar por ${product.name}`
  );

  const whatsappUrl =
    `https://wa.me/${contactConfig.phoneWhatsApp}?text=${message}`;

  return (
    <article className="product">

      <div className="product-image">

        <img
          src={product.img}
          alt={product.name}
        />

        <ProductBadge
          value={product.badge}
        />

      </div>

      <div>

        <p className="product-cat">
          {product.cat}
        </p>

        <h3>
          {product.name}
        </h3>

        {!compact ? (
          <p className="product-desc">
            {product.description}
          </p>
        ) : null}

        <ProductPrice
          price={product.price}
          oldPrice={product.oldPrice}
        />

        <ButtonLink
          href={whatsappUrl}
          external
          className="btn product-btn"
        >
          {compact
            ? "Consultar"
            : "Consultar por WhatsApp"}
        </ButtonLink>

      </div>

    </article>
  );
}