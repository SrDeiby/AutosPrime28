<script setup>
import { reactive } from 'vue'
import Icono from './Icono.vue'
import { negocio, enlaceWhatsApp } from '../negocio.js'

const INTERESES = ['Comprar un auto', 'Financiamiento', 'Dar mi vehículo como parte de pago', 'Prueba de manejo']

const formulario = reactive({ nombre: '', interes: INTERESES[0], mensaje: '' })

// Sin servidor: el formulario arma el mensaje y abre WhatsApp.
function enviar() {
  const lineas = [
    `Hola, soy ${formulario.nombre.trim()}.`,
    `Me interesa: ${formulario.interes}.`,
    formulario.mensaje.trim(),
  ].filter(Boolean)
  window.open(enlaceWhatsApp(lineas.join('\n')), '_blank', 'noopener')
}
</script>

<template>
  <section id="contacto" class="seccion contacto">
    <div class="contenedor rejilla">
      <div>
        <p class="antetitulo">Contáctenos</p>
        <h2 class="seccion-titulo">Escríbanos y le respondemos por WhatsApp</h2>

        <form class="formulario" @submit.prevent="enviar">
          <label>
            <span>Nombre</span>
            <input v-model="formulario.nombre" required autocomplete="name" placeholder="Su nombre" />
          </label>
          <label>
            <span>¿Qué le interesa?</span>
            <select v-model="formulario.interes">
              <option v-for="i in INTERESES" :key="i">{{ i }}</option>
            </select>
          </label>
          <label class="ancho">
            <span>Mensaje</span>
            <textarea v-model="formulario.mensaje" rows="4" placeholder="Ej. Busco un SUV automático de hasta ₡8 millones" />
          </label>
          <button type="submit" class="boton boton-wa ancho"><Icono nombre="whatsapp" /> Enviar por WhatsApp</button>
        </form>
      </div>

      <div class="sucursal">
        <div class="mapa">
          <iframe :src="negocio.ubicacion.wazeEmbed" title="Mapa de ubicación de Autos Prime 28" loading="lazy" allowfullscreen></iframe>
        </div>
        <div class="datos">
          <h3>📍 Encuéntrenos en Waze como Autos Prime 28</h3>
          <ul>
            <li><Icono nombre="ubicacion" /> {{ negocio.direccion }}</li>
            <li>
              <Icono nombre="reloj" />
              <span><template v-for="linea in negocio.horario" :key="linea">{{ linea }}<br /></template></span>
            </li>
            <li><Icono nombre="telefono" /> <a :href="negocio.telefonoLink">{{ negocio.telefonoVisible }}</a></li>
          </ul>
          <div class="acciones">
            <a class="boton boton-waze" :href="negocio.ubicacion.waze" target="_blank" rel="noopener">Abrir en Waze</a>
            <a class="boton boton-azul" :href="negocio.ubicacion.googleMaps" target="_blank" rel="noopener">Google Maps</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contacto {
  background: var(--blanco);
}

.rejilla {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
}

.antetitulo {
  margin: 0 0 10px;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--naranja-oscuro);
}

.formulario {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 28px;
}

.formulario label {
  display: grid;
  gap: 6px;
  font-weight: 600;
  font-size: 0.88rem;
  color: var(--azul-oscuro);
}

.formulario input,
.formulario select,
.formulario textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--borde);
  border-radius: 10px;
  background: var(--fondo);
  font: 400 0.95rem var(--cuerpo);
  color: var(--texto);
  resize: vertical;
}

.ancho {
  grid-column: 1 / -1;
}

.sucursal {
  border-radius: 16px;
  overflow: hidden;
  background: var(--fondo);
  box-shadow: var(--sombra);
}

.mapa {
  aspect-ratio: 16 / 9;
  background: var(--azul-claro);
}

.mapa iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

.datos {
  padding: 24px;
}

.datos h3 {
  font-size: 1.05rem;
  color: var(--azul-oscuro);
}

.datos ul {
  display: grid;
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 18px 0 22px;
}

.datos li {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.datos svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--naranja);
}

.datos a:not(.boton) {
  font-weight: 600;
  color: var(--azul);
}

.acciones {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.acciones .boton {
  flex: 1 1 140px;
}

.boton-waze {
  background: #33ccff;
  color: #06243a;
}

.boton-waze:hover {
  background: #1fb8ec;
}

@media (max-width: 900px) {
  .rejilla {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .formulario {
    grid-template-columns: 1fr;
  }
}
</style>
