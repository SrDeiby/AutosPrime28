<script setup>
import { computed } from 'vue'
import { negocio } from '../negocio.js'

const props = defineProps({ autos: { type: Array, default: () => [] } })

const cifras = computed(() => [
  { valor: props.autos.filter((a) => a.estado === 'disponible').length, texto: 'Vehículos disponibles' },
  { valor: new Set(props.autos.map((a) => a.marca)).size, texto: 'Marcas en inventario' },
  { valor: '✓', texto: 'Financiamiento disponible' },
  { valor: '✓', texto: 'Recibimos su vehículo' },
])
</script>

<template>
  <section id="nosotros" class="nosotros">
    <div class="contenedor rejilla">
      <div class="texto">
        <p class="antetitulo">Su mejor elección</p>
        <h2>Comprar su próximo carro empieza en {{ negocio.nombre }}</h2>
        <p>
          Le ayudamos a encontrar un auto usado que se ajuste a lo que necesita y a su presupuesto, con trato directo,
          información clara de cada vehículo y la opción de manejarlo antes de decidir.
        </p>
      </div>
      <ul class="cifras">
        <li v-for="c in cifras" :key="c.texto">
          <strong>{{ c.valor }}</strong>
          <span>{{ c.texto }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.nosotros {
  padding: 80px 0;
  color: #fff;
  background:
    radial-gradient(ellipse 50% 80% at 100% 100%, rgba(240, 138, 36, 0.35), transparent 70%),
    var(--azul-oscuro);
}

.rejilla {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 48px;
  align-items: center;
}

.antetitulo {
  margin: 0 0 12px;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--naranja);
}

h2 {
  font-size: clamp(1.7rem, 3.5vw, 2.4rem);
  font-weight: 800;
}

.texto p:last-child {
  margin: 18px 0 0;
  color: var(--plata);
  font-size: 1.05rem;
}

.cifras {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.cifras li {
  padding: 24px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.cifras strong {
  display: block;
  font: 800 2.4rem var(--titulos);
  color: var(--naranja);
}

.cifras span {
  color: var(--plata);
  font-weight: 500;
}

@media (max-width: 820px) {
  .rejilla {
    grid-template-columns: 1fr;
  }
}
</style>
