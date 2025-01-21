<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { VBtn, VContainer, VCard, VCardText, VCardTitle, VCardActions, VTextField, VForm } from 'vuetify/lib/components/index.mjs';

const email = ref('');
const password = ref('');
const isValid = ref(false);
const router = useRouter();

const rules = {
  required: (value) => !!value || 'Field is required',
  email: (value) => /.+@.+\..+/.test(value) || 'Invalid email address',
};

const submitLogin = () => {
  if (isValid.value) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === email.value && u.password === password.value);

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      alert('Login successful!');
      router.push(`/chat/${user.username}`); 
    } else {
      alert('Invalid credentials');
    }
  }
};
</script>

<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card class="pa-5 w-100">
      <v-card-title class="text-h5">Login</v-card-title>
      <v-card-text>
        <v-form ref="loginForm" v-model="isValid" lazy-validation>
          <v-text-field
            v-model="email"
            label="Email"
            :rules="[rules.required, rules.email]"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="[rules.required]"
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
