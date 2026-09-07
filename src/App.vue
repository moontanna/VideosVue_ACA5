
<script setup lang="ts">
import HeaderSection from './components/HeaderSection.vue'
import CategoryBar from './components/CategoryBar.vue'
</script>

<template>

  <div class="app">

    <HeaderSection />

    <CategoryBar />

  </div>

</template>

<style scoped>
.app{
  min-height:100vh;
  background:#f5f7fb;
  font-family:Arial, Helvetica, sans-serif;
}
</style>