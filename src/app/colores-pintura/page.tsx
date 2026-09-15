import Link from "next/link";
import { Header } from "@/features/navigation";
import { Footer } from "@/features/layout";
import { PageHero } from "@/shared/ui";

const colores = [
  {
    nombre: "Blanco",
    codigo: "#FFFFFF",
    buscar: "blanco",
    borde: true,
  },
  {
    nombre: "Blanco humo",
    codigo: "#F1F1ED",
    buscar: "blanco humo",
    borde: true,
  },
  {
    nombre: "Marfil",
    codigo: "#FFF8DC",
    buscar: "marfil",
    borde: true,
  },
  {
    nombre: "Crema",
    codigo: "#FFF3C4",
    buscar: "crema",
    borde: true,
  },
  {
    nombre: "Beige",
    codigo: "#DCC9A3",
    buscar: "beige",
  },
  {
    nombre: "Arena",
    codigo: "#D6B887",
    buscar: "arena",
  },
  {
    nombre: "Amarillo",
    codigo: "#F9D71C",
    buscar: "amarillo",
  },
  {
    nombre: "Naranja",
    codigo: "#F58220",
    buscar: "naranja",
  },
  {
    nombre: "Rojo",
    codigo: "#C62828",
    buscar: "rojo",
  },
  {
    nombre: "Coral",
    codigo: "#F26B5B",
    buscar: "coral",
  },
  {
    nombre: "Rosado",
    codigo: "#F3A6B9",
    buscar: "rosado",
  },
  {
    nombre: "Lila",
    codigo: "#C8A2C8",
    buscar: "lila",
  },
  {
    nombre: "Morado",
    codigo: "#6A3D9A",
    buscar: "morado",
  },
  {
    nombre: "Azul",
    codigo: "#1769AA",
    buscar: "azul",
  },
  {
    nombre: "Azul marino",
    codigo: "#183153",
    buscar: "azul marino",
  },
  {
    nombre: "Celeste",
    codigo: "#67B7DC",
    buscar: "celeste",
  },
  {
    nombre: "Turquesa",
    codigo: "#28B8B0",
    buscar: "turquesa",
  },
  {
    nombre: "Verde",
    codigo: "#3B8D4E",
    buscar: "verde",
  },
  {
    nombre: "Verde oliva",
    codigo: "#7C8A45",
    buscar: "verde oliva",
  },
  {
    nombre: "Gris claro",
    codigo: "#C9CDD1",
    buscar: "gris claro",
    borde: true,
  },
  {
    nombre: "Gris",
    codigo: "#7A7F85",
    buscar: "gris",
  },
  {
    nombre: "Antracita",
    codigo: "#3F4448",
    buscar: "antracita",
  },
  {
    nombre: "Marrón",
    codigo: "#795548",
    buscar: "marron",
  },
  {
    nombre: "Negro",
    codigo: "#161616",
    buscar: "negro",
  },
];

export default function ColoresPinturaPage() {
  return (
    <>
      <Header />

      <PageHero
        eyebrow="PINTURAS · FERRETERÍA CAYO"
        title="Colores de Pintura"
        description="Explora nuestra paleta de colores para interiores, exteriores y proyectos de construcción."
      />

      <main className="paint-page wrap">
        <div className="paint-intro">
          <div>
            <span className="paint-kicker">PALETA DE COLORES</span>
            <h2>Encuentra el tono para tu proyecto</h2>

            <p>
              Selecciona un color para buscar pinturas relacionadas en
              nuestro catálogo.
            </p>
          </div>

          <Link
            href="/subcategorias/pinturas-y-acabados"
            className="paint-all-button"
          >
            Ver todas las pinturas
          </Link>
        </div>

        <section className="paint-color-grid">
          {colores.map((color) => (
            <Link
              key={color.nombre}
              href={`/productos?q=${encodeURIComponent(color.buscar)}`}
              className="paint-color-card"
            >
              <div
                className={`paint-swatch${color.borde ? " paint-swatch-border" : ""}`}
                style={{
                  backgroundColor: color.codigo,
                }}
              />

              <div className="paint-color-info">
                <div>
                  <strong>{color.nombre}</strong>
                  <span>{color.codigo}</span>
                </div>

                <span className="paint-arrow">→</span>
              </div>
            </Link>
          ))}
        </section>

        <section className="paint-help">
          <div>
            <span>¿NO SABES QUÉ COLOR ELEGIR?</span>
            <h2>Encuentra el acabado ideal</h2>
            <p>
              También tenemos brochas, rodillos, selladores,
              adhesivos y accesorios para pintar.
            </p>
          </div>

          <div className="paint-help-actions">
            <Link href="/productos?q=rodillo">
              Ver rodillos
            </Link>

            <Link href="/productos?q=brocha">
              Ver brochas
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
