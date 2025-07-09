<script setup lang="ts">
import { ref } from "vue";

const clicked = ref(false);
const upperLimit = ref(100);
const largestPrime = ref<number | null>(null);

const increaseLimit = () => {
  upperLimit.value += 100;
};

const findLargestPrime = async (): Promise<void> => {
  largestPrime.value = await window.electron.ipcRenderer.invoke(
    "find-prime",
    upperLimit.value
  );
  // console.log(upperLimit.value);
  console.log("Largest prime found:", largestPrime.value);
  increaseLimit();
  clicked.value = true;
};
</script>

<template>
  <button v-if="!clicked" @click="findLargestPrime">
    Find a large prime number!
  </button>
  <button v-else @click="findLargestPrime">
    Find the next largest prime less than {{ upperLimit }}
  </button>

  <div v-if="largestPrime !== null">Largest prime: {{ largestPrime }}</div>
</template>
