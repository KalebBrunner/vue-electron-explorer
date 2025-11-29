<script setup lang="ts">
import Welcome from "./pages/Welcome.vue";
import filereader from "./pages/filereader.vue"

import { ref, computed, onMounted } from "vue";



const entries = ref([]);
const loading = ref(false);
const error = ref(null);



async function loadPath(path: string){
  try {

    entries.value =  await window.electron.readDir(path)

  } catch (e) {
    console.error(e);
    error.value = e?.message || "Failed to read directory.";
    entries.value = [];
}}

// 🔧 starting folder
const ROOT_PATH = "/home/kaleb";
const currentPath = ref(ROOT_PATH);

onMounted(() => {
  loadPath(ROOT_PATH);
});
</script>



<template>
  <Welcome />
  <filereader :files="entries" />
  <!-- <FileExplorer /> -->
</template>