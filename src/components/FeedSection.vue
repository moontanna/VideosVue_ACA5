<script setup lang="ts">
import { inject } from 'vue'
import VideoCard from './Videocard.vue'

const jgs = inject<any>('jgs')
const cat = inject<any>('cat')
const busq = inject<any>('busq')
</script>

<template>

<section class="grid">

<template
v-for="jg in jgs"
:key="jg.id">

<VideoCard
v-if="(cat==='Todos'||jg.categoria===cat)&&jg.titulo.toLowerCase().includes(busq.toLowerCase())"
:jg="jg"/>

</template>

</section>

</template>

<style scoped>
.grid{
display:grid;
grid-template-columns:repeat(auto-fill,minmax(230px,1fr));
gap:20px;
padding:20px;
}
</style>