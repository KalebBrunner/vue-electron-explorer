// pseudo code for recursive hierarchy function
import { File } from "./file";

export class Filter {
  constructor() {}

  static group(
    strategy: (file: File) => boolean,
    ...elements: (Filter | FilterHierarchy | string)[]
  ): FilterHierarchy {
    return new FilterHierarchy(
      strategy,
      elements.map((e) => (typeof e === "string" ? new Filter(e) : e))
    );
  }
}

class FilterHierarchy {
  constructor(
    // // undefined function which checks if a files is in the category
    // public filterStrategy: (file: File) => boolean,
    public elements: (Filter | FilterHierarchy)[]
  ) {}
}

export function filterByRecursion(
  files: File[],
  group: FilterHierarchy
): File[] {
  let filteredFileList: File[] = [];

  for (const item of group.elements) {
    if (item instanceof Filter) {
      for (let i = files.length - 1; i >= 0; i--) {
        const file = files[i];

        if (group.filterStrategy(file)) {
          filteredFileList.push(file);
          files.splice(i, 1);
        }
      }
    } else if (item instanceof FilterHierarchy) {
      const subList = filterByRecursion(files, item);
      filteredFileList = filteredFileList.concat(subList);
    } else {
      throw new Error("Invalid element in Filter hierarchy list");
    }
  }
  return filteredFileList;
}

// export function sortByGroup(files: File[], group: FilterHierarchy): File[] {
//   console.log(
//     `🔍 Starting recursive call with ${files.length} files and group:`,
//     group
//   );

//   // Initialize partial file list to return
//   let filteredFileList: File[] = [];

//   console.log(`📋 Processing ${group.elements.length} elements in group`);

//   for (const item of group.elements) {
//     console.log(`🔄 Processing element:`, item);

//     if (item instanceof Filter) {
//       console.log(`📄 Found Filter item with type: ${item.type}`);
//       console.log(
//         `📁 Searching through ${files.length} files for Filter: ${item.type}`
//       );

//       let matchCount = 0;
//       for (let i = files.length - 1; i >= 0; i--) {
//         const file = files[i];
//         console.log(
//           `  🔎 Checking file ${i}: Filter = "${file.getExtension()}" vs target = "${
//             item.type
//           }"`
//         );

//         if (file.getExtension() == item.type) {
//           console.log(
//             `  ✅ MATCH! Adding file to filtered list and removing from source`
//           );
//           filteredFileList.push(file);
//           files.splice(i, 1);
//           matchCount++;
//         }
//       }
//       console.log(`📊 Found ${matchCount} files with Filter "${item.type}"`);
//     } else if (item instanceof FilterHierarchy) {
//       console.log(`📂 Found nested FilterHierarchy, making recursive call...`);
//       console.log(`   Files before recursive call: ${files.length}`);

//       const subList = sortByGroup(files, item);

//       console.log(`   Recursive call returned ${subList.length} files`);
//       console.log(`   Files remaining after recursive call: ${files.length}`);

//       filteredFileList = filteredFileList.concat(subList);
//       console.log(
//         `   Combined filtered list now has: ${filteredFileList.length} files`
//       );
//     } else {
//       console.error(`❌ Invalid element in Filter hierarchy list:`, item);
//       throw new Error("Invalid element in Filter hierarchy list");
//     }
//   }

//   console.log(
//     `✨ Recursive call complete. Returning ${filteredFileList.length} files`
//   );
//   console.log(`📤 Remaining files in source array: ${files.length}`);

//   return filteredFileList;
// }

// function myFunc(files, FilterHierarchy): files {
//   foreach (item in FilterHierarchy) {
//     partialFileList = empty

//     if(item is extensios){
//       foreach (file in files){
//         partialFileList += file // add file to sub list
//         files -= file // remove file from main list to not assign it twice
//       }
//     } elseif(item is FilterHierarchy){
//       partialFileList += myFunc(files, hierarchyElement)
//     } else {
//       "error, invalid element in Filter hierarchy list"
//     }
//   }
//   return partialFileList
// }
