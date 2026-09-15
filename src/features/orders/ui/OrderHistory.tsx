"use client";

import {
  useEffect,
  useState
} from "react";

export function OrderHistory() {

  const [orders, setOrders] =
    useState<any[]>([]);

  useEffect(() => {
    try {
      setOrders(
        JSON.parse(
          localStorage.getItem(
            "cayo-orders"
          ) ?? "[]"
        )
      );
    } catch {}
  }, []);

  if (!orders.length) {
    return (
      <div className="empty">

        <h2>
          Todavía no tienes pedidos
        </h2>

        <p>
          Los pedidos realizados desde este navegador aparecerán aquí.
        </p>

      </div>
    );
  }

  return (
    <div className="order-history">

      {orders.map(
        (order) => (
          <article
            key={order.id}
            className="order-card"
          >
            <div>
              <strong>
                {order.id}
              </strong>

              <p>
                {
                  new Date(
                    order.createdAt
                  ).toLocaleString("es-PE")
                }
              </p>
            </div>

            <span>
              {order.status}
            </span>

            <strong>
              S/ {
                Number(
                  order.total
                ).toFixed(2)
              }
            </strong>
          </article>
        )
      )}

    </div>
  );
}