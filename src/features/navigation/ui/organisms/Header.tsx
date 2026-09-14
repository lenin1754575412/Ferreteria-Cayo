import Link from "next/link";

import {
  Home,
  ShoppingCart,
} from "lucide-react";

import {
  contactConfig,
} from "@/features/contact";

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
            aria-label="Inicio"
            href="/"
          >
            <Home size={18} />
          </Link>

          <NavDropdown
            label="Productos"
          />

          <Link
            className="new-link"
            href="/productos?ofertas=1"
          >

            <span>
              NEW!
            </span>

            Ofertas

          </Link>

          <NavDropdown
            label="Herramientas"
          />

          <NavDropdown
            label="Construcción"
          />

          <NavDropdown
            label="Pinturas"
          />

          <Link href="/productos?ofertas=1">
            Promociones
          </Link>

          <Link
            className="cart-link"
            href="/carrito"
          >

            <ShoppingCart size={16} />

            Carrito

            <span className="cart">
              0
            </span>

          </Link>

        </div>

      </nav>

    </>
  );
}