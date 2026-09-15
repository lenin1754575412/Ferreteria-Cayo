"use client";

import {
  MessageCircle,
  PackageCheck
} from "lucide-react";

import type {
  Product
} from "../../data/store";

import {
  AddToCartButton
} from "@/features/cart/ui/AddToCartButton";

import {
  contactConfig
} from "@/features/contact";

export function ProductDetail({
  product
}: {
  product: Product;
}) {

  const message =
    encodeURIComponent(
      `Hola Ferretería Cayo, quiero consultar por ${product.name}, SKU ${product.sku}`
    );

  return (
    <div className="product-detail">

      <div className="product-detail-image">

        <img
          src={product.img}
          alt={product.name}
        />

      </div>

      <div className="product-detail-info">

        <p className="product-brand">
          {product.brand}
        </p>

        <h1>
          {product.name}
        </h1>

        <p className="sku">
          SKU: {product.sku}
        </p>

        <div className="detail-price">

          {product.oldPrice ? (
            <span className="old-price">
              S/ {product.oldPrice.toFixed(2)}
            </span>
          ) : null}

          <strong>
            S/ {product.price.toFixed(2)}
          </strong>

        </div>

        <p>
          {product.description}
        </p>

        <p
          className={
            product.stock > 0
              ? "stock-ok"
              : "stock-out"
          }
        >
          <PackageCheck size={17} />

          {product.stock > 0
            ? `${product.stock} unidades disponibles`
            : "Agotado"}
        </p>

        <AddToCartButton
          product={product}
        />

        <a
          className="btn btn-whatsapp"
          target="_blank"
          rel="noreferrer"
          href={
            `https://wa.me/${contactConfig.phoneWhatsApp}?text=${message}`
          }
        >
          <MessageCircle size={17} />
          Consultar por WhatsApp
        </a>

        {product.specs ? (
          <div className="specs">

            <h3>
              Especificaciones
            </h3>

            {Object.entries(
              product.specs
            ).map(
              ([key, value]) => (
                <div
                  key={key}
                  className="spec-row"
                >
                  <b>
                    {key}
                  </b>

                  <span>
                    {value}
                  </span>
                </div>
              )
            )}

          </div>
        ) : null}

      </div>

    </div>
  );
}