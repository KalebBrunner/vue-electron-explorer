<script setup lang="ts">
import { ref } from "vue";
import TableElement from "./TableElement.vue";

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
  updateDirectory(currentPath.value); // Start loading files from Downloads
};

const updateDirectory = async (folderPath: string) => {
  currentPath.value = folderPath;
  files.value = await (window as any).electron.readFolder(folderPath);
};

// Call to get the Downloads path when the app starts
getDownloadsPath();
</script>

<template>
  hello this is file explorer
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
        <template v-for="file of files">
          <TableElement
            :file
            @update-file-path="(filepath) => updateDirectory(filepath)"
          />
        </template>
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
