import { File } from "./objects/file";

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: DefineComponent<[], [], any>;
  export default component;
}

export {};

export interface ElectronAPI {
  readFolder: (folderPath: string) => Promise<File[]>;
  ipcRenderer: {
    invoke<T = any>(channel: string, ...args: any[]): Promise<T>;
  };
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
