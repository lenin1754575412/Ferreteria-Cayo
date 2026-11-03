import type { ReactNode } from "react";
import "./registro-premium.css";

export default function RegistroPremium({ children }: { children: ReactNode }) {
  return (
    <main className="cayo-registro-premium">
      <div className="premium-container">
        <div className="premium-card">
          <section className="premium-info">
            <div className="premium-kicker">— FERRETERÍA CAYO —</div>
            <h1>
              Crea tu cuenta
              <br />
              <span>en Ferretería Cayo</span>
            </h1>
            <p>
              Accede a una mejor experiencia de compra,
              seguimiento de pedidos, ofertas exclusivas y mucho más.
            </p>

            <div className="premium-benefit">
              <div className="premium-benefit-icon">▣</div>
              <div>
                <strong>Compra rápida y segura</strong>
                <small>Tus herramientas y materiales a un clic.</small>
              </div>
            </div>

            <div className="premium-benefit">
              <div className="premium-benefit-icon">%</div>
              <div>
                <strong>Ofertas exclusivas</strong>
                <small>Promociones especiales para clientes registrados.</small>
              </div>
            </div>

            <div className="premium-benefit">
              <div className="premium-benefit-icon">◇</div>
              <div>
                <strong>Seguimiento de pedidos</strong>
                <small>Consulta el estado de tus compras.</small>
              </div>
            </div>
          </section>

          <section className="premium-form-side">
            <div className="premium-heading">
              <div className="premium-heading-icon">♙</div>
              <div>
                <h2>Crear cuenta</h2>
                <p>Regístrate y comienza a comprar en Ferretería Cayo.</p>
              </div>
            </div>

            <div className="premium-form-content">{children}</div>
          </section>
        </div>

        <div className="premium-footer">
          <div><span>▣</span> Envíos a todo el Perú</div>
          <div><span>◇</span> Compras seguras</div>
          <div><span>★</span> Productos de calidad</div>
          <div><span>◉</span> Soporte especializado</div>
        </div>
      </div>
    </main>
  );
}