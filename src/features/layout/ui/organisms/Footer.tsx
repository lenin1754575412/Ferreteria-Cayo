import Link from "next/link";

import {
  contactConfig,
} from "@/features/contact";

export function Footer() {

  return (
    <>

      <footer className="footer">

        <div className="footer-grid">

          <div className="footer-brand">

            <div className="footer-logo">
              CAYO
            </div>

            <p>
              Tu ferretería para herramientas,
              construcción, pintura, iluminación
              y mantenimiento.
            </p>

          </div>

          <div>

            <h3>
              Comprar
            </h3>

            <Link href="/productos">
              Productos
            </Link>

            <Link href="/productos?ofertas=1">
              Ofertas
            </Link>

            <Link href="/subcategorias/herramientas-manuales">
              Herramientas
            </Link>

          </div>

          <div>

            <h3>
              Categorías
            </h3>

            <Link href="/subcategorias/materiales-de-construccion">
              Construcción
            </Link>

            <Link href="/subcategorias/pinturas-y-acabados">
              Pinturas
            </Link>

            <Link href="/subcategorias/iluminacion">
              Iluminación
            </Link>

          </div>

          <div>

            <h3>
              Ayuda
            </h3>

            <Link href="/contacto">
              Contacto
            </Link>

            <Link href="/contacto">
              Atención al cliente
            </Link>

            <Link href="/carrito">
              Carrito
            </Link>

          </div>

        </div>

        <div className="footer-copy">
          © 2026 Ferretería Cayo · Catálogo web
        </div>

      </footer>

      <div className="bottom">

        <a
          target="_blank"
          rel="noreferrer"
          href={
            `https://wa.me/${contactConfig.phoneWhatsApp}`
          }
        >
          WhatsApp Ventas
        </a>

        <Link href="/productos?ofertas=1">
          Ofertas
        </Link>

        <Link href="/contacto">
          Atención: {contactConfig.phoneDisplay}
        </Link>

      </div>

      <a
        className="up"
        href="#"
      >
        ⌃
      </a>

    </>
  );
}