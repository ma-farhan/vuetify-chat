<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { VBtn,VContainer,VCard,VCardText,VCardTitle,VCardActions,VTextField,VForm } from 'vuetify/lib/components/index.mjs';

const username = ref('');
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

const submitSignup = () => {
  if (isValid.value) {
    const userDetails = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userDetails);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Signup successful!');
    router.push('/login');
  }
};
</script>

<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card class="pa-5 w-100">
      <v-card-title class="text-h5">Signup</v-card-title>
      <v-card-text>
        <v-form ref="signupForm" v-model="isValid" lazy-validation>
          <v-text-field v-model="username" label="Username" required></v-text-field>
          <v-text-field v-model="email" label="Email" :rules="[rules.required, rules.email]" required></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="[rules.required, rules.password]"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="primary" :disabled="!isValid" @click="submitSignup">Signup</v-btn>
        
      </v-card-actions>
    </v-card>
  </v-container>
</template>
