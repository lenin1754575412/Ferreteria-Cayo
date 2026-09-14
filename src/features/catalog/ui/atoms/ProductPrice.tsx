type ProductPriceProps = {
  price: number;
  oldPrice?: number;
};

export function ProductPrice({
  price,
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
    </>
  );
}