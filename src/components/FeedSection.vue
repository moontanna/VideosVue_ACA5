<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Videocard from './Videocard.vue'
import { videos } from '../data/games'

const route = useRoute()
const searchQuery = computed(() => {
  const query = route.query.q
  return typeof query === 'string' ? query.trim().toLowerCase() : ''
})

const visibleVideos = computed(() => {
  if (searchQuery.value) {
    return videos.filter((video) => {
      const searchableText = [video.titulo, video.creador, video.juego, video.categoria]
        .join(' ')
        .toLowerCase()

      return searchableText.includes(searchQuery.value)
    })
  }

  // Mezclamos todos los videos al azar y seleccionamos solo la mitad.
  const shuffled = [...videos].sort(() => Math.random() - 0.5)
  const mitad = Math.ceil(shuffled.length / 2)
  return shuffled.slice(0, mitad)
})
</script>

<template>
  <main class="feed">
    <header class="feed-heading">
      <div>
        <p class="eyebrow">PARA TI</p>
        <h1>{{ searchQuery ? `Resultados para "${searchQuery}"` : 'Videos recomendados' }}</h1>
      </div>
    </header>

    <section v-if="visibleVideos.length" class="video-grid" aria-label="Videos recomendados">
      <Videocard v-for="video in visibleVideos" :key="video.id" :video="video" />
    </section>
    <p v-else class="empty-state">No encontramos videos que coincidan con tu búsqueda.</p>
  </main>
</template>

<style scoped>
.feed {
  width: min(100% - 48px, 1440px);
  margin: 0 auto;
  padding: 32px 0 56px;
  text-align: left;
}

.feed-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 26px;
}

.eyebrow {
  margin: 0 0 6px;
  color: #71e2ff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.8px;
}

.feed-heading h1 {
  margin: 0;
  color: #f5f4fb;
  font-size: var(--heading-xl);
  font-weight: 700;
  letter-spacing: -0.5px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 270px), 1fr));
  gap: 32px 20px;
}

.empty-state {
  padding: 28px;
  color: #cbc9d7;
  background: #20202b;
  border: 1px solid #383846;
  border-radius: 15px;
  text-align: center;
}

@media (max-width: 600px) {
  .feed {
    width: min(100% - 28px, 1440px);
    padding-top: 24px;
  }

  .feed-heading {
    align-items: flex-start;
  }

  .video-grid {
    grid-template-columns: 1fr;
    gap: 26px;
  }
}
</style>