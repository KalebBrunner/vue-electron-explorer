import { File } from "./file";

interface FileFilter {
  (file: File): boolean;
}

function isPNG implements FileFilter (file: File) {
  return ".png" == file.getExtension().toLowerCase();
}
