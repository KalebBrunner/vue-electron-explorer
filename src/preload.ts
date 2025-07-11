// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  // readFolder: (folderPath: string) =>
  //   ipcRenderer.invoke("read-folder", folderPath),

  // getDownloadsPath: () => ipcRenderer.invoke("get-downloads-path"),

  ipcRenderer: {
    newInvoke: (channel: string, ...args: any[]) =>
      ipcRenderer.invoke(channel, ...args),
  },
});
