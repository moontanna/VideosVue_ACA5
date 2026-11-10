<script setup lang="ts">
import { ref } from 'vue'
import { videos } from '../data/games'
import { juegosTienda } from '../data/tienda'

interface CalendarEvent {
  title: string
  start: Date
  end: Date
  color: string
}

const selectedDate = ref<string[]>([])
const date = (value: string) => new Date(`${value}T12:00:00`)
const event = (title: string, day: string, color: string): CalendarEvent => ({
  title,
  start: date(day),
  end: date(day),
  color,
})

const gameEvents: CalendarEvent[] = [
  event(`Juego: ${juegosTienda[0].titulo}`, '2026-11-02', 'secondary'),
  event(`Juego: ${juegosTienda[1].titulo}`, '2026-11-04', 'secondary'),
  event(`Juego: ${juegosTienda[2].titulo}`, '2026-11-06', 'secondary'),
  event(`Juego: ${juegosTienda[3].titulo}`, '2026-11-09', 'secondary'),
  event(`Juego: ${juegosTienda[4].titulo}`, '2026-11-11', 'secondary'),
  event(`Juego: ${juegosTienda[5].titulo}`, '2026-11-13', 'secondary'),
  event(`Juego: ${juegosTienda[6].titulo}`, '2026-11-16', 'secondary'),
  event(`Juego: ${juegosTienda[7].titulo}`, '2026-11-18', 'secondary'),
  event(`Juego: ${juegosTienda[8].titulo}`, '2026-11-20', 'secondary'),
  event(`Juego: ${juegosTienda[9].titulo}`, '2026-11-23', 'secondary'),
  event(`Juego: ${juegosTienda[10].titulo}`, '2026-11-25', 'secondary'),
  event(`Juego: ${juegosTienda[11].titulo}`, '2026-11-27', 'secondary'),
  event(`Juego: ${juegosTienda[12].titulo}`, '2026-11-30', 'secondary'),
  event(`Juego: ${juegosTienda[13].titulo}`, '2026-11-03', 'secondary'),
  event(`Juego: ${juegosTienda[14].titulo}`, '2026-11-07', 'secondary'),
  event(`Juego: ${juegosTienda[15].titulo}`, '2026-11-10', 'secondary'),
  event(`Juego: ${juegosTienda[16].titulo}`, '2026-11-12', 'secondary'),
  event(`Juego: ${juegosTienda[17].titulo}`, '2026-11-14', 'secondary'),
  event(`Juego: ${juegosTienda[18].titulo}`, '2026-11-17', 'secondary'),
  event(`Juego: ${juegosTienda[19].titulo}`, '2026-11-19', 'secondary'),
  event(`Juego: ${juegosTienda[20].titulo}`, '2026-11-21', 'secondary'),
  event(`Juego: ${juegosTienda[21].titulo}`, '2026-11-22', 'secondary'),
  event(`Juego: ${juegosTienda[22].titulo}`, '2026-11-24', 'secondary'),
  event(`Juego: ${juegosTienda[23].titulo}`, '2026-11-26', 'secondary'),
  event(`Juego: ${juegosTienda[24].titulo}`, '2026-11-28', 'secondary'),
  event(`Juego: ${juegosTienda[25].titulo}`, '2026-11-29', 'secondary'),
  event(`Juego: ${juegosTienda[26].titulo}`, '2026-11-01', 'secondary'),
  event(`Juego: ${juegosTienda[27].titulo}`, '2026-11-08', 'secondary'),
  event(`Juego: ${juegosTienda[28].titulo}`, '2026-11-15', 'secondary'),
  event(`Juego: ${juegosTienda[29].titulo}`, '2026-11-28', 'secondary'),
]

const videoEvents: CalendarEvent[] = [
  event(`Video: ${videos[39].titulo}`, '2026-11-02', 'primary'),
  event(`Video: ${videos[40].titulo}`, '2026-11-05', 'primary'),
  event(`Video: ${videos[41].titulo}`, '2026-11-09', 'primary'),
  event(`Video: ${videos[42].titulo}`, '2026-11-12', 'primary'),
  event(`Video: ${videos[43].titulo}`, '2026-11-16', 'primary'),
  event(`Video: ${videos[44].titulo}`, '2026-11-19', 'primary'),
  event(`Video: ${videos[45].titulo}`, '2026-11-23', 'primary'),
  event(`Video: ${videos[46].titulo}`, '2026-11-26', 'primary'),
  event(`Video: ${videos[47].titulo}`, '2026-11-30', 'primary'),
]

const events: CalendarEvent[] = [...gameEvents, ...videoEvents]
</script>

<template>
  <main class="events-page">
    <header class="events-heading">
      <div>
        <p class="eyebrow">ORBITAL COMMUNITY</p>
        <h1>Eventos</h1>
        <p>Consulta los estrenos de juegos y las publicaciones de videos.</p>
      </div>
    </header>

    <section class="calendar-card" aria-label="Calendario de eventos">
      <v-calendar
        v-model="selectedDate"
        color="primary"
        :events="events"
        event-overlap-mode="stack"
        type="month"
      />
    </section>

    <div class="calendar-legend" aria-label="Leyenda del calendario">
      <span><i class="legend-dot game-dot"></i> Estrenos de juegos</span>
      <span><i class="legend-dot video-dot"></i> Estrenos de videos</span>
    </div>
  </main>
</template>

<style scoped>
.events-page {
  width: min(calc(100% - 24px), 1280px);
  min-height: calc(100vh - 68px);
  margin: 0 auto;
  padding: 32px 0 56px;
  color: #f5f4fb;
  text-align: left;
}

.events-heading {
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #71e2ff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
}

h1 {
  margin: 0 0 10px;
}

.events-heading p:last-child {
  color: #cbc9d7;
  font-size: 14px;
}

.calendar-card {
  overflow: hidden;
  padding: 12px;
  background: #20202b;
  border: 1px solid #383846;
  border-radius: 16px;
}

.calendar-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 14px;
  color: #cbc9d7;
  font-size: 13px;
}

.calendar-legend span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.legend-dot {
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.game-dot {
  background: #ff70ad;
}

.video-dot {
  background: #71e2ff;
}

@media (max-width: 680px) {
  .events-page {
    width: min(100% - 20px, 1280px);
    padding-top: 24px;
  }
}
</style>
