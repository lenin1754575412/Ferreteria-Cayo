import Link from "next/link";

import {
  contactConfig
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
              Herramientas, construcción,
              pintura y ferretería.
            </p>
          </div>

          <div>
            <h3>
              Comprar
            </h3>

            <Link href="/nosotros">
              Nosotros
            </Link>

            <Link href="/productos">
              Productos
            </Link>

            <Link href="/promociones">
              Ofertas
            </Link>

            <Link href="/marcas">
              Marcas
            </Link>

            <Link href="/mis-pedidos">
              Mis pedidos
            </Link>

            <Link href="/blog">
              Blog
            </Link>
          </div>

          <div>
            <h3>
              Servicio
            </h3>

            <Link href="/envios">
              Envíos
            </Link>

            <Link href="/contacto">
              Contacto
            </Link>

            <Link href="/carrito">
              Carrito
            </Link>
          </div>

          <div>
            <h3>
              Información
            </h3>

            <Link href="/preguntas-frecuentes">
              Preguntas frecuentes
            </Link>

            <Link href="/medios-de-pago">
              Medios de pago
            </Link>

            <Link href="/garantia">
              Garantía
            </Link>

            <Link href="/terminos">
              Términos
            </Link>

            <Link href="/privacidad">
              Privacidad
            </Link>

            <Link href="/cambios-devoluciones">
              Cambios
            </Link>
          </div>

        </div>

        <div className="footer-copy">
          © 2026 Ferretería Cayo
        </div>

      </footer>

      <div className="bottom">

        <a
          href={`https://wa.me/${contactConfig.phoneWhatsApp}`}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp Ventas
        </a>

        <Link href="/promociones">
          Ofertas
        </Link>

        <Link href="/contacto">
          {contactConfig.phoneDisplay}
        </Link>

      </div>
    </>
  );
}