<script setup lang="ts">
  import { useAsyncData } from 'nuxt/app';
  import { ref } from 'vue';

  const destination = ref('');

  const { data: hotels, pending, error, execute } = useAsyncData(
    'search-hotels',
    () => $fetch('/api/hotels/search', {
      params: { 
        destination: destination.value,
      },
    })
  );
</script>


<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 mb-6">
        Pesquisar Hotéis
      </h1>
      
      <div class="bg-white shadow-lg rounded-2xl p-6">
        <form @submit.prevent="execute" class="flex flex-col sm:flex-row gap-4 items-end">
          
          <div class="w-full sm:flex-1">
            <label for="destination" class="block text-sm font-medium text-gray-700">
              Destino
            </label>
            <input 
              type="text"
              id="destination"
              v-model="destination" 
              placeholder="Para onde você vai?" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
            />
          </div>
          
          <div>
            <button 
              type="submit" 
              class="w-full sm:w-auto px-6 py-2.5 rounded-md shadow-sm bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Pesquisar
            </button>
          </div>
        </form>
      </div>

      <div class="mt-2 pt-2">
        
        <div v-if="pending" class="flex justify-center p-12">
          <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="ml-3 text-lg text-gray-600">Carregando...</span>
        </div>
        
        <div v-else-if="error" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Ocorreu um erro</h3>
              <p class="mt-1 text-sm text-red-700">{{ error.message }}</p>
            </div>
          </div>
        </div>

        <div v-else-if="hotels && hotels.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          <HotelCard v-for="hotel in hotels" :key="hotel.id" :hotel="hotel" />
        </div>
        
        <div v-else class="text-center p-12 bg-white shadow-lg rounded-2xl">
          <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <h3 class="mt-2 text-lg font-medium text-gray-900">Nenhum hotel encontrado</h3>
          <p class="mt-1 text-sm text-gray-500">Tente outros critérios de busca.</p>
        </div>

      </div>
    </div>
  </div>
</template>