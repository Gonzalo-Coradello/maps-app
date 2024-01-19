<template>
  <button class="btn btn-light" @click="onMyLocationClicked">Ir a mi ubicación</button>
</template>

<script lang="ts">
import { useMap, usePlaces } from '@/composables'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'LocationBtn',
  setup() {
    const { userLocation, isUserLocationReady } = usePlaces()
    const { map, isMapReady } = useMap()

    return {
      isBtnReady: computed(() => isUserLocationReady.value && isMapReady.value),

      onMyLocationClicked: () => {
        map.value?.flyTo({
          center: userLocation.value,
          zoom: 15
        })
      }
    }
  }
})
</script>

<style scoped>
button {
  position: fixed;
  top: 30px;
  right: 30px;
}
</style>
