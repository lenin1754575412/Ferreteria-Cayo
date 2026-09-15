import {
  Header
} from "@/features/navigation";

import {
  Footer
} from "@/features/layout";

import {
  OrderHistory
} from "@/features/orders/ui/OrderHistory";

import {
  PageHero
} from "@/shared/ui";

export default function MisPedidos() {
  return (
    <>
      <Header />

      <PageHero
        title="Mis pedidos"
        description="Consulta tus pedidos recientes."
      />

      <main className="wrap">
        <OrderHistory />
      </main>

      <Footer />
    </>
  );
}