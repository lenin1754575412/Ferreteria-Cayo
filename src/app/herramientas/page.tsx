import Link from "next/link";
import styles from "./herramientas.module.css";

const categorias = [
  ["Herramientas eléctricas", "Taladros, amoladoras y sierras.", "01"],
  ["Herramientas manuales", "Martillos, alicates y destornilladores.", "02"],
  ["Medición y precisión", "Niveles, flexómetros y medidores.", "03"],
  ["Construcción", "Equipos y accesorios para obras.", "04"],
  ["Seguridad industrial", "Cascos, guantes y protección.", "05"],
  ["Accesorios", "Brocas, discos y complementos.", "06"],
];

export default function HerramientasPage() {
  return (
    <main className={styles.pagina}>
      <section className={styles.hero}>
        <div className={styles.contenedor}>
          <div className={styles.ruta}>
            <Link href="/">Inicio</Link> / Herramientas
          </div>

          <div className={styles.etiqueta}>FERRETERÍA CAYO</div>

          <h1>
            HERRAMIENTAS PARA
            <span> GRANDES PROYECTOS</span>
          </h1>

          <p>
            Equipa tus proyectos con herramientas,
            accesorios y soluciones para construcción,
            reparación y mantenimiento.
          </p>

          <Link href="/productos" className={styles.boton}>
            EXPLORAR PRODUCTOS →
          </Link>
        </div>
      </section>

      <section className={styles.seccion}>
        <div className={styles.contenedor}>
          <div className={styles.etiqueta}>NUESTRO CATÁLOGO</div>
          <h2>Explora nuestras herramientas</h2>
          <p className={styles.intro}>
            Encuentra la categoría ideal para tu próximo proyecto.
          </p>

          <div className={styles.grid}>
            {categorias.map(([nombre, descripcion, numero]) => (
              <article className={styles.tarjeta} key={numero}>
                <div className={styles.numero}>{numero}</div>
                <h3>{nombre}</h3>
                <p>{descripcion}</p>
                <Link href="/productos">Ver productos →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}