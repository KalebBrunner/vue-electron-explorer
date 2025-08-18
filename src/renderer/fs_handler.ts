import fs from "fs";
import { ipcMain } from "electron";
import { File } from "../objects/file";

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
