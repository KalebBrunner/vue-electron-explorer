<script setup lang="ts">
import Welcome from "./pages/Welcome.vue";
// import FileExplorer from "./pages/FileExplorer.vue";

const findPrime = async () => {
  const result = await (window as any).electron.ipcRenderer.invoke(
    "find-prime",
    100
  );
  console.log("Largest prime:", result);
};
</script>

<template>
  <Welcome></Welcome>
  <button @click="findPrime">Find Largest Prime</button>
</template>
