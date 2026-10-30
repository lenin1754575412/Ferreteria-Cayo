import { Header } from "@/features/navigation";
import { Footer } from "@/features/layout";
import MarcasPremium from "./MarcasPremium";

export const metadata = {
  title: "Marcas | Ferretería Cayo",
  description: "Explora nuestras marcas de herramientas y construcción."
};

export default function MarcasPage() {
  return (
    <>
      <Header />
      <MarcasPremium />
      <Footer />
    </>
  );
}