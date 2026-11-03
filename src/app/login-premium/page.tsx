"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./login-premium.module.css";

export default function LoginPremiumVisual() {
  const [mostrar, setMostrar] = useState(false);
  const [recordar, setRecordar] = useState(true);

  return (
    <main className={styles.pagina}>
      <header className={styles.cabecera}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcono}>⌂</span>
          <span>
            <strong>CAYO</strong>
            <small>FERRETERÍA</small>
          </span>
        </Link>

        <nav className={styles.navegacion}>
          <Link href="/">Inicio</Link>
          <Link href="/productos">Productos</Link>
          <Link href="/ofertas">Ofertas</Link>
          <Link href="/herramientas">Herramientas</Link>
        </nav>

        <Link href="/register" className={styles.registroSuperior}>
          Crear cuenta
        </Link>
      </header>

      <section className={styles.contenido}>
        <div className={styles.presentacion}>
          <div className={styles.etiqueta}>BIENVENIDO A</div>

          <h1>
            FERRETERÍA
            <span>CAYO</span>
          </h1>

          <p>
            Todo lo que necesitas para construir, reparar y
            mejorar tus proyectos.
          </p>

          <div className={styles.destacado}>
            <span>CALIDAD</span>
            <span>CONFIANZA</span>
            <span>CONSTRUCCIÓN</span>
          </div>
        </div>

        <div className={styles.tarjeta}>
          <div className={styles.titulo}>
            <div className={styles.avatar}>♙</div>
            <div>
              <h2>Iniciar sesión</h2>
              <p>
                Accede a tu cuenta y sigue comprando
                en Ferretería Cayo.
              </p>
            </div>
          </div>

          <form
            action="/login"
            method="get"
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                "Diseño visual instalado. Conecta este formulario con tu autenticación existente antes de usarlo."
              );
            }}
          >
            <label htmlFor="cayo-email">Correo electrónico</label>
            <input
              id="cayo-email"
              type="email"
              placeholder="Ingresa tu correo electrónico"
              autoComplete="email"
              required
            />

            <label htmlFor="cayo-password">Contraseña</label>

            <div className={styles.password}>
              <input
                id="cayo-password"
                type={mostrar ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setMostrar(!mostrar)}
                aria-label={mostrar ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {mostrar ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            <p className={styles.ayuda}>
              Contraseña: 6 a 50 caracteres, al menos una
              mayúscula y un número.
            </p>

            <div className={styles.opciones}>
              <label className={styles.recordar}>
                <input
                  type="checkbox"
                  checked={recordar}
                  onChange={(e) => setRecordar(e.target.checked)}
                />
                Recordar mi sesión
              </label>

              <Link href="/forgot-password">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button className={styles.continuar} type="submit">
              Continuar →
            </button>
          </form>

          <p className={styles.crearCuenta}>
            ¿Aún no tienes una cuenta?{" "}
            <Link href="/register">Crear una cuenta</Link>
          </p>

          <div className={styles.beneficios}>
            <span>🚚 Envíos a todo el Perú</span>
            <span>◇ Compras seguras</span>
            <span>◉ Atención personalizada</span>
          </div>
        </div>
      </section>
    </main>
  );
}