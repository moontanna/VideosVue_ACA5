<script setup lang="ts">
import NavBar from './components/navBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <NavBar />
  <RouterView />
  <RouterLink
    class="floating-support"
    :to="{ name: 'soporte' }"
    aria-label="Abrir soporte"
    title="Soporte"
  >
    ?
  </RouterLink>
</template>

<style scoped>
.floating-support {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 20;
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  color: #17111a;
  background: #ff70ad;
  border: 2px solid #11111a;
  border-radius: 50%;
  box-shadow: 0 6px 18px rgba(7, 8, 20, 0.35);
  font-size: 26px;
  font-weight: 800;
  line-height: 1;
  text-decoration: none;
  transition: transform 150ms ease, background-color 150ms ease;
}

.floating-support:hover,
.floating-support.router-link-active {
  background: #ffb8d5;
  transform: scale(1.06);
}

.floating-support:focus-visible {
  outline: 3px solid #71e2ff;
  outline-offset: 3px;
}

@media (max-width: 600px) {
  .floating-support {
    right: 16px;
    bottom: 16px;
    width: 48px;
    height: 48px;
    font-size: 24px;
  }
}
</style>
