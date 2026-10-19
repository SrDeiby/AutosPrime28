<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import Icono from './Icono.vue'
import { negocio, enlaceWhatsApp } from '../negocio.js'
import { nombreAuto, formatearPrecio, formatearKm, ETIQUETA_ESTADO } from '../inventario.js'

const props = defineProps({ auto: { type: Object, required: true } })
const emit = defineEmits(['cerrar'])

const indice = ref(0)
const fotos = computed(() => props.auto.fotos)
const vendido = computed(() => props.auto.estado === 'vendido')

const ficha = computed(() => [
  ['Año', props.auto.anio],
  ['Kilometraje', formatearKm(props.auto.kilometraje)],
  ['Motor', props.auto.motor],
  ['Combustible', props.auto.combustible],
  ['Transmisión', props.auto.transmision],
  ['Tracción', props.auto.traccion],
  ['Pasajeros', props.auto.pasajeros],
  ['Color', props.auto.color],
  ['Procedencia', props.auto.procedencia === 'nacional' ? 'Nacional' : 'Importado'],
])

const mensajePrueba = computed(
  () =>
    `Hola, quiero agendar una prueba de manejo del ${nombreAuto(props.auto)} de ${formatearPrecio(props.auto.precio)}.`,
)

function mover(paso) {
  indice.value = (indice.value + paso + fotos.value.length) % fotos.value.length
}

function teclas(e) {
  if (e.key === 'Escape') emit('cerrar')
  if (e.key === 'ArrowRight') mover(1)
  if (e.key === 'ArrowLeft') mover(-1)
}

