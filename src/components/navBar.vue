<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const searchText = ref(typeof route.query.q === 'string' ? route.query.q : '')
const menuOpen = ref(false)
const profileMenuOpen = ref(false)
const isLoggedIn = ref(false)
const profileName = ref('Iniciar sesión')

function updateProfileName() {
  isLoggedIn.value = localStorage.getItem('cuenta-iniciada') === 'true'
  const savedData = localStorage.getItem('datos-cuenta')

  if (!isLoggedIn.value || !savedData) {
    profileName.value = 'Iniciar sesión'
    return
  }

  try {
    const data = JSON.parse(savedData) as { nombre?: string }
    profileName.value = data.nombre?.trim() || 'Iniciar sesión'
  } catch {
    profileName.value = 'Iniciar sesión'
  }
}

watch(
  () => route.query.q,
  (query) => {
    searchText.value = typeof query === 'string' ? query : ''
  },
)

function search() {
  const query = searchText.value.trim()
  menuOpen.value = false
  router.push({
    name: 'home',
    query: query ? { q: query } : {},
  })
}

function closeProfileMenu() {
  profileMenuOpen.value = false
}

function handleDocumentClick(event: MouseEvent) {
  const target = event.target as HTMLElement

  if (!target.closest('.profile-menu')) {
    closeProfileMenu()
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeProfileMenu()
  }
}

onMounted(() => {
  updateProfileName()
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleKeydown)
  window.addEventListener('cuenta-actualizada', updateProfileName)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('cuenta-actualizada', updateProfileName)
})

</script>

<template>
  <header class="navbar">
    <RouterLink class="brand" :to="{ name: 'home' }" aria-label="pagina, inicio">
      <img class="brand-logo" src="/logoPI_TW.png" alt="Logo de Juegos">
      <span class="brand-name">Orbital</span>
    </RouterLink>

    <button
      class="menu-toggle"
      type="button"
      :aria-expanded="menuOpen"
      aria-controls="sidebar-menu"
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
        <div class="profile-menu" @click.stop>
          <button
            class="profile-trigger"
            type="button"
            :aria-expanded="profileMenuOpen"
            aria-controls="profile-dropdown"
            aria-label="Abrir menú de perfil"
            title="Perfil"
            @click="profileMenuOpen = !profileMenuOpen"
          >
            <span class="profile-avatar" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="3.5" />
                <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
              </svg>
            </span>
          </button>

          <div v-if="profileMenuOpen" id="profile-dropdown" class="profile-dropdown">
            <div class="profile-summary">
              <span class="profile-avatar profile-avatar-large" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
                </svg>
              </span>
              <strong>{{ profileName }}</strong>
            </div>

            <div class="profile-divider"></div>

            <nav class="profile-links" aria-label="Opciones de perfil">
              <RouterLink v-if="!isLoggedIn" class="profile-link" :to="{ name: 'cuenta' }" @click="closeProfileMenu">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="9" cy="8" r="3" />
                  <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 8v8m4-4h-8" />
                </svg>
                <span>Iniciar sesión</span>
              </RouterLink>
            </nav>
          </div>
        </div>

      </nav>
    </div>
  </header>

  <aside id="sidebar-menu" class="sidebar" :class="{ 'is-open': menuOpen }">
    <nav aria-label="Navegación principal">
      <RouterLink class="sidebar-link" :to="{ name: 'home' }" @click="menuOpen = false">
        Inicio
        <img src="https://imgs.search.brave.com/TtOgAKxJQT2KnUK9vbA59Rzvh_50FmUxZdY8lC3fyt0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDYv/ODQxLzgzMC9zbWFs/bC9ob21lLWljb24t/dHJhbnNwYXJlbnQt/ZnJlZS1wbmcucG5n">
      </RouterLink>
      <RouterLink class="sidebar-link" :to="{ name: 'eventos' }" @click="menuOpen = false">
        Eventos
        <img src="https://imgs.search.brave.com/NQFKs3KGw4PHFrRKE_rcQ1YP1uYXBMGmABLeKuztBUU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLm1h/Z25pZmljLmNvbS8y/NTYvMTc0NTAvMTc0/NTAyNTcucG5nP3Nl/bXQ9YWlzX3doaXRl/X2xhYmVs">
      </RouterLink>
      <RouterLink class="sidebar-link" :to="{ name: 'membresia' }" @click="menuOpen = false">
        Membresías
        <img src="https://imgs.search.brave.com/A73BV-pYQycPcqZ5zQdN-PjvCA1rirBh9b3nY-xbOQg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvOTQwNi85NDA2/MTg1LnBuZw" alt="Membresía" />
      </RouterLink>
      <RouterLink class="sidebar-link" :to="{ name: 'tienda' }" @click="menuOpen = false">
        Tienda
        <img src="https://imgs.search.brave.com/00UQUaPriu9aHwJZjTRPQc7_xWvttGhD2IKbmFjPf4I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL2ZyZWUv/cG5nLTI1Ni9mcmVl/LXN0b3JlLWljb24t/c3ZnLWRvd25sb2Fk/LXBuZy0xNzcyNDU3/LnBuZz9mPXdlYnAm/dz0xMjg" alt="Tienda" />
      </RouterLink>
    </nav>
  </aside>
  <button
    v-if="menuOpen"
    class="sidebar-backdrop"
    type="button"
    aria-label="Cerrar menú"
    @click="menuOpen = false"
  ></button>
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

