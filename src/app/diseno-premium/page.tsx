"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./premium.module.css";

export default function DisenoPremium() {
  const [busqueda, setBusqueda] = useState("");
  const [menu, setMenu] = useState(false);

  function buscar(e: React.FormEvent) {
    e.preventDefault();
    if (busqueda.trim()) {
      window.location.href =
        "/productos?q=" + encodeURIComponent(busqueda.trim());
    }
  }

  return (
    <main id="cayo-premium-home" className={styles.pagina}>
      <div className={styles.superior}>
        <div className={styles.beneficios}>
          <span>📍 Trujillo, La Libertad</span>
          <span>🚚 Envíos a todo el Perú</span>
          <span>🛡️ Calidad garantizada</span>
          <span>🎧 Atención personalizada</span>
        </div>

        <div className={styles.usuario}>
          <Link href="/login">Iniciar sesión</Link>
          <Link href="/registro" className={styles.registro}>
            Registrarme
          </Link>
        </div>
      </div>

      <header className={styles.cabecera}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcono}>⌂</span>
          <span>
            <strong>CAYO</strong>
            <small>FERRETERÍA</small>
          </span>
        </Link>

        <form className={styles.buscador} onSubmit={buscar}>
          <span className={styles.lupa}>⌕</span>
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="¿Qué estás buscando?"
            aria-label="Buscar productos"
          />
          <button type="submit">Buscar</button>
        </form>

        <div className={styles.contacto}>
          <span className={styles.telefonoIcono}>☎</span>
          <div>
            <small>¿Necesitas ayuda?</small>
            <strong>992 110 555</strong>
          </div>
        </div>

        <Link href="/carrito" className={styles.carrito}>
          🛒 <span>Mi carrito</span>
        </Link>
      </header>

      <nav className={styles.navegacion}>
        <button
          type="button"
          className={styles.menuMovil}
          onClick={() => setMenu(!menu)}
        >
          ☰ Menú
        </button>

        <div className={`${styles.enlaces} ${menu ? styles.abierto : ""}`}>
          <Link href="/" className={styles.activo}>⌂ Inicio</Link>
          <Link href="/productos">▣ Productos</Link>
          <Link href="/promociones">◇ Ofertas</Link>
          <Link href="/productos">⚒ Herramientas</Link>
          <Link href="/subcategorias">▤ Construcción</Link>
          <Link href="/marcas">☆ Marcas</Link>
          <Link href="/envios">🚚 Envíos</Link>
          <Link href="/blog">▤ Blog</Link>
          <Link href="/promociones" className={styles.promociones}>🔥 Promociones</Link>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.overlay}></div>

        <div className={styles.heroContenido}>
          <div className={styles.etiqueta}>
            TU PROYECTO EMPIEZA AQUÍ
          </div>

          <h1>
            LAS MEJORES MARCAS
            <span>PARA GRANDES PROYECTOS</span>
          </h1>

          <p>
            Herramientas, construcción, pinturas, iluminación,
            sanitario y ferretería general.
          </p>

          <div className={styles.ventajas}>
            <span>🚚 Envíos a todo el Perú</span>
            <span>🛡️ Productos originales</span>
            <span>🎧 Asesoría especializada</span>
          </div>

          <div className={styles.botones}>
            <Link href="/productos" className={styles.primario}>
              🛒 Ver catálogo completo →
            </Link>
            <Link href="/promociones" className={styles.secundario}>
              ◇ Ver ofertas →
            </Link>
          </div>
        </div>

        <div className={styles.categorias}>
          <Link href="/productos">⌂ Hogar</Link>
          <Link href="/productos">▧ Pinturas</Link>
          <Link href="/productos">⚒ Herramientas</Link>
          <Link href="/productos">▤ Construcción</Link>
        </div>
      </section>

      <section className={styles.marcas}>
        <div>
          <small>NUESTRAS MARCAS</small>
          <h2>Marcas destacadas</h2>
        </div>
        <div className={styles.listaMarcas}>
          {["3M", "BOSCH", "DEWALT", "Makita", "PHILIPS", "Sika", "TRUPER"].map(
            (marca) => <span key={marca}>{marca}</span>
          )}
        </div>
      </section>
    </main>
  );
}