const fs = require("fs");

const input = fs.readFileSync("./day3input.txt", "utf8").split("\n");

const traverseThingForAOCGuy = (right, down) => {
  let trees = 0;

  let row = 0;
  let column = 0;
  while (row < input.length) {
    if (input[row][column] === "#") trees++;
    column = (column + right) % input[0].length;
    row += down;
  }

  console.log(trees);
  return trees;
};

console.log(
    traverseThingForAOCGuy(1, 1) *
    traverseThingForAOCGuy(3, 1) *
    traverseThingForAOCGuy(5, 1) *
    traverseThingForAOCGuy(7, 1) *
    traverseThingForAOCGuy(1, 2)
);
