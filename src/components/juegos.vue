<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { gameplaysJuegos } from '../data/games'
import { juegosTienda } from '../data/tienda'

const route = useRoute()
const game = computed(() => juegosTienda.find((item) => item.titulo === route.params.titulo))
const gameplay = computed(() => {
  const title = game.value?.titulo.replace('â€™', '’')
  return gameplaysJuegos.find((item) => item.titulo === title)?.gameplay
})
const price = computed(() => game.value?.precio.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }))
</script>

<template>
  <main v-if="game" class="game-detail">
    <RouterLink class="back-link" :to="{ name: 'tienda' }">← Volver a la tienda</RouterLink>
    <section class="detail-hero">
      <img class="detail-cover" :src="game.imagen" :alt="`Portada de ${game.titulo}`">
      <div class="detail-copy">
        <p class="eyebrow">DETALLES DEL JUEGO</p>
        <h1>{{ game.titulo }}</h1>
        <p class="description">{{ game.descripcion }}</p>
        <p v-if="game.estreno" class="release">Estreno: {{ game.estreno }}</p>
        <strong class="price">{{ price }}</strong>
      </div>
    </section>
    <section class="gameplay-section">
      <h2>Conoce el juego</h2>
      <div v-if="gameplay" class="video-wrapper">
        <iframe :src="gameplay" :title="`Gameplay de ${game.titulo}`" allowfullscreen></iframe>
      </div>
    </section>
  </main>
  <main v-else class="not-found">
    <h1>Juego no encontrado</h1>
    <RouterLink class="back-link" :to="{ name: 'tienda' }">Volver a la tienda</RouterLink>
  </main>
</template>

<style scoped>
.game-detail, .not-found { width: min(calc(100% - 48px), 1100px); margin: 0 auto; padding: 34px 0 70px; text-align: left; }
.back-link { color: #71e2ff; font-size: 13px; font-weight: 700; text-decoration: none; }
.detail-hero { display: grid; grid-template-columns: minmax(260px, 430px) 1fr; gap: 42px; align-items: center; margin-top: 24px; padding: 24px; background: rgba(28, 27, 38, .92); border: 1px solid #383846; border-radius: 18px; }
.detail-cover { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 10px; }
.eyebrow { margin: 0 0 9px; color: #71e2ff; font-size: 11px; font-weight: 800; letter-spacing: 2px; }
h1 { margin: 0 0 16px; font-size: clamp(30px, 5vw, 52px); }.description { color: #cbc9d7; font-size: 16px; line-height: 1.6; }.release { color: #9993a4; font-size: 13px; }.price { display: block; margin-top: 20px; color: #ff70ad; font-size: 25px; }.gameplay-section { margin-top: 42px; }.gameplay-section h2 { margin: 0 0 17px; color: #f5f4fb; }.video-wrapper { overflow: hidden; aspect-ratio: 16 / 9; background: #11111a; border: 1px solid #383846; border-radius: 14px; }.video-wrapper iframe { width: 100%; height: 100%; border: 0; }.not-found h1 { margin-bottom: 20px; }
@media (max-width: 700px) { .game-detail, .not-found { width: min(100% - 28px, 1100px); padding-top: 24px; }.detail-hero { grid-template-columns: 1fr; gap: 22px; padding: 16px; } }
</style>
