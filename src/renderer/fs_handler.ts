import fs from "fs";
import { app, ipcMain } from "electron";
import { File } from "../objects/file";

// Expose the default path to renderer process
ipcMain.handle("get-default-path", () => app.getPath("documents"));

ipcMain.handle("read-folder", async (_event, folderPath) => {
  console.log(folderPath);
  const entries = await fs.promises.readdir(folderPath, {
    withFileTypes: true,
  });
  return entries.map((entry) => {
    return convertToFile(entry, folderPath);
  });
});

function convertToFile(dirent: any, parentPath: string): File {
  const fs = require("fs");
  const path = require("path");

  try {
    const fullPath = path.join(parentPath, dirent.name);
    const stats = fs.statSync(fullPath);

    return new File(
      dirent.name,
      fullPath,
      dirent.isDirectory(),
      stats.size,
      stats.mtime.toISOString()
    );
  } catch (error) {
    return new File(
      dirent.name,
      path.join(parentPath, dirent.name),
      dirent.isDirectory()
    );
  }
}
