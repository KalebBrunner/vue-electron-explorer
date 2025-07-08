<script setup lang="ts">
const emit = defineEmits(["update-file-path"]);

const props = defineProps({
  file: {
    type: Object,
    required: true,
  },
});

const formatSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};
</script>

<template>
  <tr>
    <td width="1000px">
      <span @dblclick="emit('update-file-path', file.path)">
        <span v-if="file.isDirectory">📁</span>
        <span v-else>📄</span>
        {{ file.name }}
      </span>
    </td>
    <td>{{ file.isDirectory ? "-" : formatSize(file.size) }}</td>
    <td>{{ file.modified }}</td>
  </tr>
</template>
