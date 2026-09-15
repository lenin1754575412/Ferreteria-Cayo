import Link from "next/link";

import {
  Header
} from "@/features/navigation";

import {
  Footer
} from "@/features/layout";

import {
  brands
} from "@/features/catalog";

import {
  PageHero
} from "@/shared/ui";

export default function Marcas() {

  return (
    <>
      <Header />

      <PageHero
        title="Marcas"
        description="Compra productos por marca."
      />

      <main className="wrap">

        <div className="brands-grid">

          {brands.map(
            (brand) => (
              <Link
                className="brand-box"
                key={brand}
                href={`/productos?marca=${encodeURIComponent(brand)}`}
              >
                {brand}
              </Link>
            )
          )}

        </div>

      </main>

      <Footer />
    </>
  );
}