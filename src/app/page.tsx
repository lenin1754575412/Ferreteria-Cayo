"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./cayo-premium-home.module.css";

const marcas = ["3M", "BOSCH", "DEWALT", "Makita", "PHILIPS", "Sika", "TRUPER"];

const categorias = [
  { nombre: "Hogar", icono: "⌂", href: "/productos", clase: "hogar" },
  { nombre: "Pinturas", icono: "▧", href: "/productos", clase: "pinturas" },
  { nombre: "Herramientas", icono: "⚒", href: "/herramientas", clase: "herramientas" },
  { nombre: "Construcción", icono: "▥", href: "/productos", clase: "construccion" },
];

export default function Home() {
  const [busqueda, setBusqueda] = useState("");
  const [marcaInicio, setMarcaInicio] = useState(0);

  function buscar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = busqueda.trim();
    if (q) {
      window.location.href = "/productos?buscar=" + encodeURIComponent(q);
    } else {
      window.location.href = "/productos";
    }
  }

  const marcasVisibles = [
    ...marcas.slice(marcaInicio),
    ...marcas.slice(0, marcaInicio),
  ];

  return (
    <main id="cayo-home-premium-v2" className={styles.pagina}>
      <div className={styles.superior}>
        <div className={styles.beneficios}>
          <span><b>⌖</b> Trujillo, La Libertad</span>
          <span><b>▣</b> Envíos a todo el Perú</span>
          <span><b>⬡</b> Calidad garantizada</span>
          <span><b>♧</b> Atención personalizada</span>
        </div>
        <div className={styles.cuenta}>
          <span className={styles.redes}>f　◎　▶　♪</span>
          <Link href="/" className={styles.inicioCuenta}>⌂ Inicio</Link>
          <Link href="/login">♙ Iniciar sesión</Link>
          <Link className={styles.registro} href="/registro">Registrarme</Link>
        </div>
      </div>

      <header className={styles.cabecera}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoCasa}>⌂</span>
          <span>
            <strong>CAYO</strong>
            <small>F E R R E T E R Í A</small>
            <em>HERRAMIENTAS · CONSTRUCCIÓN · HOGAR</em>
          </span>
        </Link>

        <form className={styles.buscador} onSubmit={buscar}>
          <span className={styles.lupa}>⌕</span>
          <input
            aria-label="Buscar productos"
            placeholder="¿Qué estás buscando?"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <select aria-label="Categoría de búsqueda" defaultValue="all">
            <option value="all">Todas las categorías</option>
            <option value="herramientas">Herramientas</option>
            <option value="pinturas">Pinturas</option>
            <option value="construccion">Construcción</option>
          </select>
          <button type="submit">Buscar</button>
        </form>

        <div className={styles.contacto}>
          <span className={styles.contactoIcono}>☎</span>
          <span><small>¿Necesitas ayuda?</small><strong>992 110 555</strong></span>
        </div>

        <Link href="/carrito" className={styles.carrito}>
          <span>🛒</span>
          <span><small>Mi carrito</small><strong>Ver carrito</strong></span>
        </Link>
      </header>

      <nav className={styles.navegacion} aria-label="Navegación principal">
        <Link className={styles.activo} href="/">⌂　Inicio</Link>
        <Link href="/productos">◇　Productos</Link>
        <Link href="/ofertas">◆　Ofertas <span className={styles.hot}>HOT</span></Link>
        <Link href="/herramientas">⚒　Herramientas</Link>
        <Link href="/productos">▥　Construcción</Link>
        <Link href="/marcas">☆　Marcas</Link>
        <Link href="/envios">▣　Envíos</Link>
        <Link href="/blog">▤　Blog</Link>
        <Link className={styles.promociones} href="/promociones">🔥 Promociones</Link>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroContenido}>
          <p className={styles.etiqueta}>━━　TU PROYECTO EMPIEZA AQUÍ</p>
          <h1>
            LAS MEJORES MARCAS
            <span>PARA GRANDES PROYECTOS</span>
          </h1>
          <p className={styles.descripcion}>
            Herramientas, construcción, pinturas, iluminación,
            sanitario y ferretería general.
          </p>

          <div className={styles.ventajas}>
            <span><b>▣</b> Envíos a<br />todo el Perú</span>
            <span><b>⬡</b> Productos<br />originales</span>
            <span><b>♧</b> Asesoría<br />especializada</span>
            <span><b>▤</b> Pagos seguros<br />y múltiples métodos</span>
          </div>

          <div className={styles.acciones}>
            <Link href="/productos" className={styles.botonOro}>
              🛒　Ver catálogo completo　 →
            </Link>
            <Link href="/ofertas" className={styles.botonOscuro}>
              ◇　Ver ofertas　 →
            </Link>
          </div>
        </div>

        <aside className={styles.categorias}>
          {categorias.map((cat) => (
            <Link
              key={cat.nombre}
              href={cat.href}
              className={`${styles.categoria} ${styles[cat.clase]}`}
            >
              <span className={styles.categoriaIcono}>{cat.icono}</span>
              <strong>{cat.nombre}</strong>
            </Link>
          ))}
        </aside>

        <div className={styles.puntos}>
          <span className={styles.puntoActivo}></span>
          <span></span>
          <span></span>
        </div>
      </section>

      <section className={styles.marcas}>
        <div className={styles.marcasTitulo}>
          <small>NUESTRAS MARCAS</small>
          <h2>Marcas destacadas</h2>
          <p>Calidad y confianza en cada proyecto</p>
        </div>
        <button
          type="button"
          className={styles.flecha}
          aria-label="Marcas anteriores"
          onClick={() => setMarcaInicio((marcaInicio + marcas.length - 1) % marcas.length)}
        >‹</button>
        <div className={styles.marcasLista}>
          {marcasVisibles.map((marca) => (
            <Link
              href="/marcas"
              key={marca}
              className={`${styles.marca} ${marca === "DEWALT" ? styles.marcaDorada : ""}`}
            >
              {marca}
            </Link>
          ))}
        </div>
        <button
          type="button"
          className={styles.flecha}
          aria-label="Marcas siguientes"
          onClick={() => setMarcaInicio((marcaInicio + 1) % marcas.length)}
        >›</button>
      </section>

      <section className={styles.banners}>
        <Link href="/herramientas" className={`${styles.banner} ${styles.bannerHerramientas}`}>
          <h3>HERRAMIENTAS<br />CON POTENCIA</h3>
          <p>Para resultados profesionales</p>
          <span>Ver herramientas　→</span>
        </Link>
        <Link href="/productos" className={`${styles.banner} ${styles.bannerConstruccion}`}>
          <h3>MATERIALES<br />DE CONSTRUCCIÓN</h3>
          <p>Calidad para obras seguras</p>
          <span>Ver materiales　→</span>
        </Link>
        <Link href="/productos" className={`${styles.banner} ${styles.bannerPinturas}`}>
          <h3>PINTURAS<br />QUE TRANSFORMAN</h3>
          <p>Dale color a tus proyectos</p>
          <span>Ver pinturas　→</span>
        </Link>
      </section>
    </main>
  );
}