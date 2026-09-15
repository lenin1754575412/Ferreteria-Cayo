import Link from "next/link";

import {
  Truck,
  Store,
  PackageCheck,
  MapPin,
  MessageCircle,
  Clock3,
  ShieldCheck,
  ArrowRight
} from "lucide-react";

import {
  Header
} from "@/features/navigation";

import {
  Footer
} from "@/features/layout";

export const metadata = {
  title: "Envíos y recojo | Ferretería Cayo",
  description:
    "Consulta las opciones de delivery, recojo y transporte de materiales de Ferretería Cayo."
};

export default function EnviosPage() {

  return (
    <>
      <Header />

      <main>

        {/* HERO */}

        <section className="shipping-hero">

          <div className="shipping-hero-bg" />

          <div className="wrap shipping-hero-content">

            <span className="shipping-label">
              FERRETERÍA CAYO
            </span>

            <h1>
              Envíos y recojo
              <span> para tus proyectos</span>
            </h1>

            <p>
              Coordina la entrega de herramientas,
              materiales y productos de ferretería
              de forma rápida y sencilla.
            </p>

            <div className="shipping-hero-actions">

              <Link
                href="https://wa.me/51992100555?text=Hola%20Ferretería%20Cayo,%20quiero%20consultar%20sobre%20un%20envío."
                target="_blank"
                className="shipping-primary-btn"
              >
                <MessageCircle size={19} />
                Consultar delivery
              </Link>

              <Link
                href="/productos"
                className="shipping-secondary-btn"
              >
                Ver productos
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

          <div className="shipping-floating-card">

            <Truck size={38} />

            <div>
              <strong>
                Delivery coordinado
              </strong>

              <span>
                Consulta disponibilidad y costo
              </span>
            </div>

          </div>

        </section>

        {/* SERVICIOS */}

        <section className="wrap shipping-services">

          <div className="shipping-section-heading">

            <span>
              OPCIONES DE ENTREGA
            </span>

            <h2>
              Elige cómo recibir tu compra
            </h2>

            <p>
              La disponibilidad y el costo se confirman
              según el pedido y el lugar de entrega.
            </p>

          </div>

          <div className="shipping-grid">

            <article className="shipping-card">

              <div className="shipping-icon">
                <Truck size={30} />
              </div>

              <span className="shipping-number">
                01
              </span>

              <h3>
                Delivery
              </h3>

              <p>
                Coordinamos el envío de tu compra
                según la ubicación, cantidad y tamaño
                del pedido.
              </p>

              <Link
                href="https://wa.me/51992100555?text=Hola,%20quiero%20consultar%20el%20costo%20de%20delivery."
                target="_blank"
              >
                Consultar envío
                <ArrowRight size={16} />
              </Link>

            </article>


            <article className="shipping-card">

              <div className="shipping-icon">
                <Store size={30} />
              </div>

              <span className="shipping-number">
                02
              </span>

              <h3>
                Recojo coordinado
              </h3>

              <p>
                Puedes coordinar previamente el recojo
                de tu pedido directamente con
                Ferretería Cayo.
              </p>

              <Link
                href="https://wa.me/51992100555?text=Hola,%20quiero%20coordinar%20el%20recojo%20de%20un%20pedido."
                target="_blank"
              >
                Coordinar recojo
                <ArrowRight size={16} />
              </Link>

            </article>


            <article className="shipping-card">

              <div className="shipping-icon">
                <PackageCheck size={30} />
              </div>

              <span className="shipping-number">
                03
              </span>

              <h3>
                Material pesado
              </h3>

              <p>
                Cemento, agregados y otros productos
                voluminosos pueden requerir transporte
                especial.
              </p>

              <Link
                href="https://wa.me/51992100555?text=Hola,%20quiero%20consultar%20el%20transporte%20de%20materiales%20pesados."
                target="_blank"
              >
                Consultar transporte
                <ArrowRight size={16} />
              </Link>

            </article>

          </div>

        </section>


        {/* COMO FUNCIONA */}

        <section className="shipping-process">

          <div className="wrap">

            <div className="shipping-section-heading shipping-center">

              <span>
                SIMPLE Y RÁPIDO
              </span>

              <h2>
                ¿Cómo coordinamos tu entrega?
              </h2>

            </div>

            <div className="shipping-steps">

              <div className="shipping-step">

                <div>
                  <MessageCircle size={25} />
                </div>

                <strong>
                  1. Escríbenos
                </strong>

                <p>
                  Envíanos los productos que necesitas.
                </p>

              </div>


              <div className="shipping-line" />


              <div className="shipping-step">

                <div>
                  <MapPin size={25} />
                </div>

                <strong>
                  2. Indica la ubicación
                </strong>

                <p>
                  Confirma dónde deseas recibir el pedido.
                </p>

              </div>


              <div className="shipping-line" />


              <div className="shipping-step">

                <div>
                  <Clock3 size={25} />
                </div>

                <strong>
                  3. Coordinamos
                </strong>

                <p>
                  Te informamos disponibilidad y condiciones.
                </p>

              </div>


              <div className="shipping-line" />


              <div className="shipping-step">

                <div>
                  <PackageCheck size={25} />
                </div>

                <strong>
                  4. Recibe tu compra
                </strong>

                <p>
                  Tu pedido queda listo para entrega o recojo.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* INFORMACION */}

        <section className="wrap shipping-info">

          <div className="shipping-info-main">

            <div className="shipping-info-icon">
              <ShieldCheck size={32} />
            </div>

            <div>

              <span>
                INFORMACIÓN IMPORTANTE
              </span>

              <h2>
                El costo depende del pedido
              </h2>

              <p>
                La tarifa de delivery puede variar según
                la ubicación, peso, volumen y cantidad de
                productos solicitados.
              </p>

              <p>
                Antes de confirmar tu compra,
                consulta las condiciones directamente
                con Ferretería Cayo.
              </p>

            </div>

          </div>

          <div className="shipping-whatsapp">

            <span>
              ¿Necesitas una cotización?
            </span>

            <strong>
              992 100 555
            </strong>

            <Link
              href="https://wa.me/51992100555"
              target="_blank"
            >
              <MessageCircle size={18} />
              Hablar por WhatsApp
            </Link>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}