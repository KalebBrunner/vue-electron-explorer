// pseudo code for recursive hierarchy function
import { File } from "./file";

export class extension {
  public constructor(public type: string) {}
}

export class extensionsGroup {
  public constructor(public elements: (extension | extensionsGroup)[]) {}
}

// export function recursive(files: File[], group: extensionsGroup): File[] {
//   // Initialize partial file list to return
//   let filteredFileList: File[] = [];

//   for (const item of group.elements) {
//     if (item instanceof extension) {
//       for (let i = files.length - 1; i >= 0; i--) {
//         const file = files[i];

//         if (file.getExtension() == item.type) {
//           filteredFileList.push(file);
//           files.splice(i, 1);
//         }
//       }
//     } else if (item instanceof extensionsGroup) {
//       const subList = recursive(files, item);
//       filteredFileList = filteredFileList.concat(subList);
//     } else {
//       throw new Error("Invalid element in extension hierarchy list");
//     }
//   }
//   return filteredFileList;
// }

export function recursive(files: File[], group: extensionsGroup): File[] {
  console.log(
    `🔍 Starting recursive call with ${files.length} files and group:`,
    group
  );

  // Initialize partial file list to return
  let filteredFileList: File[] = [];

  console.log(`📋 Processing ${group.elements.length} elements in group`);

  for (const item of group.elements) {
    console.log(`🔄 Processing element:`, item);

    if (item instanceof extension) {
      console.log(`📄 Found extension item with type: ${item.type}`);
      console.log(
        `📁 Searching through ${files.length} files for extension: ${item.type}`
      );

      let matchCount = 0;
      for (let i = files.length - 1; i >= 0; i--) {
        const file = files[i];
        console.log(
          `  🔎 Checking file ${i}: extension = "${file.getExtension()}" vs target = "${
            item.type
          }"`
        );

        if (file.getExtension() == item.type) {
          console.log(
            `  ✅ MATCH! Adding file to filtered list and removing from source`
          );
          filteredFileList.push(file);
          files.splice(i, 1);
          matchCount++;
        }
      }
      console.log(`📊 Found ${matchCount} files with extension "${item.type}"`);
    } else if (item instanceof extensionsGroup) {
      console.log(`📂 Found nested extensionsGroup, making recursive call...`);
      console.log(`   Files before recursive call: ${files.length}`);

      const subList = recursive(files, item);

      console.log(`   Recursive call returned ${subList.length} files`);
      console.log(`   Files remaining after recursive call: ${files.length}`);

      filteredFileList = filteredFileList.concat(subList);
      console.log(
        `   Combined filtered list now has: ${filteredFileList.length} files`
      );
    } else {
      console.error(`❌ Invalid element in extension hierarchy list:`, item);
      throw new Error("Invalid element in extension hierarchy list");
    }
  }

  console.log(
    `✨ Recursive call complete. Returning ${filteredFileList.length} files`
  );
  console.log(`📤 Remaining files in source array: ${files.length}`);

  return filteredFileList;
}

// function myFunc(files, extensionGroup): files {
//   foreach (item in extensionGroup) {
//     partialFileList = empty

//     if(item is extensios){
//       foreach (file in files){
//         partialFileList += file // add file to sub list
//         files -= file // remove file from main list to not assign it twice
//       }
//     } elseif(item is extensionGroup){
//       partialFileList += myFunc(files, hierarchyElement)
//     } else {
//       "error, invalid element in extension hierarchy list"
//     }
//   }
//   return partialFileList
// }
