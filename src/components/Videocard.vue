<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { videos } from '../data/games.ts'

const props = defineProps<{
  video?: (typeof videos)[number]
}>()

const route = useRoute()
const router = useRouter()
const isDetail = computed(() => route.name === 'videocard')
const activeMemberships = ref(readMemberships())

const selectedVideo = computed(() => {
  if (props.video) return props.video
  return videos.find((video) => video.id === Number(route.params.id))
})

// Se usa directamente el link (que ya viene preparado en formato embed)
const embedUrl = computed(() => selectedVideo.value?.link ?? '')
const canWatch = computed(
  () =>
    !selectedVideo.value?.soloMembresia ||
    activeMemberships.value.includes(selectedVideo.value.creador),
)

function updateMembership() {
  activeMemberships.value = readMemberships()
}

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

function openVideo() {
  if (props.video) {
    router.push({ name: 'videocard', params: { id: props.video.id } })
  }
}

function useFallbackImage(event: Event) {
  const image = event.target as HTMLImageElement
  if (image.src.endsWith('/logoPI_TW.png')) return
  image.src = '/logoPI_TW.png'
}

onMounted(() => window.addEventListener('membresia-actualizada', updateMembership))
onBeforeUnmount(() => window.removeEventListener('membresia-actualizada', updateMembership))
</script>

<template>
  <!-- Vista de Tarjeta en la Cuadrícula -->
  <article v-if="!isDetail" class="card" @click="openVideo">
    <div class="thumbnail-container">
      <img :src="video?.img" :alt="video?.titulo" class="thumbnail-img" @error="useFallbackImage" />
      <div class="play-overlay">
        <span class="play-icon" aria-hidden="true">▶</span>
      </div>
      <span class="category-badge">
        {{ video?.soloMembresia ? 'Solo membresía' : video?.categoria }}
      </span>
    </div>

    <div class="info-container">
      <div class="channel-avatar">
        <img :src="video?.img" :alt="video?.creador" @error="useFallbackImage" />
      </div>
      <div class="meta-info">
        <h3>{{ video?.titulo }}</h3>
        <p class="creator-name">{{ video?.creador }}</p>
      </div>
    </div>
  </article>

  <!-- Vista de Detalle / Reproductor -->
  <main v-else-if="selectedVideo" class="video-page">
    <h1>{{ selectedVideo.titulo }}</h1>
    <p class="meta">{{ selectedVideo.creador }} · {{ selectedVideo.categoria }}</p>

    <section v-if="canWatch" class="player-section">
      <iframe
        :src="embedUrl"
        :title="`Video de ${selectedVideo.titulo}`"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </section>

    <section v-else class="membership-message">
      <h2>Este video requiere una membresía</h2>
      <p>Activa tu membresía para poder reproducir este contenido.</p>
      <RouterLink :to="{ name: 'membresia' }">Ver membresías</RouterLink>
    </section>
  </main>

  <!-- Vista de Error: Video no encontrado -->
  <main v-else class="video-page">
    <h1>Video no encontrado</h1>
    <RouterLink class="back-link" :to="{ name: 'home' }">← Volver a videos</RouterLink>
  </main>
</template>

<style scoped>
.card {
  background: #1a1625;
  border: 1px solid #2e2640;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-4px);
  border-color: #71e2ff;
  box-shadow: 0 6px 20px rgba(113, 226, 255, 0.15);
}

.thumbnail-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #110e17;
  overflow: hidden;
}

.thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .thumbnail-img {
  transform: scale(1.05);
}

.play-overlay {
  position: absolute;
  inset: 0;
  background: rgba(18, 16, 25, 0.3);
  display: grid;
  place-items: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.card:hover .play-overlay {
  opacity: 1;
}

.play-icon {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  padding-left: 2px;
  color: #121019;
  background: #71e2ff;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(113, 226, 255, 0.6);
  font-size: 16px;
}

.category-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(18, 16, 25, 0.85);
  color: #71e2ff;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid rgba(113, 226, 255, 0.3);
}

.info-container {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #1a1625;
}

.channel-avatar {
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(113, 226, 255, 0.3);
  background: #242030;
}

.channel-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.meta-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.info-container h3 {
  margin: 0 0 4px;
  color: #f5f4fb;
  font-family: var(--heading, sans-serif);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.creator-name {
  margin: 0;
  color: #a09cb0;
  font-size: 12px;
}

.video-page {
  width: min(100% - 48px, 1000px);
  margin: 0 auto;
  padding: 32px 0 56px;
}

.video-page h1 {
  margin: 24px 0 6px;
  color: #f5f4fb;
  font-size: var(--heading-xl, 2rem);
}

.back-link,
.player-section a,
.membership-message a {
  color: #71e2ff;
}

.player-section {
  margin-top: 24px;
}

iframe {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 0;
  border-radius: 15px;
}

.membership-message {
  margin-top: 24px;
  padding: 28px;
  color: #f5f4fb;
  background: #20202b;
  border: 1px solid #383846;
  border-radius: 15px;
}

.membership-message h2 {
  margin-top: 0;
  font-size: var(--heading-lg, 1.5rem);
}

@media (max-width: 600px) {
  .video-page {
    width: min(100% - 28px, 1000px);
  }
}
</style>