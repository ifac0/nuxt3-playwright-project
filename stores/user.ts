import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const isLoggedIn = computed(() => !!user.value);

  function login(username: string) {
    user.value = { name: username };
  }

  function logout() {
    user.value = null;
  }

  return { user, isLoggedIn, login, logout };
});