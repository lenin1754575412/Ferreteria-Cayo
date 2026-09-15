"use client";

import {
  useState
} from "react";

export function AdminPanel() {

  const [key, setKey] =
    useState("");

  const [products, setProducts] =
    useState<any[]>([]);

  const [orders, setOrders] =
    useState<any[]>([]);

  const [message, setMessage] =
    useState("");

  async function request(
    url: string,
    options: RequestInit = {}
  ) {
    return fetch(url, {
      ...options,
      headers: {
        "Content-Type":
          "application/json",

        "x-admin-key":
          key,

        ...(options.headers ?? {})
      }
    });
  }

  async function loadProducts() {
    const response =
      await request(
        "/api/admin/products"
      );

    const data =
      await response.json();

    if (!response.ok) {
      setMessage(
        data.error ??
        "No autorizado"
      );

      return;
    }

    setProducts(
      data.products
    );

    setMessage(
      `${data.products.length} productos`
    );
  }

  async function seed() {
    const response =
      await request(
        "/api/admin/seed",
        {
          method: "POST"
        }
      );

    const data =
      await response.json();

    setMessage(
      data.message ??
      `Productos cargados: ${data.count ?? 0}`
    );

    if (response.ok) {
      await loadProducts();
    }
  }

  async function loadOrders() {
    const response =
      await request(
        "/api/admin/orders"
      );

    const data =
      await response.json();

    if (!response.ok) {
      setMessage(
        data.error ??
        "Error"
      );

      return;
    }

    setOrders(
      data.orders
    );
  }

  async function remove(
    product: any
  ) {
    if (
      !confirm(
        `Eliminar ${product.name}?`
      )
    ) {
      return;
    }

    await request(
      `/api/admin/products?id=${encodeURIComponent(product.id)}`,
      {
        method: "DELETE"
      }
    );

    await loadProducts();
  }

  return (
    <div className="admin-panel">

      <section className="admin-login">

        <h2>
          Administrador
        </h2>

        <input
          type="password"
          placeholder="ADMIN_KEY"
          value={key}
          onChange={(event) =>
            setKey(
              event.target.value
            )
          }
        />

        <button
          className="btn"
          type="button"
          onClick={loadProducts}
        >
          Ver productos
        </button>

        <button
          className="btn btn-dark"
          type="button"
          onClick={seed}
        >
          Cargar productos iniciales
        </button>

        <button
          className="btn btn-dark"
          type="button"
          onClick={loadOrders}
        >
          Ver pedidos
        </button>

        <p>
          {message}
        </p>

      </section>

      {products.length > 0 ? (
        <section className="admin-products">

          <h2>
            Productos
          </h2>

          {products.map(
            (product) => (
              <article
                className="admin-row"
                key={product.id}
              >
                <img
                  src={product.img}
                  alt={product.name}
                />

                <div>
                  <strong>
                    {product.name}
                  </strong>

                  <p>
                    {product.brand}
                  </p>
                </div>

                <span>
                  S/ {
                    Number(
                      product.price
                    ).toFixed(2)
                  }
                </span>

                <span>
                  Stock: {product.stock}
                </span>

                <button
                  className="danger-button"
                  type="button"
                  onClick={() =>
                    remove(product)
                  }
                >
                  Eliminar
                </button>
              </article>
            )
          )}

        </section>
      ) : null}

      {orders.length > 0 ? (
        <section className="admin-products">

          <h2>
            Pedidos
          </h2>

          {orders.map(
            (order) => (
              <article
                className="admin-order-row"
                key={order.id}
              >
                <div>
                  <strong>
                    {order.id}
                  </strong>

                  <p>
                    {order.customer?.name}
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

        </section>
      ) : null}

    </div>
  );
}