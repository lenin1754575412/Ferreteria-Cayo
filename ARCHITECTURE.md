# FERRETERIA CAYO

## Atomic Design + Feature-based

src/
|
|-- app/
|   |-- page.tsx
|   |-- layout.tsx
|   |-- globals.css
|   |
|   |-- productos/
|   |
|   |-- subcategorias/
|   |   `-- [slug]/
|   |
|   |-- contacto/
|   |
|   `-- carrito/
|
|-- features/
|   |
|   |-- catalog/
|   |   |
|   |   |-- data/
|   |   |
|   |   |-- lib/
|   |   |
|   |   |-- model/
|   |   |
|   |   `-- ui/
|   |       |
|   |       |-- atoms/
|   |       |
|   |       |-- molecules/
|   |       |
|   |       `-- organisms/
|   |
|   |-- navigation/
|   |   `-- ui/
|   |       |
|   |       |-- molecules/
|   |       |
|   |       `-- organisms/
|   |
|   |-- contact/
|   |
|   |-- layout/
|   |
|   `-- animations/
|
`-- shared/
    |
    |-- ui/
    |   |
    |   |-- atoms/
    |   |
    |   |-- molecules/
    |   |
    |   `-- templates/
    |
    |-- lib/
    |
    `-- types/


## REGLAS

1. app/
Solo contiene rutas y composicion de pantallas.

2. features/
Cada funcionalidad de negocio vive en su propio feature.

3. Atomic Design

Atoms:
Elementos pequeños.

Ejemplo:
ButtonLink
ProductBadge
ProductPrice
Eyebrow


Molecules:
Combinaciones pequeñas.

Ejemplo:
ProductCard
CategoryCard
SearchBar


Organisms:
Componentes grandes.

Ejemplo:
Header
Footer
MegaMenu
ProductGrid
CatalogFilters


Templates:
Estructuras reutilizables de páginas.

Ejemplo:
PageHero


4. shared/

Solo se coloca código reutilizable que no pertenece
específicamente a un dominio.


5. Importaciones

Utilizar:

@/features/catalog
@/features/navigation
@/features/contact
@/shared/ui


6. Escalabilidad futura

Para añadir autenticación:

src/features/auth


Para usuarios:

src/features/users


Para pedidos:

src/features/orders


Para pagos:

src/features/payments


Para carrito completo:

src/features/cart


Para panel administrador:

src/features/admin


Para inventario:

src/features/inventory


Para marcas:

src/features/brands


Para promociones:

src/features/promotions