.sidebar {
  position: fixed;
  top: 68px;
  left: 0;
  z-index: 9;
  width: 240px;
  min-height: calc(100vh - 68px);
  box-sizing: border-box;
  padding: 24px 14px;
  background: #11111a;
  border-right: 1px solid rgba(102, 222, 255, 0.24);
  box-shadow: 4px 0 20px rgba(7, 8, 20, 0.24);
}

.sidebar-backdrop {
  display: none;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 60px;
  padding: 12px 16px;
  color: #e5e3ef;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 650;
  text-align: left;
  text-decoration: none;
  transition: background-color 150ms ease, color 150ms ease;
}

.sidebar-link img {
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  object-fit: contain;
}

.sidebar-link:hover,
.sidebar-link.router-link-active {
  color: #11111a;
  background: #71e2ff;
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

.brand-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
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

.profile-menu {
position: relative;
}

.profile-trigger {
display: grid;
width: 40px;
height: 40px;
place-items: center;
padding: 0;
color: #f5f4fb;
background: #8d05c9;
border: 1px solid #b43ce8;
border-radius: 50%;
cursor: pointer;
transition: background-color 150ms ease, transform 150ms ease;
}

.profile-trigger:hover,
.profile-trigger[aria-expanded='true'] {
background: #a917e0;
transform: translateY(-1px);
}

.profile-avatar {
display: grid;
width: 30px;
height: 30px;
place-items: center;
color: currentColor;
background: transparent;
border-radius: 50%;
}

.profile-avatar svg {
width: 24px;
height: 24px;
stroke: currentColor;
stroke-linecap: round;
stroke-linejoin: round;
stroke-width: 1.8;
}

.profile-dropdown {
position: absolute;
top: calc(100% + 10px);
right: 0;
z-index: 30;
width: 230px;
padding: 16px;
color: #f5f4fb;
background: #303039;
border: 1px solid #383846;
border-radius: 8px;
box-shadow: 0 12px 28px rgba(7, 8, 20, 0.45);
text-align: left;
}

.profile-summary {
display: flex;
align-items: center;
gap: 12px;
padding: 0 0 14px;
}

.profile-summary strong {
font-size: 16px;
}

.profile-avatar-large {
width: 48px;
height: 48px;
color: #fff;
background: #8d05c9;
}

.profile-avatar-large svg {
width: 31px;
height: 31px;
}

.profile-divider {
height: 1px;
margin-bottom: 8px;
background: #484852;
}

.profile-links {
display: flex;
flex-direction: column;
gap: 2px;
}

.profile-link {
display: flex;
align-items: center;
gap: 12px;
min-height: 40px;
padding: 6px 8px;
color: #f1eff7;
border-radius: 5px;
font-size: 15px;
text-decoration: none;
transition: background-color 150ms ease, color 150ms ease;
}

.profile-link:hover,
.profile-link.router-link-active {
color: #fff;
background: #454550;
}

.profile-link svg {
width: 20px;
height: 20px;
flex: 0 0 20px;
stroke: currentColor;
stroke-linecap: round;
stroke-linejoin: round;
stroke-width: 1.8;
}

.membership-link {
color: #e69bff;
}

.membership-link:hover,
.membership-link.router-link-active {
color: #f3c9ff;
}

.profile-trigger:focus-visible,
.profile-link:focus-visible {
outline: 2px solid #71e2ff;
outline-offset: 2px;
}

@media (max-width: 680px) {
  .navbar {
    grid-template-columns: 1fr auto;
    gap: 12px;
    padding: 10px 14px;
  }

  .sidebar {
    top: 128px;
    width: min(260px, 85vw);
    min-height: calc(100vh - 128px);
    transform: translateX(-100%);
    transition: transform 150ms ease;
  }

  .sidebar-backdrop {
    position: fixed;
    inset: 128px 0 0;
    z-index: 8;
    display: block;
    padding: 0;
    background: rgba(7, 8, 20, 0.55);
    border: 0;
  }

  .sidebar.is-open {
    transform: translateX(0);
  }

  .brand-name {
    font-size: 16px;
  }

  .brand-logo {
    width: 42px;
    height: 42px;
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
    width: 100%;
    min-width: 0;
    gap: 12px;
    padding: 4px 0 2px;
  }

  .navbar-menu.is-open {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .navbar nav {
    flex: 0 0 auto;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }

  .nav-link {
    display: block;
  }

  .profile-menu {
    align-self: flex-start;
  }

  .profile-dropdown {
    right: auto;
    left: 0;
    width: min(230px, calc(100vw - 28px));
  }

  .navbar-menu .search {
    width: auto;
    flex: 1 1 auto;
    max-width: 100%;
    box-sizing: border-box;
  }

  .search input {
    padding: 0 12px;
    font-size: 14px;
  }

  .search button {
    width: 46px;
    flex-basis: 46px;
  }
}

@media (max-width: 400px) {
  .navbar {
    padding-inline: 10px;
  }

  .brand {
    gap: 6px;
  }

  .brand-name {
    font-size: 14px;
  }

  .brand-logo {
    width: 36px;
    height: 36px;
  }

  .menu-toggle {
    width: 38px;
    height: 38px;
  }
}
</style>