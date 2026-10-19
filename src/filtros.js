import { reactive } from 'vue'

// Estado de búsqueda compartido: la portada lo llena y el inventario lo aplica.
export const RANGOS = [
  { id: 'todos', texto: 'Cualquier precio', min: 0, max: Infinity },
  { id: 'hasta6', texto: 'Hasta ₡6 millones', min: 0, max: 6_000_000 },
  { id: '6a10', texto: '₡6 a ₡10 millones', min: 6_000_000, max: 10_000_000 },
  { id: 'mas10', texto: 'Más de ₡10 millones', min: 10_000_000, max: Infinity },
]

export const filtros = reactive({
  texto: '',
  tipo: 'Todos',
  marca: 'Todas',
  rango: 'todos',
})

export function limpiarFiltros() {
  Object.assign(filtros, { texto: '', tipo: 'Todos', marca: 'Todas', rango: 'todos' })
}

const normalizar = (s) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

export function filtrarAutos(autos) {
  const rango = RANGOS.find((r) => r.id === filtros.rango)
  const texto = normalizar(filtros.texto.trim())
  return autos.filter(
    (a) =>
      (filtros.tipo === 'Todos' || a.tipo === filtros.tipo) &&
      (filtros.marca === 'Todas' || a.marca === filtros.marca) &&
      a.precio >= rango.min &&
      a.precio < rango.max &&
      (!texto || normalizar(`${a.marca} ${a.modelo} ${a.version} ${a.anio} ${a.tipo}`).includes(texto)),
  )
}

export function irAlInventario() {
  document.getElementById('inventario')?.scrollIntoView({ behavior: 'smooth' })
}
