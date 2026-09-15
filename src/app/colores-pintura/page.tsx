import Link from "next/link";
import { Header } from "@/features/navigation";
import { Footer } from "@/features/layout";
import { PageHero } from "@/shared/ui";

const colores = [
  { nombre: "Blanco", slug: "blanco", codigo: "#FFFFFF", borde: true },
  { nombre: "Blanco humo", slug: "blanco-humo", codigo: "#F1F1ED", borde: true },
  { nombre: "Marfil", slug: "marfil", codigo: "#FFF8DC", borde: true },
  { nombre: "Crema", slug: "crema", codigo: "#FFF3C4", borde: true },

  { nombre: "Beige", slug: "beige", codigo: "#DCC9A3" },
  { nombre: "Arena", slug: "arena", codigo: "#D6B887" },
  { nombre: "Amarillo", slug: "amarillo", codigo: "#F9D71C" },
  { nombre: "Naranja", slug: "naranja", codigo: "#F58220" },

  { nombre: "Rojo", slug: "rojo", codigo: "#C62828" },
  { nombre: "Coral", slug: "coral", codigo: "#F26B5B" },
  { nombre: "Rosado", slug: "rosado", codigo: "#F3A6B9" },
  { nombre: "Lila", slug: "lila", codigo: "#C8A2C8" },

  { nombre: "Morado", slug: "morado", codigo: "#6A3D9A" },
  { nombre: "Azul", slug: "azul", codigo: "#1769AA" },
  { nombre: "Azul marino", slug: "azul-marino", codigo: "#183153" },
  { nombre: "Celeste", slug: "celeste", codigo: "#67B7DC" },

  { nombre: "Turquesa", slug: "turquesa", codigo: "#28B8B0" },
  { nombre: "Verde", slug: "verde", codigo: "#3B8D4E" },
  { nombre: "Verde oliva", slug: "verde-oliva", codigo: "#7C8A45" },
  { nombre: "Gris claro", slug: "gris-claro", codigo: "#C9CDD1" },

  { nombre: "Gris", slug: "gris", codigo: "#7A7F85" },
  { nombre: "Antracita", slug: "antracita", codigo: "#3F4448" },
  { nombre: "Marrón", slug: "marron", codigo: "#795548" },
  { nombre: "Negro", slug: "negro", codigo: "#161616" },
];

export default function ColoresPinturaPage() {
  return (
    <>
      <Header />

      <PageHero
        eyebrow="PINTURAS · FERRETERÍA CAYO"
        title="Colores de Pintura"
        description="Explora colores para interiores, exteriores y proyectos de construcción."
      />

      <main className="paint-page wrap">
        <div className="paint-intro">
          <div>
            <span className="paint-kicker">PALETA DE COLORES</span>

            <h2>Encuentra el tono para tu proyecto</h2>

            <p>
              Selecciona un color para explorar diferentes tonos y
              combinaciones.
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
              key={color.slug}
              href={`/colores-pintura/${color.slug}`}
              className="paint-color-card"
            >
              <div
                className={`paint-swatch${
                  color.borde ? " paint-swatch-border" : ""
                }`}
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
      </main>

      <Footer />
    </>
  );
}
