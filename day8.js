const fs = require("fs");

const input = fs.readFileSync("day8input.txt", "utf8");

let instructions = input.split("\n").map((instruction, idx) => {
  const [operation, number] = instruction.split(" ");
  return {
    operation,
    number: Number(number),
    idx,
  };
});

let acc = 0;
let visited = {};
let i = 0;

while (!visited[i]) {
  visited[i] = true;
  const { operation, number } = instructions[i];
  if (operation === "nop") {
    i++;
    if (visited[i]) console.log("part1", acc);
  }
  if (operation === "acc") {
    acc += number;
    i++;
    if (visited[i]) console.log("part1", acc);
  }
  if (operation === "jmp") {
    i += number;
    if (visited[i]) console.log("part1", acc);
  }
}

//part2
const originalInstructions = [...instructions];

const possibleChanges = instructions
  .filter(({ operation }) => operation === "nop" || operation === "jmp")
  .map(({ idx }) => idx);
acc = 0;
visited = {};
i = 0;
while (i < instructions.length) {
  if (visited[i]) {
    visited = {};
    acc = 0;
    i = 0;
    instructions = [...originalInstructions];
    const idx = possibleChanges.shift();
    const oldInstruction = instructions[idx];
    if (oldInstruction.operation === "jmp") {
      instructions[idx] = { ...oldInstruction, operation: "nop" };
    } else if (oldInstruction.operation === "nop") {
      instructions[idx] = { ...oldInstruction, operation: "jmp" };
    }
  }
  visited[i] = true;
  const { operation, number } = instructions[i];
  if (operation === "nop") {
    i++;
  }
  if (operation === "acc") {
    acc += number;
    i++;
  }
  if (operation === "jmp") {
    i += number;
  }
}

console.log("part2", acc);
