<script setup lang="ts">
import { computed } from 'vue';
import { useHotelStore } from '../stores/hotel';

const props = defineProps({
  hotel: {
    type: Object as () => ({ id: number; name: string; city: string; price: number; rating: number }),
    required: true,
  },
});

const store = useHotelStore();
const reservationLink = computed(() => `/hotels/${props.hotel.id}/reserve`);

function handleClick() {
  store.selectHotel(props.hotel);
  navigateTo(reservationLink.value);
}
</script>

<template>
  <div 
    @click="handleClick" 
    class="cursor-pointer block bg-white shadow-lg rounded-xl overflow-hidden 
           transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1
           flex flex-col h-full"
  >
    <div class="p-5 flex-grow">
      
      <div>
        <h3 class="text-lg font-semibold text-gray-900 leading-tight">
          {{ hotel.name }}
        </h3>
        <p class="text-sm text-gray-500 mt-1">
          {{ hotel.city }}
        </p>
      </div>

      <div class="mt-4 flex items-end justify-between">
        <span class="inline-flex items-center gap-1">
          <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527a.562.562 0 00-.162.505l1.098 5.284c.284 1.366-1.217 2.44-2.368 1.816l-4.816-2.997a.563.563 0 00-.616 0l-4.816 2.997c-1.15.624-2.652-.45-2.368-1.816l1.098-5.284a.562.562 0 00-.162-.505l-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433L10.788 3.21z" clip-rule="evenodd" />
          </svg>
          <span class="text-base font-bold text-gray-800">{{ hotel.rating }}</span>
        </span>
        
        <div class="text-right">
          <p class="text-xs text-gray-500">A partir de</p>
          <span class="text-xl font-bold text-gray-900">R$ {{ hotel.price }}</span>
        </div>
      </div>
    </div>

    <div class="p-4 bg-gray-50 border-t border-gray-100">
      <span 
        class="block w-full text-center px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold text-sm
               transition-colors"
      >
        Reservar Agora
      </span>
    </div>
  </div>
</template>