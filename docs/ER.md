# Modelo relacional de Ferretería Cayo

```mermaid
erDiagram
 users ||--o{ sessions : autentica
 users ||--o{ orders : cliente
 users o|--o{ orders : vendedor
 categories ||--o{ products : clasifica
 orders ||--|{ order_items : contiene
 products ||--o{ order_items : referencia
 orders ||--o{ installments : financia
 orders ||--o{ order_discounts : aplica
 discounts ||--o{ order_discounts : registra
 users ||--o{ user_discounts : guarda
 discounts ||--o{ user_discounts : disponible
 users {
  TEXT id PK
  TEXT email UK
  TEXT password_hash
  TEXT role
 }
 products {
  TEXT id PK
  TEXT sku UK
  TEXT category_id FK
  INTEGER price_cents
  INTEGER usd_cents
  INTEGER stock
 }
 orders {
  TEXT id PK
  TEXT customer_id FK
  TEXT seller_id FK
  TEXT payment_status
  TEXT delivery_status
  INTEGER total_cents
 }
 order_items {
  TEXT order_id PK,FK
  TEXT product_id PK,FK
  INTEGER quantity
  INTEGER price_cents
 }
```

Los importes monetarios se guardan en céntimos. order_items conserva nombre, SKU y precio de la compra. order_discounts conserva el código, tipo y valor aplicados. Las claves foráneas impiden eliminar referencias históricas. audit_log conserva actor, acción, entidad y fecha de las operaciones críticas sin contraseñas ni tokens. El esquema completo es database/schema.sql.
