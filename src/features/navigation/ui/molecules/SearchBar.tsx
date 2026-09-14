import {
  Search,
} from "lucide-react";

export function SearchBar() {

  return (
    <form
      className="search"
      action="/productos"
      method="get"
    >

      <Search size={19} />

      <input
        name="q"
        placeholder="¿Qué estás buscando?"
      />

      <button type="submit">
        Buscar
      </button>

    </form>
  );
}