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

let currentPath = ref("");

// Use the API to get the Downloads path
const getDownloadsPath = async () => {
  currentPath.value = await window.electron.getDownloadsPath();
  void updateDirectory(currentPath.value); // Start loading files from Downloads
};

const updateDirectory = async (folderPath: string) => {
  currentPath.value = folderPath;
  files.value = await window.electron.readFolder(folderPath);
};

// Call to get the Downloads path when the app starts
void getDownloadsPath();

// const myPath = ref(currentPath.value);

const goBack = (filepath: string) => {
  let directoryElements = filepath.split("\\");
  void directoryElements.pop();
  currentPath.value = directoryElements.join("\\");
  // currentPath.value = "C:\\";

  void updateDirectory(currentPath.value);
};
</script>

<template>
  hello this is file explorer
  <div>
    <h1>File Explorer</h1>
    <button @click="goBack(currentPath)">back</button>
    <!-- <p>Return: {{ currentPath }}</p> -->
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
  /* width: 40%; */
  border-collapse: collapse;
}

th,
td {
  /* border-collapse: collapse; */
  /* width: 4000px; */

  text-overflow: ellipsis;
  overflow: hidden;

  white-space: nowrap;
  line-height: 1;
  font-size: small;
  padding: 3px;
  border: 0px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>
