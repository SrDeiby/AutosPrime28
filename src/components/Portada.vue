<script setup>
import { computed } from 'vue'
import Icono from './Icono.vue'
import { filtros, RANGOS, irAlInventario } from '../filtros.js'

const props = defineProps({ autos: { type: Array, default: () => [] } })

const tipos = computed(() => ['Todos', ...new Set(props.autos.map((a) => a.tipo))])

const POPULARES = [
  { texto: 'SUVs', aplicar: () => Object.assign(filtros, { tipo: 'SUV' }) },
  { texto: 'Sedanes', aplicar: () => Object.assign(filtros, { tipo: 'Sedán' }) },
  { texto: 'Pickups', aplicar: () => Object.assign(filtros, { tipo: 'Pickup' }) },
  { texto: 'Hasta ₡6 millones', aplicar: () => Object.assign(filtros, { rango: 'hasta6' }) },
]

function popular(p) {
  p.aplicar()
  irAlInventario()
}
</script>

<template>
  <section id="inicio" class="portada">
    <div class="contenedor contenido">
      <p class="saludo">Bienvenido(a)</p>
      <h1>Autos Prime 28 · <span>Usados Costa Rica</span></h1>
      <p class="bajada"><span>💳 Financiamiento disponible</span> <span>🔄 Recibimos su vehículo como parte de pago</span></p>

      <div class="tipos" role="group" aria-label="Tipo de vehículo">
        <button
          v-for="t in tipos"
          :key="t"
          type="button"
          :class="{ activo: filtros.tipo === t }"
          :aria-pressed="filtros.tipo === t"
          @click="filtros.tipo = t"
        >
          {{ t === 'Todos' ? 'Todos' : t }}
        </button>
      </div>

      <form class="buscador" @submit.prevent="irAlInventario">
        <div class="campos">
          <label class="campo-texto">
            <Icono nombre="buscar" />
            <span class="oculto">Buscar</span>
            <input v-model="filtros.texto" type="search" placeholder="Busque por marca o modelo (ej. Toyota, Creta)" />
          </label>
          <label class="campo-precio">
            <span class="oculto">Precio</span>
            <select v-model="filtros.rango">
              <option v-for="r in RANGOS" :key="r.id" :value="r.id">{{ r.texto }}</option>
            </select>
          </label>
          <button type="submit" class="boton boton-naranja">Buscar</button>
        </div>
        <div class="populares">
          <strong>Búsquedas populares</strong>
          <div>
            <button v-for="p in POPULARES" :key="p.texto" type="button" @click="popular(p)">{{ p.texto }}</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.portada {
  position: relative;
  color: #fff;
  text-align: center;
  background:
    radial-gradient(ellipse 80% 55% at 50% 115%, rgba(247, 166, 98, 0.85), transparent 70%),
    radial-gradient(ellipse 60% 40% at 15% 0%, rgba(156, 199, 234, 0.25), transparent 70%),
    linear-gradient(180deg, #1a2459 0%, var(--azul-oscuro) 60%, #3a2d5c 100%);
}

.contenido {
  padding-top: 84px;
  padding-bottom: 96px;
}

.saludo {
  margin: 0 0 12px;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--plata);
}

h1 {
  font-size: clamp(2rem, 5vw, 3.4rem);
  font-weight: 800;
}

h1 span {
  font-style: italic;
  color: var(--durazno);
}

.bajada {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px 20px;
  margin: 14px 0 28px;
  color: var(--plata);
}

.tipos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 22px;
}

.tipos button {
  padding: 10px 18px;
  border: 0;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  font: 500 0.98rem var(--cuerpo);
  color: var(--texto-suave);
  cursor: pointer;
}

.tipos button.activo {
  background: var(--naranja);
  color: #fff;
}

.buscador {
  max-width: 760px;
  margin: 0 auto;
  border-radius: 22px;
  background: var(--blanco);
  color: var(--texto);
  text-align: left;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

.campos {
  display: flex;
  gap: 10px;
  padding: 14px;
  border-bottom: 1px solid var(--borde);
}

.campo-texto {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
  border: 1px solid var(--borde);
  border-radius: 10px;
}

.campo-texto svg {
  width: 20px;
  height: 20px;
  color: var(--texto-suave);
  flex-shrink: 0;
}

.campo-texto input {
  flex: 1;
  min-width: 0;
  padding: 13px 0;
  border: 0;
  outline: 0;
  font: 400 0.95rem var(--cuerpo);
}

.campo-precio select {
  height: 100%;
  padding: 0 12px;
  border: 1px solid var(--borde);
  border-radius: 10px;
  background: var(--blanco);
  font: 500 0.92rem var(--cuerpo);
  color: var(--texto);
}

.populares {
  padding: 14px 18px 18px;
}

.populares strong {
  display: block;
  margin-bottom: 10px;
  font-size: 0.88rem;
  color: var(--azul-oscuro);
}

.populares div {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.populares button {
  padding: 9px 14px;
  border: 0;
  border-radius: 10px;
  background: var(--azul-claro);
  font: 500 0.92rem var(--cuerpo);
  color: var(--azul);
  cursor: pointer;
}

.populares button:hover {
  background: var(--azul);
  color: #fff;
}

.oculto {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

@media (max-width: 640px) {
  .contenido {
    padding-top: 48px;
    padding-bottom: 56px;
  }

  .campos {
    flex-direction: column;
  }

  .campo-precio select {
    width: 100%;
    padding: 13px 12px;
  }
}
</style>
