export abstract class SortStrategy<T> {
  reverse: boolean = false;

  abstract sortInner(files: Array<T>): Array<T>;

  sort(files: Array<T>): Array<T> {
    let data = this.sortInner(files);

    if (this.reverse) {
      data.reverse();
    }

    return data;
  }
}

export interface HasName {
  getName(): string;
}

export class SortAlphabetically<T extends HasName> extends SortStrategy<T> {
  sortInner(data: T[]): T[] {
    return [...data].sort();
  }
}

export class SortReverse<T extends HasName> extends SortStrategy<T> {
  sortInner(data: T[]): T[] {
    return [...data].reverse();
  }
}
