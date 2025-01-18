<!-- App.vue -->
<template>
    <v-app>
      <v-main>

        <v-container class="d-flex justify-center align-center ma-16 pa-16">
          <v-card class="mx-auto w-100 bg-blue" max-width="700">
            <v-card-title class="d-flex justify-center">Chat App</v-card-title>
            <v-card-actions class="d-flex justify-center gap-2">
              <v-btn @click="signup" target="_blank">Signup</v-btn>
              <v-btn @click="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
        
        <router-view />
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const signup = () => {
    router.push('/signup');
  };
  
  const login = () => {
    router.push('/login');
  };
  </script>
  
  <style scoped>

  </style>
  