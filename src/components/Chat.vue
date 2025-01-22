<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { IconSend2 } from '@tabler/icons-vue';
import { VBtn, VContainer, VCard, VCardText, VCardTitle, VListItem, VList, VListItemTitle, VNavigationDrawer, VDivider, VRow, VCol, VChip, VTextField, VSpacer, VForm } from 'vuetify/lib/components/index.mjs';

defineProps();
const loggedInUser = ref(JSON.parse(localStorage.getItem('loggedInUser')));
const currentUser = ref(null);
const otherUsers = ref(
  JSON.parse(localStorage.getItem('users')).filter(
    (u) => u.username !== loggedInUser.value.username
  )
);
const messages = ref(JSON.parse(localStorage.getItem('messages')) || {});
const clearedChats = ref(JSON.parse(localStorage.getItem('clearedChats')) || {});
const message = ref('');


const getChatKey = (user1, user2) => {
  const users = [user1, user2].sort();
  return `${users[0]}_${users[1]}`;
};

const chatBox = ref([])
const getData = () => {
  chatBox.value = messages.value[getChatKey(loggedInUser.value.username, currentUser.value.username)]

}

const switchUser = (user) => {
  currentUser.value = user;
  getData()
};

const clearMessages = () => {
  if (currentUser.value) {
    const chatKey = getChatKey(loggedInUser.value.username, currentUser.value.username);


    if (!clearedChats.value[loggedInUser.value.username]) {
      clearedChats.value[loggedInUser.value.username] = [];
    }

    console.log('werwer', messages.value[chatKey]);
    // if (!clearedChats.value[loggedInUser.value.username].includes(chatKey)) {
    clearedChats.value[loggedInUser.value.username] = messages.value[chatKey].length;
    // }


    localStorage.setItem('clearedChats', JSON.stringify(clearedChats.value));
    alert(`Chat with ${currentUser.value.username} cleared for you.`);
  }
};

const logout = () => {
  localStorage.removeItem('loggedInUser');
  loggedInUser.value = null;
  alert('Logged out successfully!');
  window.location.href = '/login';
};


const sendMessage = () => {
  if (message.value.trim()) {
    const chatKey = getChatKey(loggedInUser.value.username, currentUser.value.username);

    if (!messages.value[chatKey]) {
      messages.value[chatKey] = [];
    }

    messages.value[chatKey].push({
      text: message.value,
      timestamp: new Date().toLocaleString(),
      from: loggedInUser.value.username,
    });


    // if (clearedChats.value[loggedInUser.value.username]) {
    //   clearedChats.value[loggedInUser.value.username] = clearedChats.value[
    //     loggedInUser.value.username
    //   ].filter((key) => key !== chatKey);
    // }


    localStorage.setItem('messages', JSON.stringify(messages.value));
    // localStorage.setItem('clearedChats', JSON.stringify(clearedChats.value));

    message.value = '';
    // nextTick(() => {
    //   const container = document.querySelector('[ref="messageContainer"]');
    //   container.scrollTop = container.scrollHeight;
    // });
  } else {
    alert('Please enter a message!');
  }
};

onMounted(() => {
  if (!loggedInUser.value) {
    // alert('Please log in!');
    return;
  }
});
</script>


<template>
  <v-navigation-drawer expand-on-hover app permanent>
    <v-list>
      <v-list-item>
        <v-list-item-title>Welcome, {{ loggedInUser.username }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list density="compact" nav>
      <v-list-item v-for="user in otherUsers" :key="user.username" @click="switchUser(user)">
        <v-list-item-title>{{ user.username }}</v-list-item-title>
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

  <v-card class="w-100 d-flex flex-column justify-space-between h-100 pa-0">
    <v-card-title v-if="currentUser" class="d-flex justify-space-between">
      Chat with {{ currentUser.username }}
      <v-btn @click="clearMessages">Clear Chat</v-btn>
    </v-card-title>
    <v-card-title v-else>
      Select a user to text
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text ref="messageContainer" class="flex-grow-1 pa-4">
      <div v-if="currentUser">
        <div v-for="msg in chatBox.slice(clearedChats[loggedInUser.username]) || []" :key="msg.timestamp" :class="{
          'd-flex flex-column align-end my-2': msg.from === loggedInUser.username,
          'd-flex flex-column align-start my-2': msg.from !== loggedInUser.username,
        }">
          <v-chip :class="msg.from === loggedInUser.username ? 'primary' : 'secondary'">
            <div>{{ msg.text }}</div>
            <sub>
              <div class="text-caption" style="font-size: 0.75rem;">
                {{ msg.timestamp }} </div>
            </sub>

          </v-chip>

        </div>
      </div>
    </v-card-text>

    <v-form v-if="currentUser">
      <v-container>
        <v-row class="pa-2 d-flex align-center">
          <v-col cols="12" class="d-flex align-center justify-space-between">
            <v-text-field v-model="message" label="Message" type="text" clearable class="flex-grow-1">
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
</template>

<style>
.primary {
  background-color: #e3f2fd;
}

.secondary {
  background-color: #e3f2fd;
}

.align-end {
  align-self: flex-end;
}

.align-start {
  align-self: flex-start;
}
</style>
