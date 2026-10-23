<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const searchText = ref(typeof route.query.q === 'string' ? route.query.q : '')
const menuOpen = ref(false)


</script>

<template>
  <header class="navbar">
    <RouterLink class="brand" :to="{ name: 'home' }" aria-label="Watch Note, inicio">
      <span class="brand-icon" aria-hidden="true">

      </span>
      <span class="brand-name">Watch Note</span>
    </RouterLink>

    <button
      class="menu-toggle"
      type="button"
      :aria-expanded="menuOpen"
      aria-controls="navbar-menu"
      :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'"
      @click="menuOpen = !menuOpen"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div id="navbar-menu" class="navbar-menu" :class="{ 'is-open': menuOpen }">
      <form class="search" role="search" @submit.prevent="search">
        <input
          v-model="searchText"
          type="search"
          placeholder="Buscar Videos"
          aria-label="Buscar videos"
        >
        <button type="submit" aria-label="Buscar">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 5 5" />
          </svg>
        </button>
      </form>

      <nav aria-label="Navegación principal">
        <RouterLink class="nav-link" :to="{ name: 'home' }" @click="menuOpen = false">
          Inicio
        </RouterLink>
        <RouterLink
          class="nav-link support-link"
          :to="{ name: 'support' }"
          @click="menuOpen = false"
        >
          Soporte
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: grid;
  width: 100vw;
  box-sizing: border-box;
  margin-left: calc(50% - 50vw);
  grid-template-columns: 1fr minmax(180px, 440px) 1fr;
  align-items: center;
  gap: 24px;
  min-height: 68px;
  padding: 0 24px;
  color: #f5f4fb;
  background: #11111a;
  border-bottom: 1px solid rgba(102, 222, 255, 0.24);
  box-shadow: 0 4px 20px rgba(7, 8, 20, 0.24);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  color: inherit;
  text-decoration: none;
  white-space: nowrap;
}



.brand-name {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.2px;
}

.navbar-menu {
  display: contents;
}

.menu-toggle {
  display: none;
}

.search {
  display: flex;
  height: 40px;
  overflow: hidden;
  background: #20202b;
  border: 1px solid #383846;
  border-radius: 22px;
}

.search:focus-within {
  border-color: #71e2ff;
  box-shadow: 0 0 0 2px rgba(113, 226, 255, 0.15);
}

.search input {
  min-width: 0;
  flex: 1;
  padding: 0 16px;
  color: #f5f4fb;
  background: transparent;
  border: 0;
  outline: 0;
  font: inherit;
}

.search input::placeholder {
  color: #a7a5b5;
}

.search button {
  display: grid;
  width: 54px;
  flex: 0 0 54px;
  place-items: center;
  color: #f5f4fb;
  background: #30303d;
  border: 0;
  border-left: 1px solid #383846;
  cursor: pointer;
}

.search button:hover {
  color: #71e2ff;
  background: #3a3948;
}

.search button svg {
  width: 19px;
  height: 19px;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-width: 2;
}

.navbar nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
}

.nav-link {
  padding: 9px 14px;
  color: #e5e3ef;
  border-radius: 18px;
  font-size: 14px;
  font-weight: 650;
  text-decoration: none;
  transition: background-color 150ms ease, color 150ms ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #11111a;
  background: #71e2ff;
}

.support-link {
  color: #ffb8d5;
}

.support-link:hover,
.support-link.router-link-active {
  color: #17111a;
  background: #ff70ad;
}

@media (max-width: 680px) {
  .navbar {
    grid-template-columns: 1fr auto;
    gap: 12px;
    padding: 10px 14px;
  }

  .brand-name {
    font-size: 16px;
  }

  .menu-toggle {
    display: flex;
    width: 42px;
    height: 42px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: #f5f4fb;
    background: #20202b;
    border: 1px solid #383846;
    border-radius: 10px;
    cursor: pointer;
  }

  .menu-toggle span {
    width: 19px;
    height: 2px;
    background: currentColor;
    border-radius: 2px;
  }

  .navbar-menu {
    display: none;
    grid-column: 1 / -1;
    grid-row: 2;
    gap: 12px;
    padding: 4px 0 2px;
  }

  .navbar-menu.is-open {
    display: flex;
    flex-direction: column;
  }

  .navbar nav {
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
  }

  .nav-link {
    display: block;
  }

  .navbar-menu .search {
    width: 100%;
  }
}
</style>