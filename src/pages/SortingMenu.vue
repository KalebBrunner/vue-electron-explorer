<!-- SortingMenu.vue -->
<script setup lang="ts">
import { ref } from "vue";
import { File } from "../objects/file";
import { group, sortByGroup } from "../objects/hierarchy";

// fake file tree for testing
// const bakedfiles = ref<File[]>([
//   new File("notes.txt", "C://Test/notes.txt", false, 1234),
//   new File("report.doc", "C://Test/report.doc", false, 4567),
//   new File("photo.png", "C://Test/photo.png", false, 2345),
//   new File("portrait.jpg", "C://Test/portrait.jpg", false, 3456),
//   new File("random.bin", "C://Test/random.bin", false, 999),
// ]);

const props = defineProps<{ modelValue: File[] }>();
const emit = defineEmits<{ (e: "update:modelValue", files: File[]): void }>();

const hierarchy = group(group(".txt", ".jpg", ".mp3"), group(".png", ".doc"));

const applyHierarchySort = () => {
  const copy = [...props.modelValue];
  const ordered = sortByGroup(copy, hierarchy);
  emit("update:modelValue", ordered.concat(copy));
};
</script>

<template>
  <button @click="applyHierarchySort">Sort by Extension Hierarchy</button>
</template>
