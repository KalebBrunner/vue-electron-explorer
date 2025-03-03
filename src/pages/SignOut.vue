<script setup lang="ts">
const emit = defineEmits<{
  (event: "update:login-status", value: boolean): void;
}>();
</script>

<template>
  <button @click="emit('update:login-status', false)">sign out</button>
</template>
