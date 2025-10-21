<script setup lang="ts">

defineProps<{
  variant?: 'primary' | 'secondary';
  to?: string | object;
}>();
</script>

<template>
  <NuxtLink 
    v-if="to"
    :to="to"
    :class="variant === 'secondary' ? 'bg-gray-500' : 'bg-blue-500'"
    class="px-4 py-2 text-white rounded transition-colors text-center inline-block"
  >
    <slot />
  </NuxtLink>
  
  <button 
    v-else
    :class="variant === 'secondary' ? 'bg-gray-500' : 'bg-blue-500'"
    class="px-4 py-2 text-white rounded transition-colors"
  >
    <slot />
  </button>
</template>