<script setup lang="ts">
const props = defineProps<{ path: string }>();
const emit = defineEmits<{ (e: "update:modelValue", path: string): void }>();
</script>

<template>
  <h1>This is the CD Direct component</h1>
</template>
