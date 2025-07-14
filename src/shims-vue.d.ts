import { File } from "./renderer/file";

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: DefineComponent<[], [], any>;
  export default component;
}

export {};

declare global {
  interface Window {
    myAPI: {
      findPrime: (upperLimit: number) => Promise<number>;
    };
  }
}

export interface ElectronAPI {
  readFolder: (folderPath: string) => Promise<File[]>;
  getDownloadsPath: () => Promise<string>;
  ipcRenderer: {
    invoke<T = any>(channel: string, ...args: any[]): Promise<T>;
  };
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
