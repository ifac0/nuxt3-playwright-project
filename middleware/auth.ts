import { defineNuxtRouteMiddleware } from "nuxt/app";
import { useUserStore } from "../stores/user"; // <-- Altere para este caminho

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore(); 

  if (!userStore.isLoggedIn) {
    userStore.login('Usuário Teste');
    console.log('Usuário não logado, fazendo login de mock...');
  }
});