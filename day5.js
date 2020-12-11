const fs = require("fs");

const input = fs.readFileSync("day5input.txt", "utf8").split("\n");

let highestId = 0;
let ids = [];
input.forEach((seat) => {
  const rowInput = seat.slice(0, 7);
  const seatInput = seat.slice(7);
  let rowMax = 127;
  let rowMin = 0;

  let seatMax = 7;
  let seatMin = 0;

  for (let i = 0; i < rowInput.length - 1; i++) {
    if (rowInput[i] === "F") {
      rowMax = Math.floor((rowMax + rowMin) / 2);
    }
    if (rowInput[i] === "B") {
      rowMin = Math.ceil((rowMax + rowMin) / 2);
    }
  }
  const rowNum = rowInput.slice(rowInput.length - 1) === "F" ? rowMin : rowMax;

  for (let i = 0; i < seatInput.length - 1; i++) {
    if (seatInput[i] === "L") {
      seatMax = Math.floor((seatMax + seatMin) / 2);
    }
    if (seatInput[i] === "R") {
      seatMin = Math.ceil((seatMax + seatMin) / 2);
    }
  }

  const seatNum =
    seatInput.slice(seatInput.length - 1) === "L" ? seatMin : seatMax;
  const seatId = rowNum * 8 + seatNum;
  ids.push(seatId);
  if (seatId > highestId) highestId = seatId;
});

console.log("part1", highestId);

ids = ids.sort((a, b) => a - b);
const emptySeats = [];
for (let i = 0; i < ids.length - 1; i++) {
  const currId = ids[i];
  if (ids[i + 1] !== currId + 1) emptySeats.push(currId + 1);
}
console.log("part2", emptySeats);
