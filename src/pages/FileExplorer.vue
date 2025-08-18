<script setup lang="ts">
import { ref, computed } from "vue";
import { File } from "../objects/file";
import { SortReverse, SortStrategy } from "../objects/sort";

import TableElement from "./TableElement.vue";
import SortingMenu from "./SortingMenu.vue";

const files = ref<File[]>([]);
const currentSortSequence = ref<SortStrategy<File>>(new SortReverse());

const sortedFiles = computed(() => {
  return currentSortSequence.value.sort(files.value);
});

let currentPath = ref("");

const changeDirectory = async (path: string) => {
  currentPath.value = path;
  const crudeFiles = await window.electron.readFolder(path);
  files.value = crudeFiles.map((crudeFile: any) => File.fromObject(crudeFile));
};

const getDirectory = async (path: string) => {
  void (await changeDirectory(path));
};

const stepOut = (filepath: string) => {
  let directoryElements = filepath.split("\\");
  void directoryElements.pop();
  let parentPath = directoryElements.join("\\");

  // Add trailing backslash for root drives
  if (parentPath.match(/^[A-Z]:$/)) {
    parentPath += "\\";
  }

  currentPath.value = parentPath;
  void getDirectory(currentPath.value);
};

const setDefaultPath = async () => {
  // Use the API to get the default path
  currentPath.value = await window.electron.getDefaultPath();
  void getDirectory(currentPath.value);
};

void setDefaultPath();
</script>

<template>
  <!-- hello this is file explorer -->
  <SortingMenu />
  <div>
    <h1>File Explorer</h1>
    <button @click="stepOut(currentPath)">back</button>
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
        <template v-for="file of sortedFiles">
          <TableElement
            :file
            @stepIn="(filepath) => void getDirectory(filepath)"
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
