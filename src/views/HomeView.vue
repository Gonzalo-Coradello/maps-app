<script setup lang="ts">
import { usePlaces } from '@/composables'
import MapView from '@/components/mapview/MapView.vue'
import LocationBtn from '@/components/location-btn/LocationBtn.vue'
import SearchBar from '@/components/searchbar/SearchBar.vue'
import TripDetails from '@/components/trip-details/TripDetails.vue'

usePlaces()
</script>

<template>
  <MapView />
  <LocationBtn />
  <SearchBar />
  <TripDetails />
</template>
