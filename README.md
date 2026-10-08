# Ferretería Cayo

Plataforma web con Next.js para catálogo, carrito, pedidos, descuentos y gestión de usuarios. Incluye una base relacional SQLite y roles de cliente, vendedor y administrador.

## Ejecutar localmente

Requiere Node.js y npm. Desde la carpeta del proyecto:

```powershell
npm.cmd install
npm.cmd run db:init
npm.cmd run dev
```

El inicializador solicita los datos y una contraseña para crear el administrador. No existen credenciales predeterminadas. Abre http://localhost:3000/login y después /gestion. Para género puedes escribir 1 (Masculino) o 2 (Femenino); el teléfono exige +51 y nueve dígitos.

La base, sesiones y cuentas se guardan localmente en data/ferreteria.sqlite. Ese directorio y sus respaldos no se publican en Git. Cada equipo debe inicializar su propia base. Completa precios USD, peso, dimensiones y garantía del catálogo inicial desde Gestión.

## Verificación

```powershell
npm.cmd test
npm.cmd exec -- tsc --noEmit
npm.cmd run build
```

Las pruebas cubren usuarios, permisos, sesiones, pedidos, cuotas, descuentos, cancelación e inventario. test:coverage mide el módulo nuevo del servidor, no toda la aplicación.

## Documentación y alcance

- [Modelo relacional](docs/ER.md)
- [Operación, respaldo y recuperación](docs/SQLITE.md)
- [Esquema SQL](database/schema.sql)

Esta configuración SQLite es local y de un solo proceso. No está preparada para persistir datos en el alojamiento original de Vercel. Se requiere una base remota y una migración de Next.js para resolver las alertas de seguridad de sus dependencias antes de publicar el sitio. La subida del código a GitHub no implica que el despliegue anterior sea compatible ni acredita disponibilidad o carga de producción.
