import {
  brands,
  categories
} from "../../data/store";

export function CatalogFilters({
  categoria,
  marca,
  precio,
  ordenar,
  stock,
  ofertas
}: {
  categoria?: string;
  marca?: string;
  precio?: string;
  ordenar?: string;
  stock?: boolean;
  ofertas?: boolean;
}) {

  return (
    <aside className="filters">

      <form
        action="/productos"
        method="get"
      >

        <h3>
          Filtrar productos
        </h3>

        <label>
          Categoría
        </label>

        <select
          name="categoria"
          defaultValue={categoria ?? ""}
        >
          <option value="">
            Todas
          </option>

          {categories.map(
            (category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            )
          )}
        </select>

        <label>
          Marca
        </label>

        <select
          name="marca"
          defaultValue={marca ?? ""}
        >
          <option value="">
            Todas
          </option>

          {brands.map(
            (brand) => (
              <option
                key={brand}
                value={brand}
              >
                {brand}
              </option>
            )
          )}
        </select>

        <label>
          Precio
        </label>

        <select
          name="precio"
          defaultValue={precio ?? ""}
        >
          <option value="">
            Todos
          </option>

          <option value="0-50">
            Menos de S/ 50
          </option>

          <option value="50-100">
            S/ 50 - S/ 100
          </option>

          <option value="100-250">
            S/ 100 - S/ 250
          </option>

          <option value="250+">
            Más de S/ 250
          </option>
        </select>

        <label>
          Ordenar
        </label>

        <select
          name="ordenar"
          defaultValue={ordenar ?? ""}
        >
          <option value="">
            Recomendados
          </option>

          <option value="precio-asc">
            Menor precio
          </option>

          <option value="precio-desc">
            Mayor precio
          </option>

          <option value="nombre">
            Nombre
          </option>
        </select>

        <label className="filter-check">
          <input
            type="checkbox"
            name="stock"
            value="1"
            defaultChecked={stock}
          />

          Solo disponibles
        </label>

        <label className="filter-check">
          <input
            type="checkbox"
            name="ofertas"
            value="1"
            defaultChecked={ofertas}
          />

          Solo ofertas
        </label>

        <button
          className="btn filter-button"
          type="submit"
        >
          Aplicar
        </button>

        <a
          href="/productos"
          className="clear-filter"
        >
          Limpiar filtros
        </a>

      </form>

    </aside>
  );
}