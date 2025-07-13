<script setup lang="ts">
import { ref } from "vue";

const path = ref("test");
const result = ref("");
const ReadDir = async () => {
  result.value = await window.electron.ipcRenderer.invoke(
    "read-files",
    path.value
  );
};
</script>

<template>
  <h1>Custom FS System</h1>
  <button @click="ReadDir">Read: {{ path }}</button>
  <div>{{ result }}</div>
</template>
