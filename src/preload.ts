// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { File } from "./renderer/file";

contextBridge.exposeInMainWorld("electron", {
  readFolder: (folderPath: string) =>
    ipcRenderer.invoke("read-folder", folderPath).then((files) => {
      return files.map((file: object) => File.fromObject(file));
    }),

  getDownloadsPath: () => ipcRenderer.invoke("get-downloads-path"),
});
