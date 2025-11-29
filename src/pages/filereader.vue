<template>
  <div>
    <h2>File Browser</h2>

    <div style="margin-bottom: 8px;">
      <strong>Current:</strong> {{ currentPath }}
    </div>

    <div style="display: flex; gap: 6px; margin-bottom: 12px;">
      <button @click="goBack" :disabled="!canGoBack || loading">
        ← Back
      </button>
      <button @click="goForward" :disabled="!canGoForward || loading">
        Forward →
      </button>
      <button @click="goUp" :disabled="!canGoUp || loading">
        ↑ Up
      </button>
      <button @click="reload" :disabled="loading">
        {{ loading ? "Loading..." : "Reload" }}
      </button>
    </div>

    <p v-if="error" style="color: red; margin-top: 8px;">
      {{ error }}
    </p>

    <ul v-if="entries.length" style="margin-top: 8px;">
      <li
        v-for="entry in entries"
        :key="entry.path"
        @click="entry.isDirectory && openDir(entry.path)"
        :style="{
          cursor: entry.isDirectory ? 'pointer' : 'default',
          padding: '2px 0'
        }"
      >
        {{ entry.isDirectory ? "📁" : "📄" }} {{ entry.name }}
      </li>
    </ul>

    <p v-else-if="!loading && !error" style="margin-top: 8px;">
      No entries found.
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const entries = ref([]);
const loading = ref(false);
const error = ref(null);

// 🔧 starting folder
const ROOT_PATH = "/home/kaleb/Downloads";
const currentPath = ref(ROOT_PATH);

// history for Back / Forward
const history = ref([ROOT_PATH]);
const historyIndex = ref(0);

const canGoBack = computed(() => historyIndex.value > 0);
const canGoForward = computed(
  () => historyIndex.value < history.value.length - 1
);
const canGoUp = computed(() => {
  const parts = currentPath.value.split("/").filter(Boolean);
  return parts.length > 1; // e.g. not "/" or "/home"
});

async function loadPath(path, { pushHistory = true } = {}) {
  loading.value = true;
  error.value = null;

  try {
    const api = window.electron;
    if (!api) {
      throw new Error(
        "window.electron is undefined — is preload configured and running in Electron?"
      );
    }

    const result = await api.readDir(path);
    entries.value = result;
    currentPath.value = path;

    if (pushHistory) {
      // If we navigate after going back, drop "forward" entries
      history.value = history.value.slice(0, historyIndex.value + 1);
      history.value.push(path);
      historyIndex.value = history.value.length - 1;
    }
  } catch (e) {
    console.error(e);
    error.value = e?.message || "Failed to read directory.";
    entries.value = [];
  } finally {
    loading.value = false;
  }
}

function reload() {
  loadPath(currentPath.value, { pushHistory: false });
}

function openDir(path) {
  loadPath(path, { pushHistory: true });
}

function goBack() {
  if (!canGoBack.value || loading.value) return;
  const newIndex = historyIndex.value - 1;
  historyIndex.value = newIndex;
  const path = history.value[newIndex];
  loadPath(path, { pushHistory: false });
}

function goForward() {
  if (!canGoForward.value || loading.value) return;
  const newIndex = historyIndex.value + 1;
  historyIndex.value = newIndex;
  const path = history.value[newIndex];
  loadPath(path, { pushHistory: false });
}

function goUp() {
  if (!canGoUp.value || loading.value) return;

  const parts = currentPath.value.split("/").filter(Boolean);
  parts.pop(); // remove last segment
  const parent = "/" + parts.join("/");
  loadPath(parent, { pushHistory: true });
}

onMounted(() => {
  loadPath(ROOT_PATH, { pushHistory: false });
});
</script>
