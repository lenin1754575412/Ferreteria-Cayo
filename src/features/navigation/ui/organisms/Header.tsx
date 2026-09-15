import Link from "next/link";

import {
  Home,
  ShoppingCart,
} from "lucide-react";

import {
  contactConfig,
} from "@/features/contact";

import {
  CartIndicator,
} from "@/features/cart/ui/CartIndicator";

import {
  SearchBar,
} from "../molecules/SearchBar";

import {
  NavDropdown,
} from "./NavDropdown";

export function Header() {

  return (
    <>

      <div className="topline">
        ENVÍOS Y ATENCIÓN PERSONALIZADA · FERRETERÍA CAYO
      </div>

      <header className="brand-head">

        <div className="brand-inner">

          <Link
            href="/"
            className="logo"
          >

            <span>
              CAYO
            </span>

            <small>
              FERRETERÍA · HERRAMIENTAS · CONSTRUCCIÓN
            </small>

          </Link>

          <SearchBar />

          <Link
            className="contact-mini"
            href="/contacto"
          >

            <b>
              ¿Necesitas ayuda?
            </b>

            <span>
              {contactConfig.phoneDisplay}
            </span>

          </Link>

        </div>

      </header>

      <nav className="nav">

        <div className="nav-inner">

          <Link
            href="/"
            aria-label="Inicio"
          >
            <Home size={18} />
          </Link>

          <NavDropdown
            label="Productos"
            menu="productos"
          />

          <Link
            className="new-link"
            href="/promociones"
          >

            <span>
              NEW!
            </span>

            Ofertas

          </Link>

          <NavDropdown
            label="Herramientas"
            menu="herramientas"
          />

          <NavDropdown
            label="Construcción"
            menu="construccion"
          />

          <NavDropdown
            label="Pinturas"
            menu="pinturas"
          />

          <Link href="/marcas">
            Marcas
          </Link>

          <Link href="/envios">
            Envíos
          </Link>

          <Link href="/blog">
            Blog
          </Link>

          <Link
            className="cart-link"
            href="/carrito"
          >

            <ShoppingCart size={16} />

            Carrito

            <CartIndicator />

          </Link>

        </div>

      </nav>

    </>
  );
}