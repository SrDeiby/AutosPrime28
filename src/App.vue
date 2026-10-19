<script setup>
import { onMounted, ref } from 'vue'
import AvisoDemo from './components/AvisoDemo.vue'
import Encabezado from './components/Encabezado.vue'
import Portada from './components/Portada.vue'
import Inventario from './components/Inventario.vue'
import DetalleAuto from './components/DetalleAuto.vue'
import Nosotros from './components/Nosotros.vue'
import PorQue from './components/PorQue.vue'
import Contacto from './components/Contacto.vue'
import PiePagina from './components/PiePagina.vue'
import { cargarInventario } from './inventario.js'

const autos = ref([])
const cargando = ref(true)
const error = ref('')
const autoAbierto = ref(null)

onMounted(async () => {
  try {
    autos.value = await cargarInventario()
  } catch (e) {
    error.value = 'No pudimos cargar los vehículos. Escríbanos por WhatsApp y con gusto le ayudamos.'
    console.error(e)
  } finally {
    cargando.value = false
  }
})
</script>

<template>
  <AvisoDemo />
  <Encabezado />
  <main>
    <Portada :autos="autos" />
    <Inventario :autos="autos" :cargando="cargando" :error="error" @ver="autoAbierto = $event" />
    <Nosotros :autos="autos" />
    <PorQue />
    <Contacto />
  </main>
  <PiePagina />
  <DetalleAuto v-if="autoAbierto" :auto="autoAbierto" @cerrar="autoAbierto = null" />
</template>
