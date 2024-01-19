import { usePlaces, useMap } from '@/composables'
import { defineComponent, onMounted, ref, watch } from 'vue'
import mapboxgl from 'mapbox-gl'

export default defineComponent({
  name: 'MapView',
  setup() {
    const mapElement = ref<HTMLDivElement>()
    const { isLoading, userLocation, isUserLocationReady } = usePlaces()
    const { setMap } = useMap()

    const initMap = async () => {
      if (!mapElement.value) throw new Error('Map container does not exist')
      if (!userLocation.value) throw new Error('User location does not exist')

      await Promise.resolve()

      const map = new mapboxgl.Map({
        container: mapElement.value,
        style: 'mapbox://styles/mapbox/dark-v10',
        center: userLocation.value,
        zoom: 15
      })

      const myLocationPopup = new mapboxgl.Popup().setLngLat(userLocation.value).setHTML(`
          <h4>Aquí estoy</h4>
          <p>${userLocation.value}</p>
        `)

      new mapboxgl.Marker().setLngLat(userLocation.value).setPopup(myLocationPopup).addTo(map)

      setMap(map)
    }

    onMounted(() => {
      if (isUserLocationReady.value) {
        return initMap()
      }
    })

    watch(isUserLocationReady, () => {
      if (isUserLocationReady.value) initMap()
    })

    return {
      isLoading,
      userLocation,
      isUserLocationReady,
      mapElement
    }
  }
})
