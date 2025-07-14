import { Dirent } from "node:original-fs";
import fs from "fs";
import path from "path";

export class File {
  public constructor(
    public name: string,
    public path: string,
    public isDirectory: boolean,
    public size: number | null = null,
    public modified: string | null = null
  ) {}

  public static fromDirent(dirent: Dirent): File {
    try {
      const fullPath = path.join(dirent.parentPath, dirent.name);
      const stats = fs.statSync(fullPath);

      return new File(
        dirent.name,
        dirent.parentPath,
        dirent.isDirectory(),
        stats.size,
        stats.mtime.toISOString()
      );
    } catch (error) {
      return new File(dirent.name, dirent.parentPath, dirent.isDirectory());
    }
  }
}
