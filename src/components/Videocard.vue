<script setup lang="ts">
import type { Video } from '../data/games'

defineProps<{ video: Video }>()

function formatDate(date: string) {
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}
</script>

<template>
  <a
    class="card-link"
    :href="video.link"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`${video.titulo} de ${video.creador} en YouTube`"
  >
    <article class="card">
      <div class="thumbnail" :style="{ '--thumbnail-hue': (video.id * 47) % 360 }">
        <span class="thumbnail-category">{{ video.categoria }}</span>
        <span class="thumbnail-game">{{ video.juego }}</span>
        <span class="play-button" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5.8c0-.8.9-1.3 1.6-.9l9.1 5.2a1 1 0 0 1 0 1.8l-9.1 5.2a1.05 1.05 0 0 1-1.6-.9V5.8Z" />
          </svg>
        </span>
      </div>
      <div class="info">
        <span class="avatar" aria-hidden="true">{{ video.creador.slice(0, 1) }}</span>
        <div class="copy">
          <h2>{{ video.titulo }}</h2>
          <p class="creator">{{ video.creador }}</p>
          <p class="metadata">{{ video.juego }} <span aria-hidden="true">·</span> {{ formatDate(video.fecha) }}</p>
        </div>
        <span class="more" aria-hidden="true">⋮</span>
      </div>
    </article>
  </a>
</template>

<style scoped>
.card-link {
  color: inherit;
  text-decoration: none;
  outline-offset: 4px;
}

.card {
  min-width: 0;
  cursor: pointer;
}

.thumbnail {
  position: relative;
  display: flex;
  aspect-ratio: 16 / 9;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  overflow: hidden;
  padding: 16px;
  color: #fff;
  background:
    radial-gradient(ellipse at 82% 18%, hsl(var(--thumbnail-hue) 88% 64% / 80%), transparent 37%),
    linear-gradient(135deg, hsl(var(--thumbnail-hue) 78% 25%), #141421 78%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  box-sizing: border-box;
  transition: border-radius 160ms ease, filter 160ms ease;
}

.thumbnail::after {
  position: absolute;
  inset: 35% 0 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.76));
  content: '';
}

.thumbnail-category,
.thumbnail-game,
.play-button {
  position: relative;
  z-index: 1;
}

.thumbnail-category {
  align-self: flex-start;
  padding: 4px 8px;
  background: rgba(13, 13, 24, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 20px;
  font-size: 10px;
  font-weight: 700;
}

.thumbnail-game {
  overflow: hidden;
  font-size: clamp(19px, 2vw, 25px);
  font-weight: 850;
  line-height: 1.1;
  text-overflow: ellipsis;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
  white-space: nowrap;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  color: #11111a;
  background: #71e2ff;
  border-radius: 50%;
  opacity: 0;
  transform: translate(-50%, -40%);
  transition: opacity 160ms ease, transform 160ms ease;
}

.play-button svg {
  width: 23px;
  height: 23px;
  margin-left: 2px;
}

.card-link:hover .thumbnail,
.card-link:focus-visible .thumbnail {
  border-radius: 10px;
  filter: brightness(1.12);
}

.card-link:hover .play-button,
.card-link:focus-visible .play-button {
  opacity: 1;
  transform: translate(-50%, -50%);
}

.info {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding-top: 14px;
}

.avatar {
  display: grid;
  width: 38px;
  height: 38px;
  flex: 0 0 38px;
  place-items: center;
  color: #11111a;
  background: #71e2ff;
  border-radius: 50%;
  font-size: 15px;
  font-weight: 800;
}

.copy {
  min-width: 0;
  flex: 1;
}

.copy h2 {
  display: -webkit-box;
  overflow: hidden;
  margin: 0 0 6px;
  color: #f5f4fb;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.35;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.creator,
.metadata {
  overflow: hidden;
  color: #aaa8b8;
  font-size: 12px;
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.metadata span {
  padding: 0 3px;
}

.more {
  color: #cbc9d7;
  font-size: 22px;
  line-height: 1;
}
</style>