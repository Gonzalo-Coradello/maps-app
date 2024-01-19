<script lang="ts" setup>
import { useMap, usePlaces } from '@/composables'
import type { Feature } from '@/interface/places'
import { ref, watch } from 'vue'

const { isLoadingPlaces, places, userLocation } = usePlaces()
const { map, setPlaceMarkers, getRouteBetweenPoints } = useMap()

const activePlace = ref('')

watch(places, (newPlaces) => {
  activePlace.value = ''
  setPlaceMarkers(newPlaces)
})

const onPlaceClicked = (place: Feature) => {
  activePlace.value = place.id

  const [lng, lat] = place.center

  map.value?.flyTo({
    center: [lng, lat],
    zoom: 15
  })
}

const getRouteDirections = (place: Feature) => {
  if (!userLocation.value) return

  activePlace.value = place.id

  const [lng, lat] = place.center

  const [startLng, startLat] = userLocation.value

  const start: [number, number] = [startLng, startLat]
  const end: [number, number] = [lng, lat]

  getRouteBetweenPoints({ start, end })

  map.value?.flyTo({
    center: [lng, lat],
    zoom: 15
  })
}
</script>

<template>
  <div v-if="isLoadingPlaces" class="alert alert-primary text-center">
    <h5>Cargando</h5>
    <p>Espere por favor...</p>
  </div>

  <ul v-else-if="places.length > 0" class="list-group mt-3">
    <li
      v-for="place in places"
      :key="place.id"
      class="list-group-item list-group-item-action"
      :class="{ active: place.id === activePlace }"
      @click="onPlaceClicked(place)"
    >
      <h5>{{ place.text }}</h5>
      <p>{{ place.place_name }}</p>
      <div align="right">
        <button
          class="btn btn-sm btn-outline-primary"
          :class="place.id === activePlace ? 'btn-outline-light' : 'btn-outline-primary'"
          @click.self="getRouteDirections(place)"
        >
          Direcciones
        </button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
ul {
  max-height: 320px;
  overflow-y: scroll;
}

li {
  cursor: pointer;
}

h5 {
  font-size: 15px !important;
}

p {
  font-size: 10px;
}
</style>
