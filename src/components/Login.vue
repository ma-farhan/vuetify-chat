<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card class="pa-5 w-100">
      <v-card-title class="text-h5">Login</v-card-title>
      <v-card-text>
        <v-form ref="loginForm" v-model="isValid" lazy-validation>
          <v-text-field
            label="Email"
            v-model="email"
            :rules="[rules.required, rules.email]"
            required
          ></v-text-field>

          <v-text-field
            label="Password"
            v-model="password"
            :rules="[rules.required, rules.password]"
            type="password"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="primary" :disabled="!isValid" @click="submitLogin">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { VContainer,VCard,VCardTitle,VCardActions,VBtn,VCardText,VTextField,VForm } from 'vuetify/lib/components/index.mjs';

const email = ref('');
const password = ref('');
const isValid = ref(false);
const router = useRouter();

const rules = {
  required: (value) => !!value || 'Field is required',
  email: (value) => /.+@.+\..+/.test(value) || 'Invalid email address',
  password: (value) =>
    value?.length >= 6 || 'Password must be at least 6 characters long',
};

const submitLogin = () => {
  if (isValid.value) {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (storedUser && storedUser.email === email.value && storedUser.password === password.value) {
      alert('Login successful!');
      router.push(`/chat/${storedUser.username}`); // Redirect to chat
    } else {
      alert('Invalid credentials');
    }
  }
};
</script>

