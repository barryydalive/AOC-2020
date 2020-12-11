const fs = require("fs");
fs.readFile("./day2input.txt", "utf8", (err, data) => {
  data = data.split("\n");
  data.pop();
  data = data.map((password) => {
    const parts = password.split(" ");
    const minMax = parts[0].split("-");
    const letter = parts[1][0];
    const code = parts[2];
    return {
      min: minMax[0],
      max: minMax[1],
      letter,
      code,
    };
  });
  let count = 0;
  data.forEach(({ min, max, letter, code }) => {
    let letterCount = 0;
    for (let i = 0; i < code.length; i++) {
      const curr = code[i];
      if (curr === letter) {
        letterCount++;
      }
    }
    if (letterCount >= min && letterCount <= max) count++;
  });
  console.log("part1", count);

  count = 0;
  data.forEach(({ min, max, letter, code }) => {
    if (code[Number(min) - 1] === letter && code[Number(max) - 1] !== letter)
      count++;
    if (code[Number(min) - 1] !== letter && code[Number(max) - 1] === letter)
      count++;
  });
  console.log("part2", count);
});
