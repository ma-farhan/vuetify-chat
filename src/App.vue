<template>
  <v-app>
    <v-main>
      <router-view class="w-100" />
    </v-main>
  </v-app>
</template>

<script setup>
import { VApp, VMain } from 'vuetify/lib/components/index.mjs';
</script>

<style scoped></style>
