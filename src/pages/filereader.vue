<template>
  <div class="file-table">
    <div class="file-table__header">
      <div class="file-table__cell file-table__cell--name">Name</div>
      <div class="file-table__cell file-table__cell--size">Size</div>
      <div class="file-table__cell file-table__cell--type">Type</div>
      <div class="file-table__cell file-table__cell--date">Date Modified</div>
    </div>

    <div
      v-for="file in files"
      :key="file.path"
      class="file-table__row"
    >
      <div class="file-table__cell file-table__cell--name">
        <span class="file-table__icon">
          {{ file.isDirectory ? "📁" : "📄" }}
        </span>
        <span class="file-table__name-text">
          {{ file.name }}
        </span>
      </div>

      <div class="file-table__cell file-table__cell--size">
        {{ formatSize(file.size, file.isDirectory) }}
      </div>

      <div class="file-table__cell file-table__cell--type">
        {{ file.isDirectory ? "Folder" : file.type || "File" }}
      </div>

      <div class="file-table__cell file-table__cell--date">
        {{ formatDate(file.modified) }}
      </div>
    </div>

    <div
      v-if="!files.length"
      class="file-table__empty"
    >
      No files.
    </ div>
  </div>
</template>

<script setup lang="ts">
interface FileItem {
  name: string;
  path: string;
  isDirectory: boolean;
  size?: number;      // in bytes
  modified?: string;  // ISO string
  type?: string;      // e.g. "Document", "Archive" (optional)
}

const props = defineProps<{
  files: FileItem[];
}>();

function formatSize(size?: number, isDirectory?: boolean): string {
  if (isDirectory || size == null) return "";
  if (size === 0) return "0 B";

  const units = ["B", "kB", "MB", "GB", "TB"];
  let i = 0;
  let s = size;

  while (s >= 1024 && i < units.length - 1) {
    s /= 1024;
    i++;
  }

  return `${s.toFixed(1)} ${units[i]}`;
}

function formatDate(modified?: string): string {
  if (!modified) return "";
  const d = new Date(modified);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleString(); // you can tweak locale/opts later if you want
}
</script>

<style scoped>
.file-table {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: 13px;
  border: 1px solid #dadada;
  border-radius: 4px;
  overflow: hidden;
}

/* Header and rows share the same grid layout */
.file-table__header,
.file-table__row {
  display: grid;
  grid-template-columns: 3fr 1fr 1.4fr 2fr;
  align-items: center;
}

/* Header */
.file-table__header {
  background: #f3f3f3;
  border-bottom: 1px solid #dadada;
  font-weight: 600;
  padding: 4px 8px;
}

.file-table__cell {
  padding: 2px 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-table__cell--name {
  display: flex;
  align-items: center;
  gap: 6px;
}

.file-table__icon {
  width: 16px;
  text-align: center;
  flex-shrink: 0;
}

.file-table__name-text {
  min-width: 0;
}

/* Rows */
.file-table__row:nth-child(odd) {
  background: #ffffff;
}

.file-table__row:nth-child(even) {
  background: #f9f9f9;
}

.file-table__row {
  border-bottom: 1px solid #eeeeee;
}

.file-table__row:last-of-type {
  border-bottom: none;
}

.file-table__row:hover {
  background: #e5f1ff;
}

/* Empty state */
.file-table__empty {
  padding: 8px;
  color: #666;
  font-style: italic;
}
</style>
