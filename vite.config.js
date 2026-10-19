import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Mientras sea propuesta: muestra la franja de aviso y le pide a Google no indexar.
// Cambiar a false cuando sea el sitio real.
const DEMO = true

// WhatsApp y Facebook necesitan la URL completa de la imagen de vista previa.
// Netlify define URL y Vercel VERCEL_PROJECT_PRODUCTION_URL al compilar; SITIO_URL permite fijarla a mano.
function urlDelSitio() {
  const url = process.env.SITIO_URL || process.env.URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || ''
  if (!url) return ''
  return (url.startsWith('http') ? url : `https://${url}`).replace(/\/$/, '')
}

function etiquetasDelSitio() {
  return {
    name: 'etiquetas-del-sitio',
    transformIndexHtml() {
      const url = urlDelSitio()
      const etiquetas = []
      if (DEMO) etiquetas.push({ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' } })
      if (url) {
        etiquetas.push(
          { tag: 'meta', attrs: { property: 'og:url', content: `${url}/` } },
          { tag: 'meta', attrs: { property: 'og:image', content: `${url}/logo.png` } },
        )
      }
      return etiquetas
    },
  }
}

export default defineConfig({
  plugins: [vue(), etiquetasDelSitio()],
  base: './',
  define: { __DEMO__: JSON.stringify(DEMO) },
})
