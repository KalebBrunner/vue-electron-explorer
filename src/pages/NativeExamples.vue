<script setup lang="ts">
import { ref } from "vue";

const dirSize = ref("");
const path = ref("C:/Users/Kaleb/Downloads");

const testResults = async () => {
  const stringResult = await window.electron.ipcRenderer.invoke("test_string");
  const numberResult = await window.electron.ipcRenderer.invoke("test_number");
  console.log(stringResult, numberResult);
};

const string = ref("");
const getString = async () => {
  string.value = await window.electron.ipcRenderer.invoke("addon-getString");
  console.log("Got the string: ", string.value);
};

const number = ref(0);
const getNumber = async () => {
  number.value = await window.electron.ipcRenderer.invoke("addon-getNumber");
  console.log("Got the number: ", number.value);
};

const num1 = ref();
const num2 = ref();
const sum = ref(0);
const addNumbers = async (a: number, b: number) => {
  // console.log("a:", a, "type:", typeof a);
  // console.log("b:", b, "type:", typeof b);
  sum.value = await window.electron.ipcRenderer.invoke(
    "addon-addNumbers",
    a,
    b
  );
  console.log("Summed the number: ", sum.value);
};
</script>

<template>
  <h1>testResults</h1>
  <div>
    <button @click="testResults">Test Results</button>
  </div>

  <div>
    <button @click="getString">Get string from native code</button>
  </div>

  <div>
    <button @click="getNumber">Get number from native code</button>
  </div>

  <div>
    <input type="number" v-model="num1" placeholder="enter a number" />
    <input type="number" v-model="num2" placeholder="enter a second number" />
  </div>

  <div>
    <button @click="addNumbers(num1, num2)">Add numbers with C</button>
  </div>
</template>
