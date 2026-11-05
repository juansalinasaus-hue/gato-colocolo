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
4. Cada versión estable se marca con una etiqueta: `v0-github` (versión anterior), `v1.0`, `v1.1`...
5. Para volver atrás se restaura la etiqueta que se necesite.

## Datos
Los datos viven en el teléfono, no en este repositorio. Se respaldan con el botón "Descargar backup JSON" de la pestaña Payslip.
Este repositorio es público: nunca se suben backups ni datos personales.
