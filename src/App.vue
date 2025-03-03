<template>
  <template v-if="verified">
    <SignOut @update:login-status="setLoginStatus" />
    <Welcome />
    <TodoList />
  </template>
  <template v-else>
    <SignIn @update:login-status="setLoginStatus" />
  </template>
</template>

<script setup lang="ts">
import { ref } from "vue";

import TodoList from "/src/pages/TodoList.vue";
import Welcome from "/src/pages/Welcome.vue";
import SignIn from "./pages/SignIn.vue";
import SignOut from "./pages/SignOut.vue";

const verified = ref(false);

const setLoginStatus = (loggedin: boolean) => {
  verified.value = loggedin;
};
</script>
