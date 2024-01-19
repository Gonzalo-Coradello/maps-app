import { computed, onMounted } from 'vue'
import { usePlacesStore } from '../stores/places'

export const usePlaces = () => {
  const store = usePlacesStore()

  onMounted(() => {
    if (!store.isUserLocationReady) {
      store.getInitialLocation()
    }
  })

  return {
    isLoading: computed(() => store.isLoading),
    userLocation: computed(() => store.userLocation),
    places: computed(() => store.places),
    isLoadingPlaces: computed(() => store.isLoadingPlaces),
    isUserLocationReady: computed(() => store.isUserLocationReady),
    searchPlacesByTerm: store.searchPlacesByTerm
  }
}
