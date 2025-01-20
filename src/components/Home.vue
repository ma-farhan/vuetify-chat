<template>
    <v-container class="d-flex justify-center align-center ma-16 pa-16">
      <v-card class="mx-auto w-100 bg-blue" max-width="700">
        <v-card-title class="d-flex justify-center">Chat App</v-card-title>
        <v-card-actions class="d-flex justify-center gap-2">
          <VBtn @click="signup" target="_blank">Signup</VBtn>
          <VBtn @click="login">Login</VBtn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { VContainer,VCard,VCardTitle,VCardActions,VBtn } from 'vuetify/lib/components/index.mjs';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const signup = () => {
    router.push('/signup');
  };
  
  const login = () => {
    router.push('/login');
  };
  </script>
  
  <style scoped></style>
  