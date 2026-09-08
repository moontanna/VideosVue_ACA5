<script setup lang="ts">
import { inject } from 'vue'

const sel = inject<any>('sel')
const ver = inject<any>('ver')
</script>

<template>

<div class="gp">

<button @click="sel=null;ver=false">
← Volver
</button>

<h1>{{ sel.titulo }}</h1>

<iframe :src="sel.youtube" allowfullscreen></iframe>

<a :href="sel.roblox" target="_blank" class="play">

Play

</a>

<p><strong>Personajes:</strong> {{ sel.personajes }}</p>

<button @click="ver=!ver">

{{ ver ? 'Ocultar descripción' : 'Ver descripción' }}

</button>

<div
v-show="ver"
class="desc">

{{ sel.descripcion }}

</div>

</div>

</template>

<style scoped>
.inicio{
  background:#f5f7fb;
  min-height:100vh;
}

.fondo{
  min-height:100vh;
  background-size:cover;
  background-position:center;
  background-repeat:no-repeat;
  padding:30px;
}
.gp{
padding:30px;
}

iframe{
width:100%;
aspect-ratio:16/9;
border:none;
border-radius:15px;
}

.play{
display:block;
background:#00b06f;
color:white;
text-align:center;
padding:15px;
border-radius:12px;
text-decoration:none;
margin:20px 0;
}

.desc{
background:rgba(255,255,255,.2);
padding:15px;
border-radius:12px;
}
</style>