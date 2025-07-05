import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import fs from "fs";
import started from "electron-squirrel-startup";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  mainWindow.webContents.openDevTools();
};

// Handle file system request
ipcMain.handle("read-folder", async (_event, folderPath) => {
  const entries = await fs.promises.readdir(folderPath, {
    withFileTypes: true,
  });

  return entries.map((entry) => {
    const fullPath = path.join(folderPath, entry.name);
    const stats = fs.statSync(fullPath);

    return {
      name: entry.name,
      path: fullPath,
      isDirectory: entry.isDirectory(),
      size: stats.size,
      modified: stats.mtime.toISOString(),
    };
  });
});

// Expose the Downloads path to renderer process
ipcMain.handle("get-downloads-path", () => app.getPath("downloads"));

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
