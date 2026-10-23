<script setup lang="ts">
import { ref } from 'vue'
import type { Game } from '../data/games'

defineProps<{ jg: Game }>()
const ver = ref(false)
</script>

<template>
  <div class="gp">
    <RouterLink class="back" :to="{ name: 'home' }">← Volver</RouterLink>
    <h1>{{ jg.titulo }}</h1>
    <iframe :src="jg.youtube" :title="`Video de ${jg.titulo}`" allowfullscreen></iframe>
    <a :href="jg.roblox" target="_blank" rel="noopener noreferrer" class="play">
      Jugar en Roblox
    </a>
    <p><strong>Personajes:</strong> {{ jg.personajes }}</p>
    <button @click="ver = !ver">
      {{ ver ? 'Ocultar descripción' : 'Ver descripción' }}
    </button>
    <div v-show="ver" class="desc">
      {{ jg.descripcion }}
    </div>
  </div>
</template>

<style scoped>
.gp {
  padding: 30px;
}

.back {
  color: inherit;
}

iframe {
  width: 100%;
  aspect-ratio: 16/9;
  border: none;
  border-radius: 15px;
}

.play {
  display: block;
  background: #00b06f;
  color: white;
  text-align: center;
  padding: 15px;
  border-radius: 12px;
  text-decoration: none;
  margin: 20px 0;
}

.desc {
  background: rgba(255,255,255,.2);
  padding: 15px;
  border-radius: 12px;
}
</style>