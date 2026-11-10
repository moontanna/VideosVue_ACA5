<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { juegosTienda } from '../data/tienda'

const search = ref('')
const selectedFilter = ref('Todos')
const cartCount = ref(0)
const router = useRouter()
const filters = ['Todos', 'Menos de $400', '$400 - $800', 'Más de $800']

const visibleGames = computed(() => {
  const query = search.value.trim().toLowerCase()
  return juegosTienda.filter((game) => {
    const matchesSearch = !query || `${game.titulo} ${game.descripcion}`.toLowerCase().includes(query)
    const matchesFilter =
      selectedFilter.value === 'Todos' ||
      (selectedFilter.value === 'Menos de $400' && game.precio < 400) ||
      (selectedFilter.value === '$400 - $800' && game.precio >= 400 && game.precio <= 800) ||
      (selectedFilter.value === 'Más de $800' && game.precio > 800)
    return matchesSearch && matchesFilter
  })
})

function addToCart() {
  cartCount.value += 1
}

function openGame(title: string) {
  router.push({ name: 'juegos', params: { titulo: title } })
}
</script>

<template>
  <main class="store">
    <section class="store-hero">
      <div>
        <p class="eyebrow">ORBITAL MARKET</p>
        <h1>Tu próxima aventura<br><span>empieza aquí</span></h1>
        <p class="hero-copy">Descubre grandes juegos, precios especiales y claves digitales listas para jugar.</p>
        <a class="hero-button" href="#catalogo">Explorar ofertas <span>→</span></a>
      </div>
      <div class="hero-art" aria-hidden="true">
        <span class="hero-orbit orbit-one"></span>
        <span class="hero-orbit orbit-two"></span>
        <span class="hero-controller">✦</span>
      </div>
    </section>

    <section class="store-toolbar" aria-label="Herramientas de tienda">
      <div class="store-search">
        <span aria-hidden="true">⌕</span>
        <input v-model="search" type="search" placeholder="Busca un juego..." aria-label="Buscar juegos">
      </div>
      <button class="cart-button" type="button" @click="cartCount = cartCount">
        <span aria-hidden="true">▱</span> Carrito <b>{{ cartCount }}</b>
      </button>
    </section>

    <section id="catalogo" class="catalog-layout">
      <aside class="filters">
        <p class="filter-label">FILTRAR POR PRECIO</p>
        <button
          v-for="filter in filters"
          :key="filter"
          type="button"
          :class="{ active: selectedFilter === filter }"
          @click="selectedFilter = filter"
        >
          <span class="filter-dot"></span>{{ filter }}
        </button>
        <div class="aside-card">
          <span>★</span>
          <strong>Tus juegos</strong>
          <p>Encuentra tu próxima obsesión al mejor precio.</p>
        </div>
      </aside>

      <div class="catalog">
        <header class="catalog-heading">
          <div>
            <p class="eyebrow">CATÁLOGO DIGITAL</p>
            <h2>Juegos destacados</h2>
          </div>
          <span class="result-count">{{ visibleGames.length }} juegos</span>
        </header>

        <section v-if="visibleGames.length" class="game-grid" aria-label="Juegos disponibles">
          <article
            v-for="game in visibleGames"
            :key="game.titulo"
            class="game-card"
            role="link"
            tabindex="0"
            @click="openGame(game.titulo)"
            @keydown.enter="openGame(game.titulo)"
          >
            <div class="cover">
              <img :src="game.imagen" :alt="`Portada de ${game.titulo}`">
            </div>
            <div class="game-info">
              <div class="game-title-row">
                <h3>{{ game.titulo }}</h3>
                <strong>{{ game.precio.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }) }}</strong>
              </div>
              <p>{{ game.descripcion }}</p>
              <small v-if="game.estreno">Estreno: {{ game.estreno }}</small>
              <button class="buy-button" type="button" @click.stop="addToCart">Añadir al carrito <span>+</span></button>
            </div>
          </article>
        </section>
        <p v-else class="empty-state">No encontramos juegos con esos criterios.</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.store { width: min(calc(100% - 48px), 1260px); margin: 0 auto; padding: 32px 0 70px; text-align: left; }
