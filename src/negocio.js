// Datos fijos de la venta. Lo marcado "POR CONFIRMAR" es texto de prueba.
const telefono = '72148562'
const lat = 9.949429
const lon = -84.099762

export const negocio = {
  nombre: 'Autos Prime 28',
  logo: `${import.meta.env.BASE_URL}logo.png`,
  telefonoVisible: '7214-8562',
  telefonoLink: `tel:+506${telefono}`,
  whatsapp: `506${telefono}`,
  direccion: 'San José, Costa Rica (dirección exacta POR CONFIRMAR)',
  horario: ['Lunes a sábado: 8:00 a. m. – 6:00 p. m.', 'Domingo: con cita (POR CONFIRMAR)'],
  ubicacion: {
    wazeEmbed: `https://embed.waze.com/iframe?zoom=16&lat=${lat}&lon=${lon}&pin=1`,
    waze: `https://www.waze.com/ul?ll=${lat}%2C${lon}&navigate=yes`,
    googleMaps: `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lon}`,
  },
  redes: {
    instagram: 'https://www.instagram.com/autosprime_28/',
    facebook: 'https://www.facebook.com/share/1CVkjmLBe7/',
  },
}

export function enlaceWhatsApp(mensaje) {
  return `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(mensaje)}`
}
