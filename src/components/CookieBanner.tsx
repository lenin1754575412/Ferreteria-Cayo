"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const aceptado = localStorage.getItem("cookies-aceptadas");

    if (!aceptado) {
      setTimeout(() => {
        setVisible(true);
      }, 500);
    }
  }, []);

  const aceptarTodo = () => {
    localStorage.setItem("cookies-aceptadas", "true");
    localStorage.setItem(
      "cookies-fecha",
      new Date().toISOString()
    );

    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <div className="cookie-overlay" />

      <div className="cookie-container">
        <div className="cookie-card">

          <div className="cookie-icon">
            🍪
          </div>

          <div className="cookie-info">
            <span className="cookie-tag">
              PRIVACIDAD Y COOKIES
            </span>

            <h2>Usamos cookies</h2>

            <p>
              En <strong>Ferretería Cayo</strong> utilizamos cookies
              para ofrecerte una mejor experiencia, recordar tus
              preferencias y mejorar el funcionamiento de nuestra tienda.
            </p>

            <small>
              Al seleccionar “Aceptar todo”, aceptas el uso de cookies
              en nuestro sitio web.
            </small>
          </div>

          <button
            onClick={aceptarTodo}
            className="cookie-button"
          >
            Aceptar todo
            <span>✓</span>
          </button>

        </div>
      </div>

      <style jsx>{`

        .cookie-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.18);
          z-index: 9998;
          animation: fadeIn .3s ease;
        }

        .cookie-container {
          position: fixed;
          bottom: 22px;
          left: 0;
          right: 0;
          z-index: 9999;
          padding: 0 18px;
          animation: cookieUp .45s ease;
        }

        .cookie-card {
          width: 100%;
          max-width: 1050px;
          margin: auto;

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.99),
              rgba(250,250,250,0.98)
            );

          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 20px;

          box-shadow:
            0 25px 70px rgba(0,0,0,0.20),
            0 4px 15px rgba(0,0,0,0.08);

          padding: 22px 24px;

          display: flex;
          align-items: center;
          gap: 18px;
        }

        .cookie-icon {
          width: 58px;
          height: 58px;
          min-width: 58px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 30px;

          border-radius: 16px;

          background:
            linear-gradient(
              135deg,
              #fff1df,
              #ffe0bd
            );

          border: 1px solid #ffd2a2;
        }

        .cookie-info {
          flex: 1;
        }

        .cookie-tag {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #ea580c;
        }

        .cookie-info h2 {
          margin: 3px 0 6px;

          color: #111827;

          font-size: 21px;
          font-weight: 800;
        }

        .cookie-info p {
          margin: 0;

          color: #5f6875;

          font-size: 13.5px;
          line-height: 1.6;
        }

        .cookie-info small {
          display: block;

          margin-top: 5px;

          color: #9ca3af;

          font-size: 11px;
        }

        .cookie-button {
          border: none;

          min-width: 155px;

          padding: 14px 20px;

          border-radius: 12px;

          color: white;

          background:
            linear-gradient(
              135deg,
              #f97316,
              #ea580c
            );

          font-size: 13px;
          font-weight: 800;

          cursor: pointer;

          box-shadow:
            0 10px 25px rgba(234,88,12,0.28);

          transition:
            transform .2s ease,
            box-shadow .2s ease;
        }

        .cookie-button:hover {
          transform: translateY(-2px);

          box-shadow:
            0 14px 30px rgba(234,88,12,0.38);
        }

        .cookie-button span {
          margin-left: 7px;
        }

        @keyframes cookieUp {
          from {
            opacity: 0;
            transform: translateY(35px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @media(max-width:700px) {

          .cookie-container {
            bottom: 10px;
            padding: 0 10px;
          }

          .cookie-card {
            flex-direction: column;
            align-items: stretch;

            padding: 19px;

            gap: 13px;

            border-radius: 18px;
          }

          .cookie-icon {
            width: 48px;
            height: 48px;
            min-width: 48px;

            font-size: 25px;
          }

          .cookie-info h2 {
            font-size: 19px;
          }

          .cookie-button {
            width: 100%;
          }
        }

      `}</style>
    </>
  );
}
