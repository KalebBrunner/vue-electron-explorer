// assuming you have a type File somewhere TS can see
import type { File } from "@/objects/file";

export {};

declare global {
  interface Window {
    electron: {
      readDir(pathname: string): Promise<File[]>;
    };
  }
}
