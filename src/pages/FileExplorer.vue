<script setup lang="ts">
// vue objects
import { ref, computed } from "vue";
// project objects
import { File } from "../objects/file";
import { SortStrategy, SortAlphabetically, SortReverse } from "../objects/sort";
// view components
import TableElement from "./TableElement.vue";
import SortingMenu from "./SortingMenu.vue";
import CDDirect from "./CDDirect.vue";

const files = ref<File[]>([]);
let currentPath = ref("");

const changeDirectory = async (path: string) => {
  currentPath.value = path;
  const crudeFiles = await window.electron.readFolder(path);
  files.value = crudeFiles.map((crudeFile: any) => File.fromObject(crudeFile));
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
  void changeDirectory(currentPath.value);
};

const setDefaultPath = () => {
  // Use the API to get the default path
  currentPath.value = "C:\\Users\\Kaleb\\Downloads";
  void changeDirectory(currentPath.value);
};

void setDefaultPath();
</script>

<template>
  <!-- hello this is file explorer -->
  <SortingMenu v-model="files" />
  <div>
    <h1>File Explorer</h1>
    <button @click="stepOut(currentPath)">back</button>
    <button
      @click="
        changeDirectory(
          'C:\\Documents2\\Coding\\MyElectronProject\\src\\TestFiles'
        )
      "
    >
      To TestFiles
    </button>
    <CDDirect v-model="currentPath" @navigate="changeDirectory(currentPath)" />

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
            @stepIn="(filepath) => void changeDirectory(filepath)"
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
