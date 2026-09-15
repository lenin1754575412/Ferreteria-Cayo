import { Header } from "@/features/navigation";
import { Footer } from "@/features/layout";
import { PageHero } from "@/shared/ui";

export default function Page() {
  return (
    <>
      <Header />

      <PageHero
        title="Política de privacidad"
        description="Información sobre el uso de datos."
      />

      <main className="wrap legal-page">
        <h2>Datos</h2>

        <p>
          Los datos ingresados por el cliente se utilizan
          para atender consultas, pedidos y entregas.
        </p>

        <h2>Carrito</h2>

        <p>
          El carrito puede utilizar almacenamiento local
          del navegador.
        </p>
      </main>

      <Footer />
    </>
  );
}