<script setup lang="ts">
import { inject } from 'vue'

const cat = inject<any>('cat')
</script>

<template>

<section class="cat">

<button @click="cat='Todos'">Todos</button>

<button @click="cat='Sandbox'">🌿 Sandbox</button>

<button @click="cat='Terror'">👻 Terror</button>

<button @click="cat='Battle'">⚔️ Battle</button>

</section>

</template>

<style scoped>
.cat{
display:flex;
gap:12px;
padding:18px;
}
</style>