<script setup lang="ts">
import { ref } from "vue";

const files = ref<
  {
    name: string;
    path: string;
    isDirectory: boolean;
    size: number;
    modified: string;
  }[]
>([]);
const currentPath = ref("");

// Use the API to get the Downloads path
const getDownloadsPath = async () => {
  currentPath.value = await (window as any).electron.getDownloadsPath();
  readFiles(currentPath.value); // Start loading files from Downloads
};

const readFiles = async (folderPath: string) => {
  files.value = await (window as any).electron.readFolder(folderPath);
};

const formatSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

// Call to get the Downloads path when the app starts
getDownloadsPath();
</script>

<template>
  <div>
    <h1>File Explorer</h1>
    <p>Current Folder: {{ currentPath }}</p>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Size</th>
          <th>Last Modified</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="file in files"
          :key="file.path"
          @click="file.isDirectory && readFiles(file.path)"
          style="cursor: pointer"
        >
          <td>
            <span v-if="file.isDirectory">📁</span>
            <span v-else>📄</span>
            {{ file.name }}
          </td>
          <td>{{ file.isDirectory ? "-" : formatSize(file.size) }}</td>
          <td>{{ file.modified }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>
