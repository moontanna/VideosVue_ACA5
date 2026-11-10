<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CategoryBar from './CategoryBar.vue'
import Videocard from './Videocard.vue'
import { videos } from '../data/games'

const route = useRoute()
const selectedCategory = ref('Todas')
const activeMemberships = ref(readMemberships())
const searchQuery = computed(() => {
  const query = route.query.q
  return typeof query === 'string' ? query.trim().toLowerCase() : ''
})

const categories = computed(() =>
  [...new Set(videos.map((video) => video.categoria))].sort((a, b) => a.localeCompare(b)),
)

const visibleVideos = computed(() => {
  const filteredVideos = videos.filter((video) => {
    const matchesCategory =
      selectedCategory.value === 'Todas' || video.categoria === selectedCategory.value
    const searchableText = [video.titulo, video.creador, video.juego, video.categoria]
      .join(' ')
      .toLowerCase()

    return matchesCategory && (!searchQuery.value || searchableText.includes(searchQuery.value))
  })

  if (searchQuery.value || selectedCategory.value !== 'Todas') {
    return filteredVideos
  }

  // Mezclamos todos los videos al azar y seleccionamos solo la mitad.
  const shuffled = [...videos].sort(() => Math.random() - 0.5)
  const mitad = Math.ceil(shuffled.length / 2)
  return shuffled.slice(0, mitad)
})

function readMemberships(): string[] {
  try {
    const savedMemberships = JSON.parse(localStorage.getItem('membresias-activas') ?? '[]')
    return Array.isArray(savedMemberships)
      ? savedMemberships.filter((creator): creator is string => typeof creator === 'string')
      : []
  } catch {
    return []
  }
}

function updateMembership() {
  activeMemberships.value = readMemberships()
}

onMounted(() => window.addEventListener('membresia-actualizada', updateMembership))
onBeforeUnmount(() => window.removeEventListener('membresia-actualizada', updateMembership))
</script>

<template>
  <main class="feed">
    <CategoryBar v-model:selected-category="selectedCategory" :categories="categories" />

    <header class="feed-heading">
      <div>
        <p class="eyebrow">PARA TI</p>
        <h1>
          {{
            searchQuery
              ? `Resultados para "${searchQuery}"`
              : selectedCategory !== 'Todas'
                ? selectedCategory
                : 'Videos recomendados'
          }}
        </h1>
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
  width: min(calc(100% - 48px), 1440px);
  margin: 0 auto;
  padding: 28px 0 56px;
  text-align: left;
}

.feed-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
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

.membership-hint {
  margin-top: 8px;
  color: #cbc9d7;
  font-size: 14px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
  align-items: start;
  gap: 24px;
}

.empty-state {
  padding: 28px;
  color: #cbc9d7;
  background: #20202b;
  border: 1px solid #383846;
  border-radius: 15px;
  text-align: center;
}

@media (max-width: 680px) {
  .feed {
    width: min(100% - 28px, 1440px);
    margin: 0 auto;
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

@media (min-width: 681px) and (max-width: 980px) {
  .video-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
}
</style>