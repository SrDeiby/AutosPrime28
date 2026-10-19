# Autos Prime 28 · Home (propuesta)

Home en Vue 3 + Vite. El inventario se carga desde `public/autos.json`.

## Correr

```bash
npm install
npm run dev
```

Para publicar: `npm run build` y subir la carpeta `dist/` (Netlify, GitHub Pages…).

## Agregar o editar un auto

Editar `public/autos.json`. Cada auto:

| Campo | Ejemplo | Notas |
| --- | --- | --- |
| `id` | `"hyundai-creta-2021-blanco"` | Único, sin espacios |
| `marca`, `modelo`, `version` | `"Hyundai"`, `"Creta"`, `"GL"` | |
| `anio` | `2021` | |
| `tipo` | `"SUV"` | Los filtros salen de aquí (SUV, Sedán, Pickup…) |
| `kilometraje` | `48000` | En km, solo el número |
| `motor`, `transmision`, `traccion` | `"1.5 gasolina"`, `"Automática"`, `"4x2"` | |
| `combustible` | `"Gasolina"` | Gasolina, Diésel, Híbrido o Eléctrico |
| `pasajeros`, `color` | `5`, `"Blanco"` | |
| `procedencia` | `"nacional"` o `"importado"` | |
| `precio` | `5450000` | En colones, sin puntos ni ₡ |
| `negociable` | `true` / `false` | |
| `estado` | `"disponible"`, `"reservado"` o `"vendido"` | |
| `destacado` | `true` / `false` | Sale de primero |
| `lemas` | `["Moderno", "Económico"]` | |
| `resumen` | texto | |
| `equipamiento` | `["Sunroof", "..."]` | Se muestran con ✅ |
| `extras` | `["Único dueño"]` | Opcional |
| `fotos` | `["fotos/creta/1.jpg"]` | La primera es la portada. Pueden ser URLs o archivos dentro de `public/` |

Los datos del negocio (teléfono, ubicación, horario, redes) están en `src/negocio.js`.
El único archivo que sabe de dónde vienen los autos es `src/inventario.js`.

## Modo propuesta

En `vite.config.js`, `DEMO = true` muestra la franja "Propuesta · autos de ejemplo" y le pide a Google no indexar el sitio. Cambiarlo a `false` cuando sea el sitio real.

La imagen de vista previa al compartir el link (WhatsApp, Facebook) necesita la URL completa del sitio. En Netlify y Vercel se toma sola al compilar; en otro hosting, definir la variable `SITIO_URL` (ej. `https://autosprime28.netlify.app`).
