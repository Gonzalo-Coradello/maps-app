<script setup lang="ts">
import { useMap } from '@/composables'

const { distance, duration } = useMap()
</script>

<template>
  <div v-if="distance" class="trip-container column">
    <div class="col">
      Distancia: <strong>{{ distance }} kms</strong>
    </div>
    <div class="col">
      Duración: <strong>{{ duration }} minutos</strong>
    </div>
  </div>
</template>

<style scoped>
.trip-container {
  background-color: black;
  border-radius: 10px;
  bottom: 35px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
  font-size: 22px;
  left: 30px;
  padding: 10px 20px;
  position: fixed;
  width: 250px;
}
</style>