onMounted(() => {
  document.addEventListener('keydown', teclas)
  document.body.style.overflow = 'hidden'
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', teclas)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="fondo" @click.self="emit('cerrar')">
    <div class="ventana" role="dialog" aria-modal="true" :aria-label="nombreAuto(auto)">
      <button type="button" class="cerrar" aria-label="Cerrar" @click="emit('cerrar')">
        <Icono nombre="cerrar" />
      </button>

      <div class="galeria">
        <img :src="fotos[indice]" :alt="`${nombreAuto(auto)}, foto ${indice + 1}`" :class="{ gris: vendido }" />
        <template v-if="fotos.length > 1">
          <button type="button" class="flecha izq" aria-label="Foto anterior" @click="mover(-1)">
            <Icono nombre="izquierda" />
          </button>
          <button type="button" class="flecha der" aria-label="Foto siguiente" @click="mover(1)">
            <Icono nombre="derecha" />
          </button>
          <div class="miniaturas">
            <button
              v-for="(foto, i) in fotos"
              :key="foto"
              type="button"
              :class="{ activa: i === indice }"
              :aria-label="`Ver foto ${i + 1}`"
              @click="indice = i"
            >
              <img :src="foto" alt="" />
            </button>
          </div>
        </template>
      </div>

      <div class="info">
        <p class="lemas">{{ auto.lemas.join(' • ') }}</p>
        <h2>{{ auto.marca }} {{ auto.modelo }} {{ auto.version }} <span>{{ auto.anio }}</span></h2>
        <p class="precio">
          💰 {{ formatearPrecio(auto.precio) }}
          <small v-if="auto.negociable">Negociable</small>
          <small v-if="auto.estado !== 'disponible'" :class="['estado', auto.estado]">{{ ETIQUETA_ESTADO[auto.estado] }}</small>
        </p>
        <p class="resumen">{{ auto.resumen }}</p>

        <dl class="ficha">
          <div v-for="[nombre, valor] in ficha" :key="nombre">
            <dt>{{ nombre }}</dt>
            <dd>{{ valor }}</dd>
          </div>
        </dl>

        <h3>Equipamiento</h3>
        <ul class="equipamiento">
          <li v-for="item in auto.equipamiento" :key="item"><Icono nombre="check" /> {{ item }}</li>
        </ul>

        <ul v-if="auto.extras?.length" class="extras">
          <li v-for="extra in auto.extras" :key="extra">{{ extra }}</li>
        </ul>

        <p class="beneficios">💳 Financiamiento disponible &nbsp;·&nbsp; 🔄 Recibimos su vehículo como parte de pago</p>

        <div v-if="!vendido" class="acciones">
          <a class="boton boton-wa" :href="enlaceWhatsApp(mensajePrueba)" target="_blank" rel="noopener">
            <Icono nombre="calendario" /> Agendar prueba de manejo
          </a>
          <a class="boton boton-azul" :href="negocio.telefonoLink">
            <Icono nombre="telefono" /> Llamar {{ negocio.telefonoVisible }}
          </a>
        </div>
        <p v-else class="vendido-aviso">
          Este auto ya se vendió. <a :href="enlaceWhatsApp(`Hola, vi que el ${nombreAuto(auto)} ya se vendió. ¿Tienen algo parecido?`)" target="_blank" rel="noopener">Pregúntenos por uno parecido</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fondo {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(10, 14, 40, 0.7);
  backdrop-filter: blur(4px);
}

.ventana {
  position: relative;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  width: min(1100px, 100%);
  max-height: calc(100vh - 40px);
  background: var(--blanco);
  border-radius: 20px;
  overflow: hidden;
}

.cerrar {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.cerrar svg,
.flecha svg {
  width: 22px;
  height: 22px;
}

.galeria {
  position: relative;
  display: flex;
  flex-direction: column;
  background: #0e1335;
}

.galeria > img {
  flex: 1;
  width: 100%;
  min-height: 0;
  object-fit: cover;
}

.gris {
  filter: grayscale(1);
}

.flecha {
  position: absolute;
  top: calc(50% - 40px);
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  cursor: pointer;
}

.izq {
  left: 12px;
}

.der {
  right: 12px;
}

.miniaturas {
  display: flex;
  gap: 8px;
  padding: 10px;
  overflow-x: auto;
}

.miniaturas button {
  flex: 0 0 72px;
  height: 54px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  opacity: 0.6;
  cursor: pointer;
}

.miniaturas button.activa {
  border-color: var(--naranja);
  opacity: 1;
}

.miniaturas img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  padding: 28px 28px 32px;
  overflow-y: auto;
}

.lemas {
  margin: 0 0 6px;
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--naranja-oscuro);
}

h2 {
  font-size: 1.6rem;
  color: var(--azul-oscuro);
  padding-right: 40px;
}

h2 span {
  color: var(--texto-suave);
  font-weight: 600;
}

.precio {
  margin: 10px 0;
  font: 800 1.7rem var(--titulos);
  color: var(--azul);
}

.precio small {
  margin-left: 6px;
  padding: 3px 9px;
  border-radius: 6px;
  background: var(--azul-claro);
  font: 600 0.75rem var(--cuerpo);
  vertical-align: middle;
}

.precio small.reservado {
  background: #fdf1d2;
  color: #8a6200;
}

.precio small.vendido {
  background: #fbe0e0;
  color: #a12424;
}

.resumen {
  color: var(--texto-suave);
  margin: 0 0 18px;
}

.ficha {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 0 0 22px;
}

.ficha div {
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--fondo);
}

.ficha dt {
  font-size: 0.75rem;
  color: var(--texto-suave);
}

.ficha dd {
  margin: 0;
  font-weight: 600;
}

h3 {
  font-size: 1.05rem;
  color: var(--azul-oscuro);
  margin-bottom: 10px;
}

.equipamiento {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 16px;
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
  font-size: 0.92rem;
}

.equipamiento li {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.equipamiento svg {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  flex-shrink: 0;
  color: var(--verde-wa-oscuro);
}

.extras {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
}

.extras li {
  padding: 4px 12px;
  border-radius: 999px;
  background: var(--azul-claro);
  color: var(--azul);
  font-weight: 600;
  font-size: 0.82rem;
}

.beneficios {
  padding: 12px 14px;
  border-radius: 12px;
  background: #fff4e8;
  color: #7a4310;
  font-weight: 500;
  font-size: 0.92rem;
}

.acciones {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.acciones .boton {
  flex: 1 1 220px;
}

.vendido-aviso a {
  color: var(--azul);
  font-weight: 600;
}

@media (max-width: 820px) {
  .fondo {
    padding: 0;
    place-items: stretch;
  }

  .ventana {
    grid-template-columns: 1fr;
    max-height: 100vh;
    border-radius: 0;
    overflow-y: auto;
  }

  .galeria > img {
    aspect-ratio: 4 / 3;
    flex: none;
  }

  .info {
    overflow: visible;
    padding: 22px 16px 32px;
  }

  .equipamiento {
    grid-template-columns: 1fr;
  }
}
</style>
