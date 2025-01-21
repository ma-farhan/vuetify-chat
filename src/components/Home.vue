<template>
  <v-app class="ma-16 pa-14">
    <v-container class="d-flex justify-center align-center mx-auto">
      <v-card class="mx-auto h-100 w-100 bg-blue text-center" max-width="700">
        <v-card-title class="d-flex justify-center" style="font-size: 50px;">Chat App</v-card-title>
        <v-card-actions class="d-flex justify-center gap-7">
          <VBtn @click="signup" target="_blank" style="font-size: 30px;">Signup</VBtn>
          <VBtn @click="login" style="font-size: 30px;">Login</VBtn>

        </v-card-actions><br><br>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup>
import { VContainer, VCard, VCardTitle, VCardActions, VBtn, VApp } from 'vuetify/lib/components/index.mjs';
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
.v-card .v-card-title {
  line-height: 5;
}

.v-card-actions {
  align-items: center;
  display: flex;
  flex: none;
  min-height: 52px;
  padding: 0.5rem;
  gap: 2rem;
}
</style>