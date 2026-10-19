<script setup>
import { ref } from 'vue'
import Icono from './Icono.vue'
import { negocio, enlaceWhatsApp } from '../negocio.js'

const ENLACES = [
  { href: '#inicio', texto: 'Inicio' },
  { href: '#inventario', texto: 'Vehículos' },
  { href: '#nosotros', texto: 'Nosotros' },
  { href: '#por-que', texto: 'Financiamiento' },
  { href: '#contacto', texto: 'Contáctenos' },
]

const menuAbierto = ref(false)
</script>

<template>
  <header class="encabezado">
    <div class="contenedor fila">
      <a href="#inicio" class="marca">
        <img :src="negocio.logo" alt="" width="44" height="44" />
        <span>Autos Prime <b>28</b></span>
      </a>

      <nav class="enlaces" :class="{ abierto: menuAbierto }">
        <a v-for="e in ENLACES" :key="e.href" :href="e.href" @click="menuAbierto = false">{{ e.texto }}</a>
      </nav>

      <a class="telefono" :href="negocio.telefonoLink">
        <Icono nombre="telefono" />
        <span><small>Llámenos</small>{{ negocio.telefonoVisible }}</span>
      </a>
      <a class="boton boton-wa compacto" :href="enlaceWhatsApp('Hola, vengo de la página de Autos Prime 28.')" target="_blank" rel="noopener" aria-label="WhatsApp">
        <Icono nombre="whatsapp" />
      </a>
      <button type="button" class="hamburguesa" :aria-expanded="menuAbierto" aria-label="Menú" @click="menuAbierto = !menuAbierto">
        <span /><span /><span />
      </button>
    </div>
  </header>
</template>

<style scoped>
.encabezado {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--blanco);
  box-shadow: 0 2px 18px rgba(20, 28, 77, 0.08);
}

.fila {
  display: flex;
  align-items: center;
  gap: 18px;
  height: 76px;
}

.marca {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font: italic 800 1.15rem var(--titulos);
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--azul-oscuro);
}

.marca img {
  border-radius: 10px;
}

.marca b {
  color: var(--naranja);
}

.enlaces {
  display: flex;
  gap: 26px;
  margin-left: auto;
}

.enlaces a {
  position: relative;
  text-decoration: none;
  font-weight: 500;
  color: var(--texto);
}

.enlaces a:hover,
.enlaces a:first-child {
  color: var(--naranja-oscuro);
}

.telefono {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 12px;
  padding-left: 22px;
  border-left: 1px solid var(--borde);
  text-decoration: none;
  font: 800 1rem var(--titulos);
  white-space: nowrap;
  color: var(--azul-oscuro);
}

.telefono svg {
  width: 22px;
  height: 22px;
  color: var(--naranja);
}

.telefono small {
  display: block;
  font: 500 0.72rem var(--cuerpo);
  color: var(--texto-suave);
}

.compacto {
  padding: 10px;
}

.hamburguesa {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  border: 0;
  background: none;
  cursor: pointer;
}

.hamburguesa span {
  width: 24px;
  height: 2px;
  background: var(--azul-oscuro);
}

@media (max-width: 1120px) {
  .telefono {
    display: none;
  }
}

@media (max-width: 820px) {
  .fila {
    height: 64px;
  }

  .compacto {
    margin-left: auto;
  }

  .hamburguesa {
    display: flex;
  }

  .enlaces {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    display: none;
    flex-direction: column;
    gap: 0;
    background: var(--blanco);
    box-shadow: 0 12px 20px rgba(20, 28, 77, 0.12);
  }

  .enlaces.abierto {
    display: flex;
  }

  .enlaces a {
    padding: 14px 20px;
    border-top: 1px solid var(--borde);
  }
}
</style>
