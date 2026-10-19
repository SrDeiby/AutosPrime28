<script setup>
import { computed } from 'vue'
import Icono from './Icono.vue'
import { enlaceWhatsApp } from '../negocio.js'
import { nombreAuto, formatearPrecio, formatearKm, ETIQUETA_ESTADO } from '../inventario.js'

const props = defineProps({ auto: { type: Object, required: true } })
defineEmits(['ver'])

const vendido = computed(() => props.auto.estado === 'vendido')
const mensaje = computed(
  () => `Hola, me interesa el ${nombreAuto(props.auto)} de ${formatearPrecio(props.auto.precio)}. ¿Sigue disponible?`,
)
const especificaciones = computed(() => [
  ['auto', props.auto.marca],
  ['auto', props.auto.modelo],
  ['calendario', props.auto.anio],
  ['combustible', props.auto.combustible],
  ['velocimetro', formatearKm(props.auto.kilometraje)],
  ['engranaje', props.auto.transmision],
])
</script>

<template>
  <article class="tarjeta" :class="{ vendido }">
    <button class="foto" type="button" @click="$emit('ver', auto)" :aria-label="`Ver detalles del ${nombreAuto(auto)}`">
      <img :src="auto.fotos[0]" :alt="nombreAuto(auto)" loading="lazy" />
      <span class="fotos"><Icono nombre="camara" /> {{ auto.fotos.length }}</span>
      <span class="cintas">
        <span class="anio">{{ auto.anio }}</span>
        <span v-if="auto.estado !== 'disponible'" class="estado" :class="auto.estado">{{ ETIQUETA_ESTADO[auto.estado] }}</span>
        <span v-else-if="auto.destacado" class="estado destacado">Destacado</span>
      </span>
      <span class="etiqueta-precio">
        <small>{{ auto.negociable ? 'Precio negociable' : 'Precio' }}</small>
        {{ formatearPrecio(auto.precio) }}
      </span>
    </button>

    <div class="cuerpo">
      <p class="tipo">{{ auto.tipo }}</p>
      <h3>{{ auto.marca }} {{ auto.modelo }} {{ auto.version }}</h3>
      <p class="precio">{{ formatearPrecio(auto.precio) }}</p>
      <ul class="specs">
        <li v-for="([icono, valor], i) in especificaciones" :key="i"><Icono :nombre="icono" /> {{ valor }}</li>
      </ul>
      <div class="pie">
        <button type="button" class="ver" @click="$emit('ver', auto)">Ver detalles <Icono nombre="flecha" /></button>
        <a v-if="!vendido" class="wa" :href="enlaceWhatsApp(mensaje)" target="_blank" rel="noopener" aria-label="Preguntar por WhatsApp">
          <Icono nombre="whatsapp" />
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.tarjeta {
  display: flex;
  flex-direction: column;
  background: var(--blanco);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 6px 24px rgba(20, 28, 77, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.tarjeta:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(20, 28, 77, 0.15);
}

.foto {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  border-bottom: 4px solid var(--naranja);
  cursor: pointer;
  aspect-ratio: 4 / 3;
  background: var(--azul-claro);
  overflow: hidden;
}

.foto img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}

.tarjeta:hover .foto img {
  transform: scale(1.05);
}

.vendido .foto img {
  filter: grayscale(1);
  opacity: 0.75;
}

.fotos {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 9px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 0.8rem;
}

.fotos svg {
  width: 16px;
  height: 16px;
}

.cintas {
  position: absolute;
  top: 12px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}

.anio,
.estado {
  padding: 4px 12px;
  border-radius: 8px 0 0 8px;
  font: 800 0.85rem var(--titulos);
  color: #fff;
}

.anio {
  background: var(--azul);
}

.estado.destacado {
  background: var(--naranja);
}

.estado.reservado {
  background: #c28a00;
}

.estado.vendido {
  background: #c62f2f;
}

.etiqueta-precio {
  position: absolute;
  left: 12px;
  bottom: 12px;
  padding: 6px 12px;
  border-radius: 8px;
  background: var(--naranja);
  color: #fff;
  font: 800 1.15rem var(--titulos);
  text-align: left;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.etiqueta-precio small {
  display: block;
  font: 500 0.7rem var(--cuerpo);
  opacity: 0.9;
}

.vendido .etiqueta-precio {
  background: #555;
  text-decoration: line-through;
}

.cuerpo {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 18px 20px 6px;
}

.tipo {
  margin: 0 0 4px;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--naranja-oscuro);
}

h3 {
  font: 600 1.15rem var(--titulos);
  color: var(--azul-oscuro);
}

.precio {
  margin: 4px 0 14px;
  font-weight: 600;
  color: var(--naranja-oscuro);
}

.specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 12px;
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
  font-size: 0.88rem;
  color: var(--texto);
}

.specs li {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.specs svg {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  color: var(--texto-suave);
}

.pie {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding: 12px 0 10px;
  border-top: 1px solid var(--borde);
}

.ver {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  border: 0;
  background: none;
  font: 600 0.85rem var(--cuerpo);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--azul-oscuro);
  cursor: pointer;
}

.ver svg {
  width: 18px;
  height: 18px;
  color: var(--naranja);
  transition: transform 0.2s;
}

.ver:hover svg {
  transform: translateX(4px);
}

.wa {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--verde-wa);
  color: #fff;
}

.wa svg {
  width: 20px;
  height: 20px;
}
</style>
