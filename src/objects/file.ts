import { HasName } from "./sort";

export class File implements HasName {
  public constructor(
    public name: string,
    public path: string,
    public isDirectory: boolean,
    public size?: number,
    public modified?: string
  ) {}

  public getName(): string {
    return this.name;
  }

  public getExtension(): string {
    return this.name.substring(this.name.lastIndexOf("."), this.name.length);
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
