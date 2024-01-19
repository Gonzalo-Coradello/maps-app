import { useMapStore } from '@/stores/map'
import { computed } from 'vue'

export const useMap = () => {
  const store = useMapStore()

  return {
    map: computed(() => store.map),
    isMapReady: computed(() => store.isMapReady),
    distance: computed(() => store.distance),
    duration: computed(() => store.duration),
    setMap: store.setMap,
    setPlaceMarkers: store.setPlaceMarkers,
    getRouteBetweenPoints: store.getRouteBetweenPoints
  }
}
