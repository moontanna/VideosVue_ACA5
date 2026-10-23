<script setup lang="ts">
import type { Game } from '../data/games'

const props = defineProps<{ jg: Game }>()
</script>

<template>
  <RouterLink class="card-link" :to="{ name: 'game', params: { id: props.jg.id } }">
    <div class="card">
      <img :src="props.jg.imagen" :alt="props.jg.titulo">
      <div class="info">
        <h3>{{ props.jg.titulo }}</h3>
        <p>{{ props.jg.categoria }}</p>
        <p>{{ props.jg.descripcion }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.card-link {
  color: inherit;
  text-decoration: none;
}

.card {
  background: white;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
}

img {
  width:100%;
  height:130px;
  display:block;
  object-fit:cover;
}
</style>