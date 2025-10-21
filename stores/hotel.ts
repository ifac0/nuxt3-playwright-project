import { defineStore } from 'pinia';
import { ref } from 'vue';

type Hotel = {
  id: number;
  name: string;
  city: string;
  price: number;
  rating: number;
} | null;

export const useHotelStore = defineStore('hotel', () => {
  const selectedHotel = ref<Hotel>(null);

  function selectHotel(hotel: Hotel) {
    selectedHotel.value = hotel;
  }

  function clearSelection() {
    selectedHotel.value = null;
  }

  return { selectedHotel, selectHotel, clearSelection };
});