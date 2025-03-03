<script setup lang="ts">
import { fail } from "node:assert";
import { computed, ref } from "vue";

// type MyEvent = (event: "myEvent", value: boolean) => void;
// const emit = defineEmits<{ myEvent: MyEvent }>();

const emit = defineEmits<{
  (event: "update:login-status", value: boolean): void;
}>();

const userName = ref<string | null | undefined>(undefined);
const userString = ref("");
const failedAttemtps = ref(0);
const failedAttemptsMessege = computed(() => {
  if (failedAttemtps.value === 0) {
    return null;
  }
  if (failedAttemtps.value === 1) {
    return "You have 1 failed attempt.";
  }
  return `You have ${failedAttemtps.value} failed attempts.`;
});

const verifyName = () => {
  if (userString.value === "Kaleb") {
    userName.value = userString.value;
    emit("update:login-status", true);
  } else if (userString.value === "") {
    userName.value = undefined;
    emit("update:login-status", false);
  } else {
    userName.value = null;
    emit("update:login-status", false);
    failedAttemtps.value += 1;
  }
};
</script>

<template>
  <h1>Sign in</h1>
  <p>Enter your name</p>

  <button @click="verifyName">Enter Name</button>
  <input placeholder="Joe Smith" v-model="userString" />

  <p v-if="failedAttemptsMessege !== null">{{ failedAttemptsMessege }}</p>

  <p v-if="userName === null">Username not found</p>

  <!-- <p v-else-if="typeof userName === 'string'">Welcome {{ userName }}</p> -->
</template>
