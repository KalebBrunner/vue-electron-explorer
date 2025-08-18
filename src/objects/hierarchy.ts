// pseudo code for recursive hierarchy function

// function myFunc(files, extensionHierarchy): files {
//   foreach (item in extensionHierarchy) {
//     partialFileList = empty

//     if(item is extensios){
//       foreach (file in files){
//         partialFileList += file // add file to sub list
//         files -= file // remove file from main list to not assign it twice
//       }
//     } elseif(item is extensionHierarchy){
//       partialFileList += myFunc(files, hierarchyElement)
//     } else {
//       "error, invalid element in extension hierarchy list"
//     }
//   }
//   return partialFileList
// }
