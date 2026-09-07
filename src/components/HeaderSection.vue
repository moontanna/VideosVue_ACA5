<script setup lang="ts">
import { inject } from 'vue'

const busq = inject<any>('busq')
</script>

<template>

<header class="hd">

<h1>🎮 GameHub</h1>

<input
v-model="busq"
placeholder="Buscar juegos...">

</header>

</template>

<style scoped>
.hd{
background:white;
padding:20px;
display:flex;
justify-content:space-between;
align-items:center;
}
</style>