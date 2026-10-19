<script setup>
import Icono from './Icono.vue'
import { negocio, enlaceWhatsApp } from '../negocio.js'
</script>

<template>
  <footer class="pie">
    <div class="contenedor fila">
      <div class="marca">
        <img :src="negocio.logo" alt="" width="56" height="56" />
        <div>
          <strong>Autos Prime 28</strong>
          <p>Autos usados · Financiamiento · Recibimos su vehículo</p>
        </div>
      </div>
      <nav class="acceso">
        <strong>Acceso rápido</strong>
        <a href="#inventario">Vehículos</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#por-que">Financiamiento</a>
        <a href="#contacto">Contáctenos</a>
      </nav>
      <div class="contacto">
        <p>📲 Llámenos o escríbanos al <a :href="negocio.telefonoLink">{{ negocio.telefonoVisible }}</a> y agende su prueba de manejo.</p>
        <div class="redes">
          <a :href="enlaceWhatsApp('Hola, vengo de la página de Autos Prime 28.')" target="_blank" rel="noopener" aria-label="WhatsApp"><Icono nombre="whatsapp" /></a>
          <a :href="negocio.redes.instagram" target="_blank" rel="noopener" aria-label="Instagram"><Icono nombre="instagram" /></a>
          <a :href="negocio.redes.facebook" target="_blank" rel="noopener" aria-label="Facebook"><Icono nombre="facebook" /></a>
        </div>
      </div>
    </div>
    <p class="contenedor legal">© {{ new Date().getFullYear() }} Autos Prime 28 · Costa Rica</p>
  </footer>

  <a class="flotante" :href="enlaceWhatsApp('Hola, vengo de la página de Autos Prime 28.')" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp">
    <Icono nombre="whatsapp" />
  </a>
</template>

<style scoped>
.pie {
  background: #0c1236;
  color: var(--plata);
  padding: 48px 0 24px;
}

.fila {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 28px;
}

.marca {
  display: flex;
  gap: 14px;
  align-items: center;
}

.marca img {
  border-radius: 12px;
}

.marca strong {
  font: italic 800 1.2rem var(--titulos);
  color: #fff;
  text-transform: uppercase;
}

.marca p,
.contacto p {
  margin: 4px 0 0;
  font-size: 0.92rem;
}

.acceso {
  display: grid;
  gap: 6px;
  font-size: 0.92rem;
}

.acceso strong {
  color: #fff;
  margin-bottom: 4px;
}

.acceso a {
  text-decoration: none;
}

.acceso a:hover {
  color: var(--naranja);
}

.contacto {
  max-width: 320px;
}

.contacto a {
  color: #fff;
  font-weight: 600;
}

.redes {
  display: flex;
  gap: 10px;
  margin-top: 14px;
}

.redes a {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
}

.redes a:hover {
  background: var(--naranja);
}

.redes svg {
  width: 20px;
  height: 20px;
}

.legal {
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.82rem;
  opacity: 0.7;
}

.flotante {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 30;
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: var(--verde-wa);
  color: #fff;
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.45);
}

.flotante svg {
  width: 32px;
  height: 32px;
}
</style>
