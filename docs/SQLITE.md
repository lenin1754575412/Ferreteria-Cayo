# Instalación local de Ferretería Cayo

El instalador integra una base relacional SQLite y módulos de usuarios, productos, pedidos y descuentos en el proyecto Next.js existente. Conserva los archivos reemplazados en backup-sqlite-*. No migra cuentas ni pedidos de MongoDB y no incorpora la base de otra copia del proyecto.

1. Detén npm run dev con Ctrl+C.
2. Ejecuta instalar.ps1 -Proyecto con la carpeta que contiene el package.json principal.
3. Crea tu administrador con los datos solicitados por npm run db:init. La contraseña se captura sin mostrarse, se guarda con bcrypt y no existe una contraseña predeterminada.
4. Ejecuta npm run dev. Abre /login y entra en /gestion.
5. Completa los precios USD, pesos, dimensiones y garantías de los productos iniciales. El catálogo anterior no tiene esos datos; se conservan valores 0 y Por completar para evitar inventar especificaciones. Las imágenes proceden del catálogo original.

## Operación

- /registro crea clientes; /login autentica; /cuenta permite cambiar contraseña y revoca las sesiones.
- /gestion permite al administrador administrar productos, usuarios, descuentos y pedidos. El vendedor ve clientes, registra clientes, cambia contraseñas de clientes y gestiona únicamente sus propios pedidos.
- /descuentos permite guardar códigos. El cliente debe guardar los códigos antes de usarlos; el descuento total se limita al 20% del subtotal.
- /checkout guarda pedidos de la cuenta autenticada; administrador y vendedor seleccionan un cliente. Se reserva stock en una transacción; cancelar devuelve las existencias una sola vez.
- /mis-pedidos consulta la base. Los clientes solo ven sus pedidos, los vendedores solo los que registraron y los administradores todos.
- Los productos y códigos retirados se conservan para mantener las referencias del historial. Un administrador puede reactivarlos al editar.
- Solo se puede modificar o cancelar antes de Preparando envío. Las cuotas deben sumar el total del pedido. Preparar envío exige que el pago no esté marcado Sin pago.
- Cambiar productos de un pedido conserva el precio de las líneas existentes y toma el precio vigente de las nuevas.
- Las sesiones usan tokens aleatorios opacos, hash del token en base, cookie HttpOnly, SameSite=Lax y expiración de ocho horas. Se exige mismo origen en las escrituras desde navegador. HTTPS debe configurarse en el alojamiento para cifrar el tráfico.
- La base está en data/ferreteria.sqlite. SQL.js ejecuta SQLite en memoria y este proyecto exporta cada transacción al archivo mediante reemplazo atómico. Se bloquea el acceso simultáneo desde otro proceso. No ejecutes dos servidores sobre la misma base.

## Respaldo y recuperación

El servidor guarda una copia diaria en data/backups y la actualiza con las escrituras del día. Mantén también una copia externa periódica. Para respaldo manual, detén el servidor y ejecuta npm run db:backup.

Para recuperar, detén el servidor, conserva el archivo actual con otro nombre y copia una copia válida de data/backups a data/ferreteria.sqlite. Después ejecuta npm run dev y comprueba login, productos y pedidos. Las sesiones de la copia podrían estar vigentes; para revocarlas ejecuta una limpieza de sessions antes de reanudar en un entorno compartido. No borres un archivo .lock si su proceso sigue en ejecución.

Los backups se generan mientras el proceso está activo; con el equipo apagado no se producen respaldos. SQLite local con SQL.js no acredita 1000 usuarios concurrentes ni disponibilidad 99.5%. El despliegue original en Vercel requiere una base remota y no puede persistir este archivo local de forma fiable. Esta entrega es para ejecución local con un solo proceso.

## Verificación

- npm test: pruebas de integración de base, permisos, sesiones, pedidos, cuotas, descuentos e inventario.
- npm run test:coverage: cobertura del módulo nuevo engine.cjs con umbral 70%; no equivale a cobertura de toda la aplicación.
- npm exec -- tsc --noEmit y npm run build: tipos y compilación Next.js.
- Los tiempos de carga, 1000 usuarios, aprendizaje de cinco minutos, uptime y compatibilidad con Safari requieren pruebas adicionales en un entorno apropiado. No se consideran cumplidos por el instalador.
- npm audit detectó alertas críticas en Next.js original y altas en postcss y source-map-js. La corrección sugerida para Next.js cambia la versión mayor. Se necesita migrar y verificar esa actualización antes de publicar; el instalador no ejecuta audit fix --force.
- database/schema.sql contiene el esquema y docs/ER.md contiene el diagrama.

## Revertir archivos

Detén el servidor y restaura los archivos existentes desde el directorio backup-sqlite-* siguiendo manifest.json. Los archivos nuevos indicados con existed=false pueden retirarse. Conserva data antes de revertir; el respaldo de código no sustituye el respaldo de datos. El instalador no modifica .env.local, no publica en GitHub y no elimina tu catálogo original.

Base técnica: https://github.com/sql-js/sql.js y https://sql.js.org/documentation/.
