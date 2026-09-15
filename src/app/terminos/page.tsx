import { Header } from "@/features/navigation";
import { Footer } from "@/features/layout";
import { PageHero } from "@/shared/ui";

export default function Page() {
  return (
    <>
      <Header />

      <PageHero
        title="Términos y condiciones"
        description="Condiciones generales de la tienda."
      />

      <main className="wrap legal-page">
        <h2>Precios</h2>

        <p>
          Los precios pueden actualizarse.
          La disponibilidad final se confirma al realizar el pedido.
        </p>

        <h2>Pedidos</h2>

        <p>
          Los pedidos están sujetos a confirmación de stock y entrega.
        </p>
      </main>

      <Footer />
    </>
  );
}