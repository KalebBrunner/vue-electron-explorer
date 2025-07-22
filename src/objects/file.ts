// import { Dirent } from "node:original-fs";
// import fs from "fs";
// import path from "path";

// export class File {
//   public constructor(
//     public name: string,
//     public path: string,
//     public isDirectory: boolean,
//     public size: number | null = null,
//     public modified: string | null = null
//   ) {}

//   public static fromDirent(dirent: Dirent): File {
//     try {
//       const fullPath = path.join(dirent.parentPath, dirent.name);
//       const stats = fs.statSync(fullPath);

//       return new File(
//         dirent.name,
//         dirent.parentPath,
//         dirent.isDirectory(),
//         stats.size,
//         stats.mtime.toISOString()
//       );
//     } catch (error) {
//       return new File(dirent.name, dirent.parentPath, dirent.isDirectory());
//     }
//   }
// }
export class File {
  public constructor(
    public name: string,
    public path: string,
    public isDirectory: boolean,
    public size?: number,
    public modified?: string
  ) {}

  public static fromDirent(dirent: any, parentPath: string): File {
    const fs = require("fs");
    const path = require("path");

    try {
      const fullPath = path.join(parentPath, dirent.name);
      const stats = fs.statSync(fullPath);

      return new File(
        dirent.name,
        fullPath,
        dirent.isDirectory(),
        stats.size,
        stats.mtime.toISOString()
      );
    } catch (error) {
      return new File(
        dirent.name,
        path.join(parentPath, dirent.name),
        dirent.isDirectory()
      );
    }
  }

  public static fromObject(obj: any): File {
    return new File(
      obj.name,
      obj.path,
      obj.isDirectory,
      obj.size,
      obj.modified
    );
  }
}
