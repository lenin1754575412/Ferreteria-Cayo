import {
  Header
} from "@/features/navigation";

import {
  Footer
} from "@/features/layout";

import {
  CheckoutForm
} from "@/features/checkout/ui/CheckoutForm";

import {
  PageHero
} from "@/shared/ui";

export default function Checkout() {
  return (
    <>
      <Header />

      <PageHero
        title="Finalizar pedido"
        description="Completa tus datos para realizar el pedido."
      />

      <main className="wrap">
        <CheckoutForm />
      </main>

      <Footer />
    </>
  );
}