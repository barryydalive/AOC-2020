const fs = require("fs");

const input = fs.readFileSync("day10input.txt", "utf8");

const adapters = input
  .split("\n")
  .map(Number)
  .sort((a, b) => a - b);

const device = adapters[adapters.length - 1] + 3;

adapters.push(device);

const oneJolt = [];
const twoJolt = [];
const threeJolt = [];

let currJolt = 0;
adapters.forEach((adapter) => {
  if (currJolt + 1 === adapter) {
    currJolt++;
    oneJolt.push(adapter);
  }
  if (currJolt + 2 === adapter) {
    currJolt += 2;
    twoJolt.push(adapter);
  }
  if (currJolt + 3 === adapter) {
    currJolt += 3;
    threeJolt.push(adapter);
  }
});
console.log("part1", threeJolt.length * oneJolt.length);

adapters.unshift(0);
const possibleGuys = {};

possibleGuys[adapters[adapters.length - 1]] = 1;

for (let i = adapters.length - 2; i >= 0; i--) {
  possibleGuys[adapters[i]] = 0;
  for (let j = i + 1; j < adapters.length; j++) {
    if (adapters[j] - adapters[i] <= 3) {
      possibleGuys[adapters[i]] += possibleGuys[adapters[j]];
    }
  }
}

console.log("part2", possibleGuys[adapters[0]]);
