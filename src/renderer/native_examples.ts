import { ipcMain } from "electron";

const testString = require("bindings")("test_string_aa");
console.log(testString.getString()); // "Test complete"
ipcMain.handle("test_string", (_event) => {
  return testString.getString();
});

const testNumber = require("bindings")("test_number");
console.log(testNumber.getNumber()); // 100
ipcMain.handle("test_number", (_event) => {
  return testNumber.getNumber();
});

const addon = require("bindings")("addon_examples");
// console.log("Addon object:", addon);
// console.log("Available properties:", Object.keys(addon));
console.log(addon.getString()); // "Hello from C!"
console.log(addon.getNumber()); // 42
console.log(addon.addNumbers(5, 3)); // 8
console.log(addon.addNumbers(10, 20)); // 30
console.log(addon.addNumbers(-5, 15)); // 10

ipcMain.handle("addon-getString", () => {
  return addon.getString();
});

ipcMain.handle("addon-getNumber", () => {
  return addon.getNumber();
});

ipcMain.handle("addon-addNumbers", (event, a, b) => {
  // console.log("IPC received a:", a, "type:", typeof a);
  // console.log("IPC received b:", b, "type:", typeof b);
  return addon.addNumbers(a, b);
});
