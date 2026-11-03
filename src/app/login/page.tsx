import Link from "next/link";
import { AuthForm } from "@/features/account/ui/AuthForm";
import styles from "./login-premium.module.css";
import "./login-accountbar.css";

export default function LoginPage() {
  return (
    <main id="cayo-login-premium" className={styles.page}>
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand}>
          <span className={styles.mark}>⌂</span>
          <span>
            <strong>CAYO</strong>
            <small>FERRETERÍA</small>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Navegación">
          <Link href="/">⌂ Inicio</Link>
          <Link href="/productos">Productos</Link>
          <Link href="/promociones">Ofertas</Link>
          <Link href="/herramientas">Herramientas</Link>
        </nav>

        <div className={styles.userLinks}>
          <span className={styles.active}>Iniciar sesión</span>
          <Link href="/registro" className={styles.register}>
            Registrarme
          </Link>
        </div>
      </header>

      <section className={styles.layout}>
        <div className={styles.visual}>
          <div className={styles.visualContent}>
            <div className={styles.eyebrow}>BIENVENIDO A</div>

            <h1 className={styles.headline}>
              FERRETERÍA
              <span>CAYO</span>
            </h1>

            <p className={styles.slogan}>
              Todo lo que necesitas para construir,
              reparar y mejorar tus proyectos.
            </p>

            <div className={styles.display} aria-hidden="true" />

            <div className={styles.visualCaption}>
              <span className={styles.pill}>HERRAMIENTAS</span>
              <span className={styles.pill}>CONSTRUCCIÓN</span>
              <span className={styles.pill}>HOGAR</span>
            </div>
          </div>
        </div>

        <div className={styles.panelWrap}>
          <section className={styles.panel}>
            <div className={styles.panelHead}>
              <div className={styles.avatar}>♙</div>
              <div>
                <h2>Iniciar sesión</h2>
                <p>
                  Accede a tu cuenta y sigue comprando
                  en Ferretería Cayo.
                </p>
              </div>
            </div>

            <div className={styles.formArea}>
              <AuthForm mode="login" />
            </div>

            <div className={styles.security}>
              <span>◆ Acceso seguro a tu cuenta</span>
            </div>

            <div className={styles.perks}>
              <div><b>▣</b> Envíos a todo el Perú</div>
              <div><b>◇</b> Compras seguras</div>
              <div><b>◉</b> Atención personalizada</div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}