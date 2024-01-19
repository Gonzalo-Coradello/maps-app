import { searchApi } from '@/apis'
import type { PlacesResponse, Feature } from '@/interface/places'
import { defineStore } from 'pinia'

export interface PlacesState {
  isLoading: boolean
  isLoadingPlaces: boolean
  userLocation?: [number, number]
  places: Feature[]
}

export const usePlacesStore = defineStore('places', {
  state: (): PlacesState => ({
    isLoading: true,
    isLoadingPlaces: false,
    userLocation: undefined,
    places: []
  }),

  getters: {
    isUserLocationReady(state) {
      return !!state.userLocation
    }
  },

  actions: {
    getInitialLocation() {
      // TODO: agregar loading
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => (this.userLocation = [coords.longitude, coords.latitude])
      )
    },

    async searchPlacesByTerm(query: string): Promise<Feature[]> {
      if (query.length === 0) {
        return []
      }

      if (!this.userLocation) {
        throw new Error('No hay ubicación del usuario')
      }

      this.isLoadingPlaces = true

      const { data } = await searchApi.get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this.userLocation?.join(',')
        }
      })

      this.places = data.features
      this.isLoadingPlaces = false

      return data.features
    }
  }
})
