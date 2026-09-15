import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ShieldCheck,
  Wrench,
  PaintBucket,
  Drill
} from "lucide-react";

import { Header } from "@/features/navigation";
import { Footer } from "@/features/layout";

export const metadata = {
  title: "Marcas | Ferretería Cayo",
  description: "Explora las marcas disponibles en Ferretería Cayo."
};

const brands = [
  {
    name: "3M",
    category: "Seguridad",
    description: "Soluciones para protección, cintas, abrasivos y productos industriales."
  },
  {
    name: "Bosch",
    category: "Herramientas",
    description: "Herramientas eléctricas confiables para trabajo profesional y doméstico."
  },
  {
    name: "CPP",
    category: "Pinturas",
    description: "Pinturas y recubrimientos para interiores, exteriores y acabados."
  },
  {
    name: "Cayo",
    category: "Ferretería",
    description: "Selección propia de productos esenciales para construcción y reparación."
  },
  {
    name: "DeWalt",
    category: "Herramientas",
    description: "Equipos robustos y accesorios de alto rendimiento para obra y taller."
  },
  {
    name: "Fischer",
    category: "Fijaciones",
    description: "Anclajes, pernos y soluciones de fijación para distintos materiales."
  },
  {
    name: "Forte",
    category: "Construcción",
    description: "Materiales y accesorios útiles para proyectos de construcción y mejora."
  },
  {
    name: "Makita",
    category: "Herramientas",
    description: "Tecnología y potencia en herramientas para trabajo continuo."
  },
  {
    name: "Oatey",
    category: "Sanitario",
    description: "Accesorios y soluciones para instalaciones de agua y fontanería."
  },
  {
    name: "Opalux",
    category: "Iluminación",
    description: "Opciones de iluminación funcional para hogar, negocio y proyecto."
  },
  {
    name: "Pacasmayo",
    category: "Construcción",
    description: "Cemento y productos orientados a obras, ampliaciones y remodelación."
  },
  {
    name: "Pavco",
    category: "Tuberías",
    description: "Tuberías y conexiones de confianza para instalaciones sanitarias."
  },
  {
    name: "Philips",
    category: "Iluminación",
    description: "Focos, luminarias y soluciones eficientes para espacios modernos."
  },
  {
    name: "Pretul",
    category: "Herramientas",
    description: "Herramientas prácticas para mantenimiento, ajustes y uso general."
  },
  {
    name: "Sika",
    category: "Construcción",
    description: "Pegamentos, selladores y aditivos para construcción y acabados."
  },
  {
    name: "Stanley",
    category: "Herramientas",
    description: "Herramientas manuales resistentes para trabajo diario."
  },
  {
    name: "Tekno",
    category: "Pinturas",
    description: "Pinturas y complementos para diferentes tipos de superficie."
  },
  {
    name: "Truper",
    category: "Herramientas",
    description: "Amplio catálogo de herramientas manuales, jardinería y ferretería."
  },
  {
    name: "Vainsa",
    category: "Baño y grifería",
    description: "Griferías y accesorios con buen diseño para cocina y baño."
  },
  {
    name: "Vencedor",
    category: "Pinturas",
    description: "Pinturas para renovar espacios con color, protección y acabado."
  },
  {
    name: "Yale",
    category: "Seguridad",
    description: "Cerraduras, candados y productos de seguridad para el hogar y negocio."
  }
];

const highlights = [
  {
    title: "Marcas confiables",
    text: "Trabajamos con marcas conocidas en herramientas, pinturas, tuberías y acabados.",
    icon: BadgeCheck
  },
  {
    title: "Calidad para tu proyecto",
    text: "Encuentra productos para obra, mantenimiento, instalación y mejora del hogar.",
    icon: ShieldCheck
  },
  {
    title: "Variedad por categoría",
    text: "Herramientas, construcción, iluminación, grifería, sanitario y mucho más.",
    icon: Wrench
  }
];

export default function MarcasPage() {
  return (
    <>
      <Header />

      <main>
        <section className="brands-pro-hero">
          <div className="brands-pro-hero-bg" />

          <div className="wrap brands-pro-hero-content">
            <span className="brands-pro-label">FERRETERÍA CAYO</span>

            <h1>Marcas confiables para cada proyecto</h1>

            <p>
              Explora nuestras marcas disponibles en herramientas, construcción,
              pinturas, iluminación, tuberías y ferretería general.
            </p>

            <div className="brands-pro-mini-stats">
              <div>
                <strong>{brands.length}+</strong>
                <span>marcas</span>
              </div>
              <div>
                <strong>Calidad</strong>
                <span>para obra y hogar</span>
              </div>
              <div>
                <strong>Stock</strong>
                <span>según disponibilidad</span>
              </div>
            </div>
          </div>
        </section>

        <section className="wrap brands-pro-highlights">
          <div className="brands-pro-highlights-grid">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="brands-pro-highlight-card">
                  <div className="brands-pro-highlight-icon">
                    <Icon size={24} />
                  </div>

                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="wrap brands-pro-section">
          <div className="brands-pro-section-heading">
            <span>MARCAS DISPONIBLES</span>
            <h2>Compra por marca</h2>
            <p>
              Selecciona una marca y revisa productos relacionados dentro del
              catálogo de Ferretería Cayo.
            </p>
          </div>

          <div className="brands-pro-grid">
            {brands.map((brand, index) => (
              <article key={brand.name} className="brands-pro-card">
                <div className="brands-pro-card-top">
                  <span className="brands-pro-badge">{brand.category}</span>
                  <span className="brands-pro-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="brands-pro-logo">
                  {brand.name.slice(0, 1)}
                </div>

                <h3>{brand.name}</h3>
                <p>{brand.description}</p>

                <Link href={`/productos?q=${encodeURIComponent(brand.name)}`}>
                  Ver productos
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="wrap brands-pro-cta">
          <div className="brands-pro-cta-box">
            <div className="brands-pro-cta-left">
              <span>¿NO SABES QUÉ MARCA ELEGIR?</span>
              <h2>Te ayudamos a encontrar la mejor opción</h2>
              <p>
                Escríbenos por WhatsApp y te orientamos según tu necesidad,
                presupuesto y tipo de proyecto.
              </p>
            </div>

            <div className="brands-pro-cta-actions">
              <Link
                href="https://wa.me/51992100555?text=Hola%20Ferretería%20Cayo,%20quiero%20consultar%20sobre%20una%20marca."
                target="_blank"
                className="brands-pro-btn-primary"
              >
                Consultar por WhatsApp
              </Link>

              <Link
                href="/productos"
                className="brands-pro-btn-secondary"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}