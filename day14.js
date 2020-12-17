const fs = require("fs");

const input = fs.readFileSync("./day14input.txt", "utf8").split("\n");

let mem = {};

let currMask;

const addZeroes = (str) => {
  while (str.length < currMask.length) str = "0" + str;
  return str;
};

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

input.forEach((line) => {
  line = line.split(" = ");
  if (line[0] === "mask") currMask = line[1].split("");
  else {
    let [address, val] = line;
    address = address.slice(4, address.length - 1);
    val = addZeroes(dec2bin(Number(val)));
    val = val
      .split("")
      .map((bin, i) => {
        if (currMask[i] !== "X") return currMask[i];
        return bin;
      })
      .join("");
    mem[address] = { binary: val, decimal: parseInt(val, 2) };
  }
});
let sum = 0;
Object.keys(mem).forEach((key) => {
  const { decimal } = mem[key];
  if (decimal !== 0) {
    sum += decimal;
  } else {
  }
});
console.log("part1", sum);

mem = {};

let alts = [];
for (let line of input) {
  let [address, val] = line.split(" = ");

  if (address == "mask") {
    currMask = val;
    alts = [0];
    for (let j = 0; j < 36; j++) {
      if (currMask[j] == "X") {
        let alts2 = [];
        for (let k of alts) {
          alts2.push(2 ** (35 - j) + k);
        }
        alts = alts.concat(alts2);
      }
    }
  } else {
    address = Number(address.slice(4, address.length - 1)).toString(2);
    val = Number(val);
    address = addZeroes(address).split("");
    for (let j = 0; j < 36; j++) {
      switch (currMask[j]) {
        case "1": {
          address[j] = 1;
          break;
        }
        case "X": {
          address[j] = 0;
          break;
        }
      }
    }
    address = parseInt(address.join(""), 2);
    for (let k of alts) {
      mem[address + k] = val;
    }
  }
}
sum = 0;

for (let i in mem) {
  sum += mem[i];
}
console.log("part2", sum);
