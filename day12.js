const fs = require("fs");

const input = fs.readFileSync("day12input.txt", "utf8");

let instructions = input.split("\n");

let eastWest = 0;
let northSouth = 0;

let facing = "E";

const compassMove = (direction, amount) => {
  switch (direction) {
    case "N":
      northSouth += amount;
      break;
    case "S":
      northSouth -= amount;
      break;
    case "W":
      eastWest -= amount;
      break;
    case "E":
      eastWest += amount;
      break;
  }
};

const turnShip = (direction, amount) => {
  const degrees = { 90: 1, 180: 2, 270: 3, 360: 0 };
  let directions = ["N", "E", "S", "W"];
  let idx = directions.indexOf(facing);
  if (direction === "L") {
    idx -= degrees[amount];
    idx += 4;
    idx %= 4;
  }
  if (direction === "R") {
    idx += degrees[amount];
    idx %= 4;
  }
  facing = directions[idx];
};

instructions.forEach((instruction) => {
  instruction = instruction.split("");
  const direction = instruction.shift();
  instruction = Number(instruction.join(""));

  const turn = { L: true, R: true };
  const compass = { N: true, S: true, E: true, W: true };

  if (turn[direction]) {
    turnShip(direction, instruction);
  } else if (compass[direction]) {
    compassMove(direction, instruction);
  } else if (direction === "F") {
    compassMove(facing, instruction);
  }
});

console.log("part1", Math.abs(eastWest) + Math.abs(northSouth));

const pos = [0, 0];
let waypoint = [-1, 10];

instructions.forEach((instruction) => {
  instruction = instruction.split("");
  const direction = instruction.shift();
  let amount = Number(instruction.join(""));

  switch (direction) {
    case "F":
      pos[0] += waypoint[0] * amount;
      pos[1] += waypoint[1] * amount;
      break;
    case "N":
      waypoint[0] -= amount;
      break;
    case "S":
      waypoint[0] += amount;
      break;
    case "E":
      waypoint[1] += amount;
      break;
    case "W":
      waypoint[1] -= amount;
      break;
    case "L":
      switch (amount) {
        case 90:
          waypoint = [-waypoint[1], waypoint[0]];
          break;
        case 180:
          waypoint = [-waypoint[0], -waypoint[1]];
          break;
        case 270:
          waypoint = [waypoint[1], -waypoint[0]];
          break;
      }
      break;
    case "R":
      switch (amount) {
        case 90:
          waypoint = [waypoint[1], -waypoint[0]];
          break;
        case 180:
          waypoint = [-waypoint[0], -waypoint[1]];
          break;
        case 270:
          waypoint = [-waypoint[1], waypoint[0]];
          break;
      }
      break;
  }
});

console.log("part2", Math.abs(pos[0]) + Math.abs(pos[1]));
