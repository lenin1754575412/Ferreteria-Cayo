import * as Store from "../data/store";

type AnyProduct = Store.Product & Record<string, any>;

function normalize(value: unknown): string {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const synonyms: Record<string, string[]> = {
  tuberia: [
    "tuberia",
    "tuberias",
    "tubo",
    "tubos",
    "pvc",
    "fontaneria",
    "gasfiteria",
    "codo",
    "codos",
    "tee",
    "tees",
  ],

  bano: [
    "bano",
    "banos",
    "griferia",
    "grifo",
    "lavatorio",
    "inodoro",
    "ducha",
    "sanitario",
    "sanitarios",
  ],

  ladrillo: [
    "ladrillo",
    "ladrillos",
    "construccion",
    "material",
    "materiales",
    "cemento",
    "bloque",
    "bloques",
  ],

  pintura: [
    "pintura",
    "pinturas",
    "latex",
    "esmalte",
    "sellador",
    "brocha",
    "rodillo",
  ],

  iluminacion: [
    "iluminacion",
    "foco",
    "focos",
    "led",
    "reflector",
    "reflectores",
    "panel",
    "paneles",
    "extension",
    "extensiones",
  ],

  herramienta: [
    "herramienta",
    "herramientas",
    "martillo",
    "taladro",
    "amoladora",
    "llave",
    "llaves",
    "destornillador",
  ],

  cemento: [
    "cemento",
    "cementos",
    "construccion",
    "materiales",
    "aridos",
    "arena",
  ],
};

function getSearchTerms(query: string): string[] {
  const q = normalize(query);

  if (!q) return [];

  const terms = new Set<string>();

  terms.add(q);

  for (const word of q.split(" ")) {
    if (word) terms.add(word);
  }

  for (const [key, values] of Object.entries(synonyms)) {
    const normalizedValues = values.map(normalize);

    if (
      q === key ||
      q.includes(key) ||
      normalizedValues.some(
        (value) => q === value || q.includes(value)
      )
    ) {
      terms.add(key);

      for (const value of normalizedValues) {
        terms.add(value);
      }
    }
  }

  return Array.from(terms);
}

function getLocalProducts(): AnyProduct[] {
  const arrays = Object.values(Store).filter(Array.isArray) as AnyProduct[][];

  const products =
    arrays.find((arr) =>
      arr.some(
        (item) =>
          item &&
          typeof item === "object" &&
          (
            "name" in item ||
            "nombre" in item ||
            "slug" in item
          )
      )
    ) ?? [];

  return products;
}

function productText(product: AnyProduct): string {
  return normalize(
    [
      product.name,
      product.nombre,

      product.description,
      product.descripcion,

      product.category,
      product.categoria,
      product["Categoría"],

      product.subcategory,
      product.subcategoria,

      product.brand,
      product.marca,
      product.Marca,

      product.slug,
      product.sku,

      product.tags,
      product.keywords,
    ]
      .flat()
      .filter(Boolean)
      .join(" ")
  );
}

export async function getCatalogProducts() {
  return getLocalProducts();
}

export async function getProductBySlug(slug: string) {
  const wanted = normalize(slug);

  return (
    getLocalProducts().find(
      (product) => normalize(product.slug) === wanted
    ) ?? null
  );
}

export async function getCatalogProductBySlug(slug: string) {
  return getProductBySlug(slug);
}

export async function searchCatalogProducts(query: string) {
  const products = getLocalProducts();
  const terms = getSearchTerms(query);

  if (!terms.length) {
    return products;
  }

  return products
    .map((product) => {
      const text = productText(product);

      let score = 0;

      for (const term of terms) {
        if (text === term) {
          score += 100;
        } else if (text.includes(term)) {
          score += 20;
        }

        if (normalize(product.name ?? product.nombre).includes(term)) {
          score += 40;
        }

        if (normalize(product.category ?? product.categoria).includes(term)) {
          score += 25;
        }

        if (normalize(product.brand ?? product.marca).includes(term)) {
          score += 10;
        }
      }

      return {
        product,
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);
}
