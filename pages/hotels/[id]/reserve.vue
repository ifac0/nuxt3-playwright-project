<script setup lang="ts">
import { navigateTo, useRoute, useRouter } from 'nuxt/app';
import { ref } from 'vue';
import { useHotelStore } from '../../../stores/hotel';

definePageMeta({
  middleware: 'auth'
});

const route = useRoute();
const router = useRouter();
const hotelId = route.params.id;

const hotelStore = useHotelStore();
const selectedHotel = hotelStore.selectedHotel;

const hotelName = selectedHotel ? selectedHotel.name : `Hotel #${hotelId}`;

const userName = ref('');
const userContact = ref('');
const notification = ref<{ type: string; message: string } | null>(null);
const isLoading = ref(false);

function goBack() {
  router.back();
}

async function submitReservation() {
  if (isLoading.value) return;

  isLoading.value = true;
  notification.value = null;

  try {
    const response = await $fetch('/api/hotels/reserve', {
      method: 'POST',
      body: {
        hotelId: hotelId,
        userName: userName.value,
        contact: userContact.value
      },
    });

    notification.value = { type: 'success', message: `${response.status}. Redirecionando para a página principal...` };
    

    setTimeout(() => {
      hotelStore.clearSelection();
      navigateTo('/');
    }, 3000);

  } catch (e: any) {
    notification.value = { type: 'error', message: e.data?.statusMessage || 'Erro ao reservar' };
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
    
    <div class="max-w-lg mx-auto">
      <div class="flex items-center gap-3 mb-4">
        <button 
          @click="goBack" 
          class="p-2 rounded-full text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          aria-label="Voltar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Confirmar Reserva
        </h1>
      </div>

      <div class="bg-white shadow-xl rounded-2xl overflow-hidden">
        
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800">
            {{ hotelName }}
          </h2>
          <p class="text-sm text-gray-500">
            ID da Propriedade: #{{ hotelId }}
          </p>
        </div>

        <div v-if="notification" class="px-6 pt-6">
          <div 
            :class="notification?.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'"
            class="rounded-md border p-4"
          >
            <div class="flex">
              <div class="flex-shrink-0">
                <svg v-if="notification?.type === 'success'" class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                </svg>
                <svg v-else class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium">
                  {{ notification?.message }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <form @submit.prevent="submitReservation" class="p-6 space-y-6">
          
          <div>
            <label for="userName" class="block text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <div class="mt-1">
              <input 
                v-model="userName" 
                id="userName" 
                type="text" 
                placeholder="Seu nome completo" 
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
              />
            </div>
          </div>

          <div>
            <label for="userContact" class="block text-sm font-medium text-gray-700">
              Email ou Telefone
            </label>
            <div class="mt-1">
              <input 
                v-model="userContact" 
                id="userContact" 
                type="text" 
                placeholder="seu@email.com ou (xx) xxxxx-xxxx" 
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
              />
            </div>
          </div>
            
          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                   bg-indigo-600 hover:bg-indigo-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                   disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
          >
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? 'Confirmando...' : 'Confirmar Reserva' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>