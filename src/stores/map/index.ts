import mapboxgl from 'mapbox-gl'
import { defineStore } from 'pinia'
import type { Feature } from '@/interface/places'
import { directionsApi } from '@/apis'
import type { DirectionsResponse } from '@/interface/directions'

interface MapState {
  map?: mapboxgl.Map
  markers: mapboxgl.Marker[]
  distance?: number
  duration?: number
}

export type LngLat = [number, number]

export const useMapStore = defineStore('map', {
  state: (): MapState => ({
    map: undefined,
    markers: [],
    distance: undefined,
    duration: undefined
  }),
  actions: {
    setMap(map: mapboxgl.Map) {
      this.map = map
    },

    setPlaceMarkers(places: Feature[]) {
      if (!this.map) return

      this.markers.forEach((marker) => marker.remove())
      this.markers = []

      for (const place of places) {
        const [lng, lat] = place.center

        const popup = new mapboxgl.Popup().setLngLat([lng, lat]).setHTML(`
          <h4>${place.text}</h4>
          <p>${place.place_name}</p>
          `)

        const marker = new mapboxgl.Marker().setLngLat([lng, lat]).setPopup(popup).addTo(this.map)

        this.markers.push(marker)
      }

      if (this.map.getLayer('RouteString')) {
        this.map.removeLayer('RouteString')
        this.map.removeSource('RouteString')
        this.distance = undefined
        this.duration = undefined
      }
    },

    async getRouteBetweenPoints({ start, end }: { start: LngLat; end: LngLat }) {
      const { data } = await directionsApi.get<DirectionsResponse>(
        `${start.join(',')};${end.join(',')}`
      )

      this.setDistanceDuration({
        distance: data.routes[0].distance,
        duration: data.routes[0].duration
      })

      this.setRoutePolyline(data.routes[0].geometry.coordinates)
    },

    setRoutePolyline(coords: number[][]) {
      const start = coords[0]

      // Definir los bounds
      const bounds = new mapboxgl.LngLatBounds([start[0], start[1]], [start[0], start[1]])

      // Agregar cada punto a los bounds
      for (const coord of coords) {
        const newCoord: [number, number] = [coord[0], coord[1]]
        bounds.extend(newCoord)
      }

      this.map?.fitBounds(bounds)

      const sourceData: mapboxgl.AnySourceData = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: coords
              }
            }
          ]
        }
      }

      if (this.map?.getLayer('RouteString')) {
        this.map.removeLayer('RouteString')
        this.map.removeSource('RouteString')
      }

      this.map?.addSource('RouteString', sourceData)

      this.map?.addLayer({
        id: 'RouteString',
        type: 'line',
        source: 'RouteString',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': 'black',
          'line-width': 3
        }
      })
    },

    setDistanceDuration({ distance, duration }: { distance: number; duration: number }) {
      let kms = distance / 1000
      kms = Math.round(kms + 100) / 100

      this.distance = kms
      this.duration = Math.floor(duration / 60)
    }
  },

  getters: {
    isMapReady(state) {
      !!state.map
    }
  }
})
