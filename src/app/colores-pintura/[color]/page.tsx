import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/features/navigation";
import { Footer } from "@/features/layout";

type ColorInfo = {
  nombre: string;
  codigo: string;
  descripcion: string;
};

const colores: Record<string, ColorInfo> = {
  blanco: {
    nombre: "Blanco",
    codigo: "#FFFFFF",
    descripcion: "Limpio, luminoso y fácil de combinar.",
  },

  "blanco-humo": {
    nombre: "Blanco humo",
    codigo: "#F1F1ED",
    descripcion: "Un blanco suave para ambientes modernos.",
  },

  marfil: {
    nombre: "Marfil",
    codigo: "#FFF8DC",
    descripcion: "Un tono cálido y elegante.",
  },

  crema: {
    nombre: "Crema",
    codigo: "#FFF3C4",
    descripcion: "Ideal para espacios cálidos y acogedores.",
  },

  beige: {
    nombre: "Beige",
    codigo: "#DCC9A3",
    descripcion: "Neutral, clásico y muy versátil.",
  },

  arena: {
    nombre: "Arena",
    codigo: "#D6B887",
    descripcion: "Natural y perfecto para ambientes rústicos.",
  },

  amarillo: {
    nombre: "Amarillo",
    codigo: "#F9D71C",
    descripcion: "Aporta energía y luminosidad a los espacios.",
  },

  naranja: {
    nombre: "Naranja",
    codigo: "#F58220",
    descripcion: "Un tono intenso, cálido y moderno.",
  },

  rojo: {
    nombre: "Rojo",
    codigo: "#C62828",
    descripcion: "Fuerte, elegante y con mucha personalidad.",
  },

  coral: {
    nombre: "Coral",
    codigo: "#F26B5B",
    descripcion: "Una combinación cálida entre rojo y naranja.",
  },

  rosado: {
    nombre: "Rosado",
    codigo: "#F3A6B9",
    descripcion: "Suave, cálido y luminoso.",
  },

  lila: {
    nombre: "Lila",
    codigo: "#C8A2C8",
    descripcion: "Un tono delicado para ambientes tranquilos.",
  },

  morado: {
    nombre: "Morado",
    codigo: "#6A3D9A",
    descripcion: "Profundo, elegante y creativo.",
  },

  azul: {
    nombre: "Azul",
    codigo: "#1769AA",
    descripcion: "Fresco y perfecto para ambientes modernos.",
  },

  "azul-marino": {
    nombre: "Azul marino",
    codigo: "#183153",
    descripcion: "Elegante, profundo y sofisticado.",
  },

  celeste: {
    nombre: "Celeste",
    codigo: "#67B7DC",
    descripcion: "Luminoso, fresco y relajante.",
  },

  turquesa: {
    nombre: "Turquesa",
    codigo: "#28B8B0",
    descripcion: "Fresco y llamativo para espacios modernos.",
  },

  verde: {
    nombre: "Verde",
    codigo: "#3B8D4E",
    descripcion: "Natural y agradable para interiores y exteriores.",
  },

  "verde-oliva": {
    nombre: "Verde oliva",
    codigo: "#7C8A45",
    descripcion: "Natural y elegante.",
  },

  "gris-claro": {
    nombre: "Gris claro",
    codigo: "#C9CDD1",
    descripcion: "Neutral y perfecto para estilos modernos.",
  },

  gris: {
    nombre: "Gris",
    codigo: "#7A7F85",
    descripcion: "Sobrio y fácil de combinar.",
  },

  antracita: {
    nombre: "Antracita",
    codigo: "#3F4448",
    descripcion: "Oscuro, moderno y elegante.",
  },

  marron: {
    nombre: "Marrón",
    codigo: "#795548",
    descripcion: "Cálido y natural para acabados clásicos.",
  },

  negro: {
    nombre: "Negro",
    codigo: "#161616",
    descripcion: "Elegante y fuerte para detalles y acabados.",
  },
};

function cambiarLuminosidad(hex: string, cantidad: number) {
  const valor = hex.replace("#", "");

  const numero = parseInt(valor, 16);

  const r = Math.max(
    0,
    Math.min(255, (numero >> 16) + cantidad)
  );

  const g = Math.max(
    0,
    Math.min(255, ((numero >> 8) & 0x00ff) + cantidad)
  );

  const b = Math.max(
    0,
    Math.min(255, (numero & 0x0000ff) + cantidad)
  );

  return (
    "#" +
    (b | (g << 8) | (r << 16))
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()
  );
}

export default function ColorPage({
  params,
}: {
  params: { color: string };
}) {
  const color = colores[params.color];

  if (!color) {
    notFound();
  }

  const tonos = [
    {
      nombre: "Claro",
      codigo: cambiarLuminosidad(color.codigo, 55),
    },
    {
      nombre: "Suave",
      codigo: cambiarLuminosidad(color.codigo, 28),
    },
    {
      nombre: "Principal",
      codigo: color.codigo,
    },
    {
      nombre: "Intenso",
      codigo: cambiarLuminosidad(color.codigo, -28),
    },
  ];

  return (
    <>
      <Header />

      <main>
        <section
          className="paint-detail-hero"
          style={{
            background: `linear-gradient(
              120deg,
              ${color.codigo},
              ${cambiarLuminosidad(color.codigo, -45)}
            )`,
          }}
        >
          <div className="wrap paint-detail-hero-inner">
            <span>FERRETERÍA CAYO · COLORES</span>

            <h1>{color.nombre}</h1>

            <p>{color.descripcion}</p>

            <div className="paint-detail-code">
              Color base: {color.codigo}
            </div>
          </div>
        </section>

        <section className="wrap paint-detail-content">
          <div className="paint-detail-heading">
            <div>
              <span>TONOS RELACIONADOS</span>

              <h2>Variaciones de {color.nombre}</h2>

              <p>
                Usa estos tonos como referencia para encontrar el
                acabado ideal para tu proyecto.
              </p>
            </div>

            <Link href="/colores-pintura">
              ← Todos los colores
            </Link>
          </div>

          <div className="paint-tone-grid">
            {tonos.map((tono) => (
              <div
                className="paint-tone-card"
                key={tono.nombre}
              >
                <div
                  className="paint-tone-preview"
                  style={{
                    backgroundColor: tono.codigo,
                  }}
                />

                <div className="paint-tone-data">
                  <strong>
                    {color.nombre} {tono.nombre}
                  </strong>

                  <span>{tono.codigo}</span>
                </div>
              </div>
            ))}
          </div>

          <section className="paint-detail-buy">
            <div>
              <span>PINTURAS Y ACABADOS</span>

              <h2>
                ¿Te gusta este color?
              </h2>

              <p>
                Revisa las pinturas disponibles y consulta stock,
                presentación y precio.
              </p>
            </div>

            <div className="paint-detail-actions">
              <Link href="/subcategorias/pinturas-y-acabados">
                Ver pinturas
              </Link>

              <Link href="/contacto">
                Consultar color
              </Link>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </>
  );
}
