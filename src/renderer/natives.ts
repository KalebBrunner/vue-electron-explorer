import { ipcMain } from "electron";

// Natives
const findPrimes = require("bindings")("findprimes");

const result = findPrimes(100);
console.log("Largest prime under 100:", result);

ipcMain.handle("find-prime", (_event, upperLimit: number) => {
  return findPrimes(upperLimit);
});

ipcMain.handle("prisoner", (_event, upperLimit: number) => {
  return prisoner.poke(upperLimit);
});

const sayHello = require("bindings")("hello");
console.log(sayHello.value());

const prisoner = require("bindings")("prisoner");
console.log(prisoner.poke(5));
