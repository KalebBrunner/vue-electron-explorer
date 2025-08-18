import fs from "fs";
import { app, ipcMain } from "electron";
import { File } from "../objects/file";

// Expose the Downloads path to renderer process
ipcMain.handle("get-downloads-path", () => app.getPath("downloads"));

ipcMain.handle("read-folder", async (_event, folderPath) => {
  // console.log(folderPath);
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

// // Handle file system request
// ipcMain.handle("read-folder", async (_event, folderPath) => {
//   console.log(folderPath);
//   const entries = await fs.promises.readdir(folderPath, {
//     withFileTypes: true,
//   });

//   return entries.map((entry) => {
//     return File.fromDirent(entry);

//     // const fullPath = path.join(folderPath, entry.name);
//     // const stats = fs.statSync(fullPath);

//     // return {
//     //   name: entry.name,
//     //   path: fullPath,
//     //   isDirectory: entry.isDirectory(),
//     //   size: stats.size,
//     //   modified: stats.mtime.toISOString(),
//     // };
//   });
// });
