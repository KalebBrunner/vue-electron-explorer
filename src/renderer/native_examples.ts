import { ipcMain } from "electron";

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