.store-hero { position: relative; min-height: 270px; overflow: hidden; display: flex; align-items: center; padding: 42px 58px; box-sizing: border-box; border: 1px solid rgba(113, 226, 255, .3); border-radius: 22px; background: linear-gradient(110deg, #171329 0%, #24133d 55%, #351751 100%); box-shadow: 0 18px 40px rgba(7, 8, 20, .3); }
.eyebrow { margin: 0 0 8px; color: #71e2ff; font-size: 11px; font-weight: 800; letter-spacing: 2px; }
h1 { margin: 0; font-size: clamp(32px, 5vw, 58px); line-height: .98; }
h1 span { color: #ff70ad; }
.hero-copy { max-width: 470px; margin: 17px 0 23px; color: #cbc9d7; font-size: 15px; }
.hero-button, .buy-button { display: inline-flex; align-items: center; gap: 14px; color: #17111a; background: #71e2ff; border: 0; border-radius: 8px; font-weight: 800; text-decoration: none; cursor: pointer; transition: transform .2s, background .2s; }
.hero-button { padding: 12px 17px; font-size: 13px; }
.hero-button:hover, .buy-button:hover { background: #ffb8d5; transform: translateY(-2px); }
.hero-art { position: absolute; right: 7%; top: 50%; width: 250px; height: 250px; transform: translateY(-50%) rotate(-18deg); }
.hero-orbit { position: absolute; inset: 20px; border: 1px solid rgba(113, 226, 255, .55); border-radius: 50%; transform: rotate(45deg) scaleX(1.7); }
.orbit-two { inset: 40px -15px; border-color: rgba(255, 112, 173, .65); transform: rotate(-35deg) scaleX(1.4); }
.hero-controller { position: absolute; inset: 0; display: grid; place-items: center; color: #ff70ad; font-size: 105px; text-shadow: 0 0 35px rgba(255, 112, 173, .8); }
.store-toolbar { display: flex; justify-content: space-between; gap: 18px; margin: 28px 0; }
.store-search { display: flex; align-items: center; flex: 1; max-width: 540px; padding: 0 16px; background: #20202b; border: 1px solid #383846; border-radius: 9px; color: #71e2ff; }
.store-search input { width: 100%; padding: 12px 10px; color: #f5f4fb; background: transparent; border: 0; outline: 0; font-size: 14px; }
.cart-button { padding: 0 18px; color: #f5f4fb; background: #292331; border: 1px solid #56415e; border-radius: 9px; font-size: 14px; cursor: pointer; }
.cart-button b { display: inline-grid; min-width: 20px; height: 20px; margin-left: 8px; place-items: center; color: #17111a; background: #ff70ad; border-radius: 50%; font-size: 11px; }
.catalog-layout { display: grid; grid-template-columns: 190px 1fr; gap: 30px; }
.filters { padding-top: 8px; }
.filter-label { margin: 0 0 14px; color: #cbc9d7; font-size: 11px; font-weight: 800; letter-spacing: 1px; }
.filters button { display: flex; align-items: center; width: 100%; gap: 10px; padding: 9px 5px; color: #aaa5b7; background: transparent; border: 0; text-align: left; font-size: 13px; cursor: pointer; }
.filters button.active { color: #71e2ff; font-weight: 700; }
.filter-dot { width: 7px; height: 7px; border: 1px solid currentColor; border-radius: 50%; }
.active .filter-dot { background: currentColor; }
.aside-card { margin-top: 42px; padding: 17px; color: #cbc9d7; background: rgba(39, 25, 55, .8); border: 1px solid #57315e; border-radius: 12px; font-size: 12px; }
.aside-card span { color: #ff70ad; font-size: 22px; }
.aside-card strong { display: block; margin-top: 10px; color: #f5f4fb; font-size: 13px; }
.aside-card p { margin-top: 7px; line-height: 1.4; }
.catalog-heading { display: flex; align-items: end; justify-content: space-between; margin-bottom: 18px; }
h2 { margin: 0; color: #f5f4fb; font-size: 27px; }
.result-count { color: #8d8798; font-size: 13px; }
.game-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(245px, 1fr)); gap: 18px; }
.game-card { overflow: hidden; background: rgba(28, 27, 38, .92); border: 1px solid #383846; border-radius: 13px; transition: transform .2s, border-color .2s; }
.game-card:hover { border-color: #71e2ff; transform: translateY(-4px); }
.cover { height: 125px; overflow: hidden; background: #20202b; }
.cover img { display: block; width: 100%; height: 100%; object-fit: cover; }
.game-info { padding: 15px; }.game-title-row { display: flex; align-items: start; justify-content: space-between; gap: 10px; }.game-title-row h3 { color: #f5f4fb; font-size: 15px; line-height: 1.25; }.game-title-row strong { color: #71e2ff; font-size: 14px; white-space: nowrap; }.game-info p { min-height: 38px; margin: 8px 0 7px; color: #aaa5b7; font-size: 12px; line-height: 1.45; }.game-info small { display: block; min-height: 17px; color: #777184; font-size: 10px; }.buy-button { width: 100%; justify-content: space-between; margin-top: 13px; padding: 9px 11px; font-size: 11px; }.buy-button span { font-size: 17px; }.empty-state { padding: 30px; color: #cbc9d7; background: #20202b; border-radius: 12px; text-align: center; }
@media (max-width: 760px) { .store { width: min(100% - 28px, 1260px); padding-top: 22px; }.store-hero { min-height: 320px; padding: 30px 24px; }.hero-art { right: -55px; opacity: .48; }.store-toolbar { flex-direction: column; }.store-search { max-width: none; }.cart-button { min-height: 44px; }.catalog-layout { grid-template-columns: 1fr; gap: 14px; }.filters { display: flex; flex-wrap: wrap; gap: 4px; }.filter-label { width: 100%; }.filters button { width: auto; padding-right: 12px; }.aside-card { display: none; }.game-grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); } }
</style>
