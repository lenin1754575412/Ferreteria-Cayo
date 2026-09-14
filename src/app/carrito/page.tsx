import {
  Header,
} from "@/features/navigation";

import {
  Footer,
} from "@/features/layout";

import {
  ButtonLink,
  PageHero,
} from "@/shared/ui";

export default function Carrito() {

  return (
    <>

      <Header />

      <PageHero
        title="Carrito"
        description="Tu selección de productos aparecerá aquí."
      />

      <main className="wrap">

        <div className="empty">

          <h2>
            Tu carrito está vacío
          </h2>

          <p>
            Explora el catálogo
            y consulta tus productos
            por WhatsApp.
          </p>

          <ButtonLink href="/productos">
            Ver productos
          </ButtonLink>

        </div>

      </main>

      <Footer />

    </>
  );
}