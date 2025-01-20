<template>
  <!-- <v-container class="h-100  pa-0 ma-0"> -->

  <v-navigation-drawer expand-on-hover app permanent>
    <v-list>
      <v-list-item>
        <v-list-item-title>Welcome, {{ loggedInUser }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item v-for="user in otherUsers" :key="user" @click="switchUser(user)">
        <v-list-item-title>{{ user }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-spacer></v-spacer>

    <template v-slot:append>
      <div class="pa-2 d-flex justify-center">
        <v-btn block @click="logout">Logout</v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <!-- <v-container class="d-flex flex-column h-100 w-100 pa-0"> -->
  <v-card class="w-100 d-flex flex-column justify-space-between h-100 pa-0">


    <v-card-title v-if="currentUser" class="d-flex justify-space-between">
      Chat with {{ currentUser }}<v-btn>Clear Chat</v-btn>
    </v-card-title>
    <v-card-title v-else>
      Select a user to text
    </v-card-title>

    <v-divider></v-divider>


    <v-card-text class="flex-grow-1 pa-4">
      <div v-if="!currentUser" class="text-muted text-center">
        Please select a user from the drawer to start chatting.
      </div>
      <div v-else class="d-flex flex-column justify-content-end align-end">
        <div v-for="(msg, index) in messages" :key="index" class="my-2">
          <v-chip>
            <div>{{ msg.text }}</div>
          </v-chip>
          <div class="text-caption text-right" style="font-size: 0.75rem;">
            {{ msg.timestamp }}
          </div>
        </div>
      </div>
    </v-card-text>




    <v-form v-if="currentUser">
      <v-container>
        <v-row class="pa-2 d-flex align-center">
          <v-col cols="12" class="d-flex align-center justify-space-between">
            <v-text-field v-model="message" label="Message" type="text" variant="filled" clearable class="flex-grow-1">
              <template #append>
                <v-btn class="cursor-pointer" @click="sendMessage">
                  <IconSend2 />
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
  <!-- </v-container> -->
  <!-- </v-container> -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { IconSend2 } from '@tabler/icons-vue';
import {
  VContainer,
  VNavigationDrawer,
  VList,
  VListItem,
  VListItemTitle,
  VDivider,
  VSpacer,
  VRow,
  VBtn,
  VCard,
  VCardTitle,
  VCardText,
  VTextField,
  VCol,
  VForm,
  VChip
} from 'vuetify/components';

const loggedInUser = ref(localStorage.getItem('storedUser') || 'guest');
const currentUser = ref(null);

const otherUsers = ref(['Alice', 'Bob', 'Charlie']);
const message = ref('');
const messages = ref([]);

const switchUser = (user) => {
  currentUser.value = user;
};

const logout = () => {
  localStorage.removeItem('currentUser');
  loggedInUser.value = '';
  alert('Logged out successfully!');
};

const sendMessage = () => {
  if (message.value.trim()) {

    const timestamp = new Date().toLocaleString();
    messages.value.push({
      text: message.value,
      timestamp: timestamp,
    });

    message.value = '';

    nextTick(() => {
      const container = document.querySelector('[ref="messageContainer"]');
      container.scrollTop = container.scrollHeight;
    });
  } else {
    alert('Please enter a message!');
  }
};


onMounted(() => {
  const loggedInUserDetails = localStorage.getItem('currentUser');
  if (!loggedInUserDetails) {
    alert('Please log in!');
  }
});
</script>
