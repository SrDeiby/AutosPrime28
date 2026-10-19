<script setup>
import { enlaceWhatsApp } from '../negocio.js'

const RAZONES = [
  {
    titulo: 'Financiamiento a su medida',
    texto: 'Le orientamos para tramitar el crédito de su auto y encontrar una cuota que se ajuste a su presupuesto.',
    mensaje: 'Hola, quiero información sobre el financiamiento.',
    accion: 'Consultar financiamiento',
  },
  {
    titulo: 'Recibimos su vehículo',
    texto: 'Entregue su carro actual como parte de pago y estrene uno de nuestros autos sin complicarse vendiéndolo.',
    mensaje: 'Hola, quiero dar mi vehículo como parte de pago. Les envío los datos.',
    accion: 'Cotizar mi vehículo',
  },
  {
    titulo: 'Prueba de manejo',
    texto: 'Venga, revíselo y manéjelo antes de decidir. Agende su cita por WhatsApp o llamada.',
    mensaje: 'Hola, quiero agendar una prueba de manejo.',
    accion: 'Agendar cita',
  },
  {
    titulo: 'Atención directa',
    texto: 'Hable directamente con nosotros por WhatsApp: le enviamos más fotos, videos y toda la información del auto.',
    mensaje: 'Hola, quiero más información sobre sus autos.',
    accion: 'Escribir ahora',
  },
]
</script>

<template>
  <section id="por-que" class="seccion">
    <div class="contenedor">
      <p class="antetitulo">Compre con confianza</p>
      <h2 class="seccion-titulo">¿Por qué elegir Autos Prime 28?</h2>
      <ol class="razones">
        <li v-for="(r, i) in RAZONES" :key="r.titulo">
          <span class="numero">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3>{{ r.titulo }}</h3>
          <p>{{ r.texto }}</p>
          <a :href="enlaceWhatsApp(r.mensaje)" target="_blank" rel="noopener">{{ r.accion }} →</a>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.antetitulo {
  margin: 0 0 10px;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--naranja-oscuro);
}

.razones {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
  list-style: none;
  padding: 0;
  margin: 36px 0 0;
}

.razones li {
  display: flex;
  flex-direction: column;
  padding: 28px 24px;
  border-radius: 14px;
  background: var(--blanco);
  box-shadow: 0 6px 24px rgba(20, 28, 77, 0.07);
  border-top: 4px solid var(--naranja);
}

.numero {
  font: 800 2.2rem var(--titulos);
  color: var(--azul-claro);
  -webkit-text-stroke: 1px var(--azul);
}

h3 {
  margin: 10px 0 8px;
  font-size: 1.15rem;
  color: var(--azul-oscuro);
}

p {
  margin: 0 0 18px;
  color: var(--texto-suave);
}

a {
  margin-top: auto;
  font-weight: 600;
  color: var(--azul);
  text-decoration: none;
}

a:hover {
  color: var(--naranja-oscuro);
}

@media (max-width: 1000px) {
  .razones {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .razones {
    grid-template-columns: 1fr;
  }
}
</style>
