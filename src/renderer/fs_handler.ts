import fs from "fs";
import { app, ipcMain } from "electron";
import path from "path";
import { File } from "./file";

// Handle file system request
ipcMain.handle("read-folder", async (_event, folderPath) => {
  console.log(folderPath);
  const entries = await fs.promises.readdir(folderPath, {
    withFileTypes: true,
  });

  return entries.map((entry) => {
    return File.fromDirent(entry);

    // const fullPath = path.join(folderPath, entry.name);
    // const stats = fs.statSync(fullPath);

    // return {
    //   name: entry.name,
    //   path: fullPath,
    //   isDirectory: entry.isDirectory(),
    //   size: stats.size,
    //   modified: stats.mtime.toISOString(),
    // };
  });
});

// Expose the Downloads path to renderer process
ipcMain.handle("get-downloads-path", () => app.getPath("downloads"));
