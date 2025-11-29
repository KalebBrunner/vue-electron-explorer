// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";
import { File } from "./objects/file";

contextBridge.exposeInMainWorld("electron", {

  readDir: (pathname: string) =>
    ipcRenderer.invoke("read-dir", pathname).then((files) => {
      return files.map((file: object) => File.createFromObject(file));
    }),
});