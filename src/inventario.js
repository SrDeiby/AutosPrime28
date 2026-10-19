// Único punto que sabe de dónde vienen los autos.
// Para cambiar a un Google Sheet o un CMS, solo se reemplaza cargarInventario().
export async function cargarInventario() {
  const respuesta = await fetch(`${import.meta.env.BASE_URL}autos.json`)
  if (!respuesta.ok) throw new Error(`No se pudo cargar el inventario (${respuesta.status})`)
  return ordenarInventario(await respuesta.json())
}

const PRIORIDAD_ESTADO = { disponible: 0, reservado: 1, vendido: 2 }

// Destacados primero, luego disponibles del más nuevo al más viejo, luego reservados y vendidos.
export function ordenarInventario(autos) {
  return [...autos].sort((a, b) => {
    const porEstado = PRIORIDAD_ESTADO[a.estado] - PRIORIDAD_ESTADO[b.estado]
    if (porEstado) return porEstado
    const porDestacado = Number(b.destacado) - Number(a.destacado)
    if (porDestacado) return porDestacado
    return b.anio - a.anio
  })
}

export function nombreAuto(auto) {
  return `${auto.marca} ${auto.modelo} ${auto.anio}`
}

export function formatearPrecio(colones) {
  return '₡' + colones.toLocaleString('en-US').replaceAll(',', ' ')
}

export function formatearKm(km) {
  return km.toLocaleString('en-US').replaceAll(',', ' ') + ' km'
}

export const ETIQUETA_ESTADO = { disponible: 'Disponible', reservado: 'Reservado', vendido: 'Vendido' }
