// pseudo code for recursive hierarchy function
import { File } from "./file";

class Category {
  constructor(public identifier: string) {}

  // static group(
  //   matchingStrategy: (categoryId: string,file: File) => boolean,
  //   ...elements: (Category | CategoryGroup | string)[]
  // ): CategoryGroup {
  //   return new CategoryGroup(
  //     matchingStrategy,
  //     elements.map((e) => (typeof e === "string" ? new Category(e) : e))
  //   );
  // }
}

class CategoryGroup {
  constructor(
    // undefined function which checks if a files is in the category
    public matchingStrategy: (category: Category, file: File) => boolean,
    public elements: (Category | CategoryGroup)[]
  ) {}
}

// export function group(...elements: (Category | CategoryGroup | string)[]): CategoryGroup {
//   return new CategoryGroup(
//     elements.map((e) =>
//       typeof e === "string"
//         ? new Category((file) => file.getExtension() === e) // convert string to extension matcher
//         : e
//     )
//   );
// }

export function sortByCategory(files: File[], group: CategoryGroup): File[] {
  let filteredFileList: File[] = [];

  for (const item of group.elements) {
    if (item instanceof Category) {
      for (let i = files.length - 1; i >= 0; i--) {
        const file = files[i];

        if (group.matchingStrategy(item.identifier, file)) {
          filteredFileList.push(file);
          files.splice(i, 1);
        }
      }
    } else if (item instanceof CategoryGroup) {
      const subList = sortByCategory(files, item);
      filteredFileList = filteredFileList.concat(subList);
    } else {
      throw new Error("Invalid element in Category hierarchy list");
    }
  }
  return filteredFileList;
}

// export function sortByGroup(files: File[], group: CategoryGroup): File[] {
//   console.log(
//     `🔍 Starting recursive call with ${files.length} files and group:`,
//     group
//   );

//   // Initialize partial file list to return
//   let filteredFileList: File[] = [];

//   console.log(`📋 Processing ${group.elements.length} elements in group`);

//   for (const item of group.elements) {
//     console.log(`🔄 Processing element:`, item);

//     if (item instanceof Category) {
//       console.log(`📄 Found Category item with type: ${item.type}`);
//       console.log(
//         `📁 Searching through ${files.length} files for Category: ${item.type}`
//       );

//       let matchCount = 0;
//       for (let i = files.length - 1; i >= 0; i--) {
//         const file = files[i];
//         console.log(
//           `  🔎 Checking file ${i}: Category = "${file.getExtension()}" vs target = "${
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
//       console.log(`📊 Found ${matchCount} files with Category "${item.type}"`);
//     } else if (item instanceof CategoryGroup) {
//       console.log(`📂 Found nested CategoryGroup, making recursive call...`);
//       console.log(`   Files before recursive call: ${files.length}`);

//       const subList = sortByGroup(files, item);

//       console.log(`   Recursive call returned ${subList.length} files`);
//       console.log(`   Files remaining after recursive call: ${files.length}`);

//       filteredFileList = filteredFileList.concat(subList);
//       console.log(
//         `   Combined filtered list now has: ${filteredFileList.length} files`
//       );
//     } else {
//       console.error(`❌ Invalid element in Category hierarchy list:`, item);
//       throw new Error("Invalid element in Category hierarchy list");
//     }
//   }

//   console.log(
//     `✨ Recursive call complete. Returning ${filteredFileList.length} files`
//   );
//   console.log(`📤 Remaining files in source array: ${files.length}`);

//   return filteredFileList;
// }

// function myFunc(files, CategoryGroup): files {
//   foreach (item in CategoryGroup) {
//     partialFileList = empty

//     if(item is extensios){
//       foreach (file in files){
//         partialFileList += file // add file to sub list
//         files -= file // remove file from main list to not assign it twice
//       }
//     } elseif(item is CategoryGroup){
//       partialFileList += myFunc(files, hierarchyElement)
//     } else {
//       "error, invalid element in Category hierarchy list"
//     }
//   }
//   return partialFileList
// }
