// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { File } from "./objects/file";

contextBridge.exposeInMainWorld("electron", {
  // readFolder: (folderPath: string) =>
  // ipcRenderer.invoke("read-folder", folderPath),

  readFolder: (folderPath: string) =>
    ipcRenderer.invoke("read-folder", folderPath).then((files) => {
      return files.map((file: object) => File.fromObject(file));
    }),

  getDefaultPath: () => ipcRenderer.invoke("get-default-path"),
});
