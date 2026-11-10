<script setup lang="ts">
withDefaults(
  defineProps<{
    categories?: string[]
    selectedCategory?: string
  }>(),
  {
    categories: () => [],
    selectedCategory: 'Todas',
  },
)

const emit = defineEmits<{
  'update:selectedCategory': [category: string]
}>()
</script>

<template>
  <section class="category-bar" aria-label="Filtrar videos por categoría">
    <button
      class="category-button"
      :class="{ active: selectedCategory === 'Todas' }"
      type="button"
      :aria-pressed="selectedCategory === 'Todas'"
      @click="emit('update:selectedCategory', 'Todas')"
    >
      Todas
    </button>

    <button
      v-for="category in categories"
      :key="category"
      class="category-button"
      :class="{ active: selectedCategory === category }"
      type="button"
      :aria-pressed="selectedCategory === category"
      @click="emit('update:selectedCategory', category)"
    >
      {{ category }}
    </button>
  </section>
</template>

<style scoped>
.category-bar {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  min-height: 56px;
  align-items: center;
  padding: 10px 0;
  gap: 10px;
  overflow-x: auto;
  background: transparent;
  scrollbar-width: thin;
}

.category-button {
  flex: 0 0 auto;
  padding: 8px 16px;
  color: #cbc9d7;
  background: rgba(26, 22, 37, 0.9);
  border: 1px solid #383246;
  border-radius: 999px;
  font: inherit;
  font-size: 14px;
  cursor: pointer;
  transition: color 150ms ease, background-color 150ms ease, border-color 150ms ease;
}

.category-button:hover,
.category-button.active {
  color: #11111a;
  background: #71e2ff;
  border-color: #71e2ff;
}

.category-button:focus-visible {
  outline: 2px solid #ff70ad;
  outline-offset: 2px;
}

@media (max-width: 600px) {
  .category-bar {
    min-height: 50px;
    padding: 8px 0;
  }
}
</style>