<script setup lang="ts">
import { ref, onMounted } from "vue";

const items = ref<Array<string>>([]);
const newitem = ref("");

const addItem = () => {
  items.value.push(newitem.value);
  newitem.value = "";
};

onMounted(() => {
  console.log(`This message is being logged by "TodoList.vue"`);
});
</script>

<template>
  This is the todo List

  <button @click="addItem">Add item</button>
  <input placeholder="important item" v-model="newitem" />

  <template v-for="item of items">
    <div>
      {{ item }}
    </div>
  </template>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
