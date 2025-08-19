<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "navigate", value: string): void;
}>();

const inputValue = ref(props.modelValue);

// keep in sync if parent changes it
watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal;
  }
);

function submit() {
  emit("update:modelValue", inputValue.value);
  emit("navigate", inputValue.value);
}
</script>

<template>
  <div>This is the CD Direct component</div>

  <div>
    <input
      v-model="inputValue"
      @keyup.enter="submit"
      placeholder="Enter path..."
    />
    <button @click="submit">Submit</button>
  </div>
</template>
