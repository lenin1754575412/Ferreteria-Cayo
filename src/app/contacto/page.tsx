import {
  Header,
} from "@/features/navigation";

import {
  Footer,
} from "@/features/layout";

import {
  contactConfig,
} from "@/features/contact";

import {
  ButtonLink,
  PageHero,
} from "@/shared/ui";

export default function Contacto() {

  const message =
    encodeURIComponent(
      "Hola Ferretería Cayo, quiero hacer una consulta"
    );

  return (
    <>

      <Header />

      <PageHero
        title="Contacto"
        description="Te ayudamos a encontrar el producto que necesitas."
      />

      <main className="wrap contact-grid">

        <section className="contact-card">

          <h2>
            Ventas y consultas
          </h2>

          <p>
            <b>Celular:</b>{" "}
            {contactConfig.phoneDisplay}
          </p>

          <p>
            <b>Horario:</b>{" "}
            {contactConfig.schedule}
          </p>

          <ButtonLink
            external
            href={
              `https://wa.me/${contactConfig.phoneWhatsApp}?text=${message}`
            }
          >
            Escribir por WhatsApp
          </ButtonLink>

        </section>

        <section className="contact-card">

          <h2>
            Compra fácil
          </h2>

          <p>
            Busca el producto,
            revisa el precio referencial
            y usa el botón de WhatsApp
            para consultar disponibilidad.
          </p>

          <ButtonLink
            className="btn btn-dark"
            href="/productos"
          >
            Ir al catálogo
          </ButtonLink>

        </section>

      </main>

      <Footer />

    </>
  );
}