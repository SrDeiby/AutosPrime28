<script setup>
// Se muestra solo mientras DEMO sea true en vite.config.js.
const visible = __DEMO__
</script>

<template>
  <div v-if="visible" class="aviso-demo" role="note">
    <strong>Propuesta</strong> · Sitio de demostración: los autos, fotos y precios son de ejemplo.
  </div>
</template>

<style scoped>
.aviso-demo {
  padding: 8px 16px;
  background: var(--naranja);
  color: #fff;
  font-size: 0.85rem;
  text-align: center;
}

.aviso-demo strong {
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
</style>
