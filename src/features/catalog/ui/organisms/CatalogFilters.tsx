import Link from "next/link";

import {
  categories,
} from "../../data/store";

type CatalogFiltersProps = {
  categoria?: string;
  ofertas?: boolean;
};

export function CatalogFilters({
  categoria,
  ofertas,
}: CatalogFiltersProps) {

  return (
    <aside className="filters">

      <h3>
        Categorías
      </h3>

      <Link href="/productos">
        Todos los productos
      </Link>

      {categories.map((category) => (

        <Link
          key={category}
          className={
            categoria === category
              ? "active"
              : ""
          }
          href={
            `/productos?categoria=${encodeURIComponent(category)}`
          }
        >
          {category}
        </Link>

      ))}

      <Link
        className={
          ofertas
            ? "active"
            : ""
        }
        href="/productos?ofertas=1"
      >
        🔥 Ofertas
      </Link>

    </aside>
  );
}