import fs from "fs";
import { ipcMain } from "electron";
import { File } from "../objects/file";

ipcMain.handle("read-dir", async (_event, pathname) => {
  console.log(pathname);
  const dirrents = await fs.promises.readdir(pathname, {
    withFileTypes: true,
  });
  return dirrents.map((dirent) => {
    return convertToFile(dirent, pathname);
  });
});

/**
 * Takes in a generic entry object from fs.promises.readdir() and 
 * exports it as a File object.
 */
function convertToFile(dirent: any, parentPathname: string): File {
  const pathUtil = require("path");
  const fs = require("fs");

  // const ext = path.extname(filePath);      // ".txt"
  // const base = path.basename(filePath);    // "file.txt"
  // const dir  = path.dirname(filePath);     // "/home/user/project/data" (for example)

  try {
    const path = pathUtil.join(parentPathname, dirent.name);
    const stats = fs.statSync(path);

    return new File(
      dirent.name,
      path,
      dirent.isDirectory(),
      stats.size,
      stats.mtime.toISOString()
      
    );
  } catch (error) {
    return new File(
      dirent.name,
      pathUtil.join(parentPathname, dirent.name),
      dirent.isDirectory()
    );
  }
}