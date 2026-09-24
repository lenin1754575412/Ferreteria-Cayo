import Link from "next/link";

import { Header } from "@/features/navigation";
import { Footer } from "@/features/layout";
import { PageHero } from "@/shared/ui";

export const metadata = {
  title: "Preguntas frecuentes | Ferretería Cayo",
  description:
    "Preguntas frecuentes sobre productos, stock, pedidos y atención de Ferretería Cayo.",
};

const questions = [
  {
    q: "¿Cómo sé si un producto está disponible?",
    a: "Cada producto muestra su stock disponible. Para confirmar una compra o una cantidad grande, puedes consultar por WhatsApp.",
  },

  {
    q: "¿Puedo consultar antes de comprar?",
    a: "Sí. Puedes escribir por WhatsApp para consultar características, precio, disponibilidad o alternativas.",
  },

  {
    q: "¿Realizan delivery?",
    a: "Las opciones de entrega dependen del pedido y de la zona. Consulta las alternativas disponibles antes de confirmar tu compra.",
  },

  {
    q: "¿Puedo recoger mi pedido?",
    a: "Si el recojo está disponible para tu pedido, se coordina previamente con la tienda.",
  },

  {
    q: "¿Puedo pedir una cotización?",
    a: "Sí. Para compras de varios productos puedes enviar tu lista por WhatsApp y solicitar información.",
  },

  {
    q: "¿Los precios pueden cambiar?",
    a: "Los precios y promociones pueden actualizarse. Revisa el precio mostrado al momento de realizar tu pedido.",
  },

  {
    q: "¿Qué pasa si no encuentro un producto?",
    a: "Puedes utilizar el buscador o comunicarte con Ferretería Cayo para consultar disponibilidad o productos similares.",
  },

  {
    q: "¿Dónde veo mis pedidos?",
    a: "Puedes ingresar a la sección Mis pedidos desde el menú de la tienda.",
  },
];

export default function PreguntasPage() {
  return (
    <>
      <Header />

      <PageHero
        eyebrow="AYUDA"
        title="Preguntas frecuentes"
        description="Resolvemos algunas de las consultas más comunes."
      />

      <main className="wrap info-page">

        <section className="faq-list">

          {questions.map((item) => (

            <details
              className="faq-item"
              key={item.q}
            >

              <summary>
                {item.q}
              </summary>

              <p>
                {item.a}
              </p>

            </details>

          ))}

        </section>

        <section className="info-contact">

          <div>
            <span>
              ¿Tienes otra pregunta?
            </span>

            <h2>
              Escríbenos
            </h2>
          </div>

          <Link
            href="https://wa.me/51992110555"
            className="btn"
            target="_blank"
          >
            Consultar por WhatsApp
          </Link>

        </section>

      </main>

      <Footer />
    </>
  );
}