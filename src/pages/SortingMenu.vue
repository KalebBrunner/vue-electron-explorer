<script setup lang="ts">
import { ref } from "vue";
import { File } from "../objects/file";
import { SortStrategy, SortAlphabetically, SortReverse } from "../objects/sort";

const props = defineProps({
  sortedFiles: {
    type: Array<File>,
    required: true,
  },
});

// Sorting state
const foldersFirst = ref(true);
const numericSort = ref(false);
const ascending = ref(true);

const applySorting = () => {
  //   // Change the strategy, computed will handle the rest
  //   props.currentSortSequence.value = new CompositeSorter(
  //     foldersFirst.value ? new FoldersFirstSorter() : new FilesFirstSorter(),
  //     numericSort.value ? new NumericSorter() : new AlphabeticalSorter(),
  //     ascending.value ? new NoReverse() : new SortReverse()
  //   );
};
</script>

<template>
  <h1>Sorting Menu</h1>
  <div>
    <label>
      <input type="checkbox" v-model="foldersFirst" @change="applySorting" />
      Folders first
    </label>
    <label>
      <input type="checkbox" v-model="numericSort" @change="applySorting" />
      Numeric sort
    </label>
    <label>
      <input type="checkbox" v-model="ascending" @change="applySorting" />
      Ascending
    </label>
  </div>
</template>
