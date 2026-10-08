PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS users (
 id TEXT PRIMARY KEY, names TEXT NOT NULL, surnames TEXT NOT NULL, birth_date TEXT NOT NULL,
 gender TEXT NOT NULL CHECK(gender IN ('Masculino','Femenino')), phone TEXT NOT NULL,
 email TEXT NOT NULL UNIQUE COLLATE NOCASE, password_hash TEXT NOT NULL,
 role TEXT NOT NULL CHECK(role IN ('cliente','vendedor','admin')), employee_code TEXT UNIQUE,
 created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS sessions (
 token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, expires_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS categories (id TEXT PRIMARY KEY, name TEXT NOT NULL UNIQUE);
CREATE TABLE IF NOT EXISTS products (
 id TEXT PRIMARY KEY, sku TEXT NOT NULL UNIQUE, slug TEXT NOT NULL UNIQUE, category_id TEXT NOT NULL REFERENCES categories(id),
 name TEXT NOT NULL, brand TEXT NOT NULL, description TEXT NOT NULL, price_cents INTEGER NOT NULL CHECK(price_cents>=0),
 usd_cents INTEGER NOT NULL CHECK(usd_cents>=0), stock INTEGER NOT NULL CHECK(stock>=0), images_json TEXT NOT NULL,
 specs_json TEXT NOT NULL, weight REAL NOT NULL CHECK(weight>=0), dimensions TEXT NOT NULL, warranty TEXT NOT NULL,
 old_price_cents INTEGER, active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)), featured INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS discounts (
 id TEXT PRIMARY KEY, code TEXT NOT NULL UNIQUE CHECK(length(code)=12), description TEXT NOT NULL,
 type TEXT NOT NULL CHECK(type IN ('Porcentaje','Monto fijo')), value REAL NOT NULL CHECK(value>0),
 active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1))
);
CREATE TABLE IF NOT EXISTS user_discounts (
 user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, discount_id TEXT NOT NULL REFERENCES discounts(id) ON DELETE CASCADE,
 PRIMARY KEY(user_id,discount_id)
);
CREATE TABLE IF NOT EXISTS orders (
 id TEXT PRIMARY KEY, customer_id TEXT NOT NULL REFERENCES users(id), seller_id TEXT REFERENCES users(id),
 created_at TEXT NOT NULL, payment_status TEXT NOT NULL CHECK(payment_status IN ('Sin pago','En cuotas','Pago confirmado')),
 delivery_status TEXT NOT NULL CHECK(delivery_status IN ('Pendiente confirmación de pago','Preparando envío','Enviado','Entregado','Cancelado')),
 department TEXT NOT NULL, province TEXT NOT NULL, district TEXT NOT NULL, address TEXT NOT NULL, delivery TEXT NOT NULL,
 notes TEXT NOT NULL, subtotal_cents INTEGER NOT NULL, discount_cents INTEGER NOT NULL, total_cents INTEGER NOT NULL CHECK(total_cents>=0)
);
CREATE TABLE IF NOT EXISTS order_items (
 order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE, product_id TEXT NOT NULL REFERENCES products(id),
 sku TEXT NOT NULL, name TEXT NOT NULL, price_cents INTEGER NOT NULL, quantity INTEGER NOT NULL CHECK(quantity>0),
 PRIMARY KEY(order_id,product_id)
);
CREATE TABLE IF NOT EXISTS installments (
 id TEXT PRIMARY KEY, order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
 amount_cents INTEGER NOT NULL CHECK(amount_cents>0), due_date TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS order_discounts (
 order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE, discount_id TEXT NOT NULL REFERENCES discounts(id),
 code TEXT NOT NULL, type TEXT NOT NULL, value REAL NOT NULL, PRIMARY KEY(order_id,discount_id)
);
CREATE TABLE IF NOT EXISTS audit_log (
 id TEXT PRIMARY KEY, actor_id TEXT, action TEXT NOT NULL, entity_id TEXT, created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id,created_at);
CREATE INDEX IF NOT EXISTS idx_orders_seller ON orders(seller_id,created_at);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id,active);
