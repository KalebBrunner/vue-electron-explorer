<!-- SortingMenu.vue -->
<script setup lang="ts">
import { ref } from "vue";
import { File } from "../objects/file";
import { extension, extensionsGroup, recursive } from "../objects/hierarchy";

const bakedfiles = ref<File[]>([
  new File("notes.txt", "C://Test/notes.txt", false, 1234),
  new File("report.doc", "C://Test/report.doc", false, 4567),
  new File("photo.png", "C://Test/photo.png", false, 2345),
  new File("portrait.jpg", "C://Test/portrait.jpg", false, 3456),
  new File("random.bin", "C://Test/random.bin", false, 999),
]);

const props = defineProps<{ modelValue: File[] }>();
const emit = defineEmits<{ (e: "update:modelValue", files: File[]): void }>();

const hierarchy = new extensionsGroup([
  new extensionsGroup([new extension(".jpg"), new extension(".txt")]),
  new extensionsGroup([new extension(".png"), new extension(".doc")]),
]);

const applyHierarchySort = () => {
  const copy = [...props.modelValue];
  const ordered = recursive(copy, hierarchy);
  emit("update:modelValue", ordered.concat(copy));
};
</script>

<template>
  <button @click="applyHierarchySort">Sort by Extension Hierarchy</button>
</template>
