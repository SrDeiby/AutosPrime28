<script setup>
import { computed, ref, watch } from 'vue'
import TarjetaAuto from './TarjetaAuto.vue'
import { filtros, filtrarAutos, limpiarFiltros } from '../filtros.js'

const props = defineProps({
  autos: { type: Array, required: true },
  cargando: Boolean,
  error: String,
})
defineEmits(['ver'])

const POR_PAGINA = 6
const visibles = ref(POR_PAGINA)

const marcas = computed(() => ['Todas', ...new Set(props.autos.map((a) => a.marca))])
const filtrados = computed(() => filtrarAutos(props.autos))
const hayFiltros = computed(
  () => filtros.texto || filtros.tipo !== 'Todos' || filtros.marca !== 'Todas' || filtros.rango !== 'todos',
)

watch(filtros, () => (visibles.value = POR_PAGINA))
</script>

<template>
  <section id="inventario" class="seccion">
    <div class="contenedor">
      <h2 class="seccion-titulo centrado">Explorar todos los vehículos</h2>

      <div class="marcas" role="group" aria-label="Marca">
        <button
          v-for="m in marcas"
          :key="m"
          type="button"
          :class="{ activo: filtros.marca === m }"
          :aria-pressed="filtros.marca === m"
          @click="filtros.marca = m"
        >
          {{ m === 'Todas' ? 'Todas las marcas' : m }}
        </button>
      </div>

      <p v-if="hayFiltros && !cargando" class="resumen-filtros">
        {{ filtrados.length }} {{ filtrados.length === 1 ? 'vehículo encontrado' : 'vehículos encontrados' }}
        · <button type="button" class="enlace" @click="limpiarFiltros">Quitar filtros</button>
      </p>

      <p v-if="cargando" class="aviso">Cargando vehículos…</p>
      <p v-else-if="error" class="aviso">{{ error }}</p>
      <template v-else-if="filtrados.length">
        <div class="rejilla">
          <TarjetaAuto
            v-for="auto in filtrados.slice(0, visibles)"
            :key="auto.id"
            :auto="auto"
            @ver="$emit('ver', $event)"
          />
        </div>
        <div v-if="filtrados.length > visibles" class="mas">
          <button type="button" class="boton boton-azul" @click="visibles += POR_PAGINA">Ver más</button>
        </div>
      </template>
      <div v-else class="aviso">
        No hay vehículos con esos filtros.
        <button type="button" class="enlace" @click="limpiarFiltros">Ver todos</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.centrado {
  text-align: center;
}

.marcas {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 26px 0 36px;
}

.marcas button {
  padding: 10px 22px;
  border: 0;
  border-radius: 6px;
  background: var(--blanco);
  box-shadow: 0 4px 14px rgba(20, 28, 77, 0.08);
  font: 600 0.95rem var(--cuerpo);
  color: var(--texto);
  cursor: pointer;
}

.marcas button.activo {
  background: var(--naranja);
  color: #fff;
}

.resumen-filtros {
  margin: -18px 0 24px;
  text-align: center;
  color: var(--texto-suave);
}

.rejilla {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 28px;
}

.mas {
  display: flex;
  justify-content: center;
  margin-top: 36px;
}

.aviso {
  padding: 40px;
  text-align: center;
  color: var(--texto-suave);
  background: var(--blanco);
  border-radius: var(--radio);
}

.enlace {
  border: 0;
  background: none;
  color: var(--azul);
  font: inherit;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
}
</style>
