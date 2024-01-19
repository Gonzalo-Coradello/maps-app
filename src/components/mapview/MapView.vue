<script lang="ts" src="./MapView.ts" />

<template>
  <div
    v-if="!isUserLocationReady"
    class="loading-map d-flex justify-content-center align-items-center"
  >
    <div class="text-center">
      <h2>Espere por favor</h2>
      <span>Localizando...</span>
    </div>
  </div>

  <div v-show="isUserLocationReady" class="map-container" ref="mapElement"></div>
</template>

<style scoped>
.loading-map {
  background-color: #000a;
  color: #ffffff;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 9999;
}

.map-container {
  background-color: #ffffff;
  height: 100vh;
  position: fixed;
  width: 100vw;
}
</style>
