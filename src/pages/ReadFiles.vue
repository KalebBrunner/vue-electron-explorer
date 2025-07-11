<script setup lang="ts">
import { ref } from "vue";

const dirSize = ref("");
const path = ref("C:/Users/Kaleb/Downloads");

// const readSize = async (): Promise<void> => {
//   dirSize.value = await window.electron.ipcRenderer.invoke(
//     "read-files",
//     path.value
//   );
//   console.log("Directory Size: ", dirSize.value);
// };

const testResults = async () => {
  const stringResult = await window.electron.ipcRenderer.newInvoke(
    "test_string"
  );
  const numberResult = await window.electron.ipcRenderer.newInvoke(
    "test_number"
  );
  console.log(stringResult, numberResult);
};
</script>

<template>
  <h1>File Reader</h1>

  <button @click="testResults">Read</button>
</template>
