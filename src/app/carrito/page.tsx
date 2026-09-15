import {
  Header
} from "@/features/navigation";

import {
  Footer
} from "@/features/layout";

import {
  CartView
} from "@/features/cart/ui/CartView";

import {
  PageHero
} from "@/shared/ui";

export default function Carrito() {
  return (
    <>
      <Header />

      <PageHero
        title="Carrito"
        description="Revisa tus productos antes de continuar."
      />

      <main className="wrap">
        <CartView />
      </main>

      <Footer />
    </>
  );
}