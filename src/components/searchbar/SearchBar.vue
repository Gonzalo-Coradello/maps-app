<script lang="ts" setup>
// @ts-ignore
import { usePlaces } from '@/composables';
import SearchResults from '../search-results/SearchResults.vue'

import { ref, computed } from 'vue'

let debounceTimeout = ref()
let debouncedValue = ref('')

const { searchPlacesByTerm } = usePlaces()

const searchTerm = computed({
  get() {
    return debouncedValue.value
  },

  set(value) {
    if (debounceTimeout.value) clearTimeout(debounceTimeout.value)

    debounceTimeout.value = setTimeout(() => {
      debouncedValue.value = value
      searchPlacesByTerm(value)
    }, 500)
  }
})
</script>

<template>
  <div class="searchbar-container">
    <input type="text" class="form-control" placeholder="Buscar lugares" v-model="searchTerm" />
    <SearchResults />
  </div>
</template>

<style scoped>
.searchbar-container {
  position: fixed;
  top: 30px;
  left: 30px;
  background-color: #ffffff;
  z-index: 9999;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  width: 250px;
  border-radius: 10px;
  overflow: hidden;
}
</style>
