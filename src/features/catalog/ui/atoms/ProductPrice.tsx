type ProductPriceProps = {
  price: number;
  priceUsd?: number;
  oldPrice?: number;
};

export function ProductPrice({
  price,
  priceUsd,
  oldPrice,
}: ProductPriceProps) {

  return (
    <>
      {oldPrice ? (
        <span className="old-price">
          S/ {oldPrice.toFixed(2)}
        </span>
      ) : null}

      <p className="price">
        S/ {price.toFixed(2)}
      </p>
      {priceUsd !== undefined ? <small>USD $ {priceUsd.toFixed(2)}</small> : null}
    </>
  );
}