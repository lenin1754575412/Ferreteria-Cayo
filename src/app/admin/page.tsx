import {
  AdminPanel
} from "@/features/admin/ui/AdminPanel";

import {
  PageHero
} from "@/shared/ui";

export default function Admin() {
  return (
    <>
      <PageHero
        title="Panel administrador"
        description="Gestiona productos, stock y pedidos."
      />

      <main className="wrap">
        <AdminPanel />
      </main>
    </>
  );
}