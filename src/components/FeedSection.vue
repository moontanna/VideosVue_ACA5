<script setup lang="ts">
import Videocard from './Videocard.vue'
import { videos } from '../data/games'

</script>

<template>
  <main class="feed">
    <header class="feed-heading">
      <div>
        <p class="eyebrow">PARA TI</p>
        <h1>Videos recomendados</h1>
      </div>
      <span class="video-count">{{ videos.length }} videos</span>
    </header>

    <section class="video-grid" aria-label="Videos recomendados">
      <Videocard v-for="video in videos" :key="video.id" :video="video" />
    </section>
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
  font-size: clamp(25px, 4vw, 34px);
  font-weight: 750;
  letter-spacing: -0.8px;
}

.video-count {
  padding: 7px 12px;
  color: #cbc9d7;
  background: #20202b;
  border: 1px solid #383846;
  border-radius: 20px;
  font-size: 12px;
  white-space: nowrap;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 270px), 1fr));
  gap: 32px 20px;
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