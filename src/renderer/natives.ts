import { ipcMain } from "electron";
import "./native_examples";
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

// const sayHello = require("bindings")("hello");
// // console.log(sayHello.value());

// const prisoner = require("bindings")("prisoner");
// // console.log(prisoner.poke(5));

const read_files = require("bindings")("fs");
console.log(read_files.run("path"));

ipcMain.handle("read-files", (_event, path: string) => {
  return read_files.run(path);
});
