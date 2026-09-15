import { Header } from "@/features/navigation";
import { Footer } from "@/features/layout";
import { PageHero } from "@/shared/ui";

export default function Page() {
  return (
    <>
      <Header />

      <PageHero
        title="Cambios y devoluciones"
        description="Información para solicitar un cambio."
      />

      <main className="wrap legal-page">
        <h2>Solicitud</h2>

        <p>
          Comunícate con Ferretería Cayo indicando
          el producto y el motivo de la solicitud.
        </p>

        <h2>Revisión</h2>

        <p>
          Los cambios están sujetos a revisión
          del producto y las condiciones de venta.
        </p>
      </main>

      <Footer />
    </>
  );
}