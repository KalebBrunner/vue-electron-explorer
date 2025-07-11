import { ipcMain } from "electron";

// Natives
// const findPrimes = require("bindings")("findprimes");

// const result = findPrimes(100);
// console.log("Largest prime under 100:", result);

// ipcMain.handle("find-prime", (_event, upperLimit: number) => {
//   return findPrimes(upperLimit);
// });

// ipcMain.handle("prisoner", (_event, dmg: number) => {
//   return prisoner.poke(dmg);
// });

// ipcMain.handle("read-files", (_event, path: string) => {
//   return read_files.run(path);
// });

// const sayHello = require("bindings")("hello");
// // console.log(sayHello.value());

// const prisoner = require("bindings")("prisoner");
// // console.log(prisoner.poke(5));

// const read_files = require("bindings")("read_files");
// console.log(read_files.run("path"));

const testString = require("bindings")("test_string_aa");
const testNumber = require("bindings")("test_number");

ipcMain.handle("test_string", (_event) => {
  return testString.getString();
});

ipcMain.handle("test_number", (_event) => {
  return testNumber.getNumber();
});

console.log(testString.getString()); // "Test complete"
console.log(testNumber.getNumber()); // 100

const addon = require("bindings")("addon_examples");
// console.log("Addon object:", addon);
// console.log("Available properties:", Object.keys(addon));
console.log(addon.getString()); // "Hello from C!"
console.log(addon.getNumber()); // 42
console.log(addon.addNumbers(5, 3)); // 8
console.log(addon.addNumbers(10, 20)); // 30
console.log(addon.addNumbers(-5, 15)); // 10

// const maints_name = require("bindings")("binding-target");

// ipcMain.handle("vueapp_name"),
//   (_event, arguments: types) => {
//     return maints_name(arguments);
//   };
