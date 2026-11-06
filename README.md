# Budget Salinas

App personal de presupuesto, instalada como PWA en el teléfono.

## Archivos
- `index.html`: la app completa.
- `sw.js`: service worker (funciona sin internet y siempre busca la última versión).
- `manifest.json` e `icon.png`: instalación como app.

## Cómo se trabaja
1. El código se diseña y se prueba en el chat con Claude.
2. Cuando está listo y aprobado, se sube directo a `main`. No se usan ramas.
3. `main` es lo que se ve en el teléfono.
4. Cada versión estable se publica en la sección Releases con un nombre claro: `version-original` (antes de la actualización), `version-1`, `version-2`...
5. Para volver atrás se abre la versión que se necesite en Releases y se restaura su código.

## Datos
Los datos viven en el teléfono, no en este repositorio. Se respaldan con el botón "Descargar backup JSON" de la pestaña Payslip.
Este repositorio es público: nunca se suben backups ni datos personales.
