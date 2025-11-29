

/**
 * ```ts
 * name: string;
 * path: string;
 * isDirectory: boolean;
 * size?: number;
 * modified?: string;
 * ```
 */
export class File {
  // Definition
  public constructor(
    public name: string,
    public path: string,
    public isDirectory: boolean,
    public size?: number,
    public modified?: string
  ) {}
  /** as seen in preload.ts */
  public static createFromObject(obj: any): File {
    return new File(
      obj.name,
      obj.path,
      obj.isDirectory,
      obj.size,
      obj.modified
    );
  }


  public getName(): string {
    return this.name;
  }

  public getExtension(): string {
    return this.name.substring(this.name.lastIndexOf("."), this.name.length);
  }

  
}
