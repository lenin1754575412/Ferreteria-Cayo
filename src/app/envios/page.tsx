import {
  Header
} from "@/features/navigation";

import {
  Footer
} from "@/features/layout";

import {
  PageHero
} from "@/shared/ui";

export default function Envios() {

  return (
    <>
      <Header />

      <PageHero
        title="Envíos y recojo"
        description="Opciones disponibles para recibir tu compra."
      />

      <main className="wrap info-layout">

        <article className="info-card">
          <h2>
            Delivery
          </h2>

          <p>
            El costo se coordina según la ubicación y el tamaño del pedido.
          </p>
        </article>

        <article className="info-card">
          <h2>
            Recojo
          </h2>

          <p>
            También puedes coordinar el recojo directamente con Ferretería Cayo.
          </p>
        </article>

        <article className="info-card">
          <h2>
            Material pesado
          </h2>

          <p>
            Cemento y otros materiales pueden necesitar transporte especial.
          </p>
        </article>

      </main>

      <Footer />
    </>
  );
}