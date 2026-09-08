<script setup lang="ts">
import { inject } from 'vue'

const sel = inject<any>('sel')

function seleccionar(){
  sel.value = props.jg
}

const props = withDefaults(defineProps<{
  jg?: {
    imagen?: string
    titulo?: string
    categoria?: string
    descripcion?: string
  }
}>(), {
  jg: () => ({})
})
</script>

<template>

<div class="card" @click="seleccionar">

<img :src="props.jg?.imagen">

<div class="info">

<h3>{{ props.jg?.titulo }}</h3>

<p>{{ props.jg?.categoria }}</p>

<p>{{ props.jg?.descripcion }}</p>

</div>

</div>

</template>

<style scoped>
.card{
background:white;
border-radius:18px;
overflow:hidden;
cursor:pointer;
}
img{
  width:100%;
  height:130px;
  display:block;
  object-fit:cover;
}
</style>