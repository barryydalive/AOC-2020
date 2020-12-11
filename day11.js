const fs = require("fs");

const input = fs.readFileSync("day11input.txt", "utf8");

let rows = input.split("\n");
const originalBoard = rows.map((row) => row.split(""));

let board = [...originalBoard];
const tick = () => {
  let seatChanges = 0;
  const oldBoard = [...board];
  const newBoard = oldBoard.map((row, rowNum) => {
    return row.map((position, columnNum) => {
      let occupiedNeighbors = 0;
      if (oldBoard[rowNum - 1]) {
        if (
          oldBoard[rowNum - 1][columnNum - 1] &&
          oldBoard[rowNum - 1][columnNum - 1] === "#"
        )
          occupiedNeighbors++;
        if (
          oldBoard[rowNum - 1][columnNum] &&
          oldBoard[rowNum - 1][columnNum] === "#"
        )
          occupiedNeighbors++;
        if (
          oldBoard[rowNum - 1][columnNum + 1] &&
          oldBoard[rowNum - 1][columnNum + 1] === "#"
        )
          occupiedNeighbors++;
      }
      if (oldBoard[rowNum]) {
        if (
          oldBoard[rowNum][columnNum - 1] &&
          oldBoard[rowNum][columnNum - 1] === "#"
        )
          occupiedNeighbors++;
        if (
          oldBoard[rowNum][columnNum + 1] &&
          oldBoard[rowNum][columnNum + 1] === "#"
        )
          occupiedNeighbors++;
      }
      if (oldBoard[rowNum + 1]) {
        if (
          oldBoard[rowNum + 1][columnNum - 1] &&
          oldBoard[rowNum + 1][columnNum - 1] === "#"
        )
          occupiedNeighbors++;
        if (
          oldBoard[rowNum + 1][columnNum] &&
          oldBoard[rowNum + 1][columnNum] === "#"
        )
          occupiedNeighbors++;
        if (
          oldBoard[rowNum + 1][columnNum + 1] &&
          oldBoard[rowNum + 1][columnNum + 1] === "#"
        )
          occupiedNeighbors++;
      }

      if (position === "#") {
        if (occupiedNeighbors >= 4) {
          seatChanges++;
          return "L";
        }
      }

      if (position === "L") {
        if (occupiedNeighbors === 0) {
          seatChanges++;
          return "#";
        }
      }

      return position;
    });
  });
  if (seatChanges === 0) {
    return newBoard.reduce(
      (acc, currRow) => (acc += currRow.filter((seat) => seat === "#").length),
      0
    );
  }
  board = [...newBoard];
  return false;
};

const doThing = () => {
  while (true) {
    const occupiedSeats = tick();
    if (occupiedSeats) return occupiedSeats;
  }
};

console.log("part1", doThing());

board = [...originalBoard];

const tick2 = () => {
  let seatChanges = 0;
  const oldBoard = [...board];

  const newBoard = oldBoard.map((row, rowNum) => {
    return row.map((position, columnNum) => {
      let occupiedNeighbors = 0;

      const topLeft = [-1, -1];
      const top = [-1, 0];
      const topRight = [-1, 1];
      const left = [0, -1];
      const right = [0, 1];
      const bottomLeft = [1, -1];
      const bottom = [1, 0];
      const bottomRight = [1, 1];

      let topLeftFound = false;
      let topFound = false;
      let topRightFound = false;
      let leftFound = false;
      let rightFound = false;
      let bottomLeftFound = false;
      let bottomFound = false;
      let bottomRightFound = false;

      while (!topLeftFound) {
        if (
          !oldBoard[rowNum + topLeft[0]] ||
          !oldBoard[rowNum + topLeft[0]][columnNum + topLeft[1]]
        )
          topLeftFound = true;
        else if (
          oldBoard[rowNum + topLeft[0]][columnNum + topLeft[1]] === "#"
        ) {
          occupiedNeighbors++;
          topLeftFound = true;
        } else if (
          oldBoard[rowNum + topLeft[0]][columnNum + topLeft[1]] === "L"
        ) {
          topLeftFound = true;
        }
        topLeft[0]--;
        topLeft[1]--;
      }

      while (!topFound) {
        if (
          !oldBoard[rowNum + top[0]] ||
          !oldBoard[rowNum + top[0]][columnNum + top[1]]
        )
          topFound = true;
        else {
          if (oldBoard[rowNum + top[0]][columnNum + top[1]] === "#") {
            occupiedNeighbors++;
            topFound = true;
          }
          if (oldBoard[rowNum + top[0]][columnNum + top[1]] === "L") {
            topFound = true;
          }
          top[0]--;
        }
      }

      while (!topRightFound) {
        if (
          !oldBoard[rowNum + topRight[0]] ||
          !oldBoard[rowNum + topRight[0]][columnNum + topRight[1]]
        )
          topRightFound = true;
        else {
          if (oldBoard[rowNum + topRight[0]][columnNum + topRight[1]] === "#") {
            occupiedNeighbors++;
            topRightFound = true;
          }
          if (oldBoard[rowNum + topRight[0]][columnNum + topRight[1]] === "L") {
            topRightFound = true;
          }
          topRight[0]--;
          topRight[1]++;
        }
      }

      while (!leftFound) {
        if (
          !oldBoard[rowNum + left[0]] ||
          !oldBoard[rowNum + left[0]][columnNum + left[1]]
        )
          leftFound = true;
        else {
          if (oldBoard[rowNum + left[0]][columnNum + left[1]] === "#") {
            occupiedNeighbors++;
            leftFound = true;
          }
          if (oldBoard[rowNum + left[0]][columnNum + left[1]] === "L") {
            leftFound = true;
          }
          left[1]--;
        }
      }

      while (!rightFound) {
        if (
          !oldBoard[rowNum + right[0]] ||
          !oldBoard[rowNum + right[0]][columnNum + right[1]]
        )
          rightFound = true;
        else {
          if (oldBoard[rowNum + right[0]][columnNum + right[1]] === "#") {
            occupiedNeighbors++;
            rightFound = true;
          }
          if (oldBoard[rowNum + right[0]][columnNum + right[1]] === "L") {
            rightFound = true;
          }
          right[1]++;
        }
      }

      while (!bottomLeftFound) {
        if (
          !oldBoard[rowNum + bottomLeft[0]] ||
          !oldBoard[rowNum + bottomLeft[0]][columnNum + bottomLeft[1]]
        )
          bottomLeftFound = true;
        else {
          if (
            oldBoard[rowNum + bottomLeft[0]][columnNum + bottomLeft[1]] === "#"
          ) {
            occupiedNeighbors++;
            bottomLeftFound = true;
          }
          if (
            oldBoard[rowNum + bottomLeft[0]][columnNum + bottomLeft[1]] === "L"
          ) {
            bottomLeftFound = true;
          }
          bottomLeft[0]++;
          bottomLeft[1]--;
        }
      }
      while (!bottomFound) {
        if (
          !oldBoard[rowNum + bottom[0]] ||
          !oldBoard[rowNum + bottom[0]][columnNum + bottom[1]]
        )
          bottomFound = true;
        else {
          if (oldBoard[rowNum + bottom[0]][columnNum + bottom[1]] === "#") {
            occupiedNeighbors++;
            bottomFound = true;
          }
          if (oldBoard[rowNum + bottom[0]][columnNum + bottom[1]] === "L") {
            bottomFound = true;
          }
          bottom[0]++;
        }
      }
      while (!bottomRightFound) {
        if (
          !oldBoard[rowNum + bottomRight[0]] ||
          !oldBoard[rowNum + bottomRight[0]][columnNum + bottomRight[1]]
        )
          bottomRightFound = true;
        else {
          if (
            oldBoard[rowNum + bottomRight[0]][columnNum + bottomRight[1]] ===
            "#"
          ) {
            occupiedNeighbors++;
            bottomRightFound = true;
          }
          if (
            oldBoard[rowNum + bottomRight[0]][columnNum + bottomRight[1]] ===
            "L"
          ) {
            bottomRightFound = true;
          }
          bottomRight[0]++;
          bottomRight[1]++;
        }
      }

      if (position === "#") {
        if (occupiedNeighbors >= 5) {
          seatChanges++;
          return "L";
        }
      }

      if (position === "L") {
        if (occupiedNeighbors === 0) {
          seatChanges++;
          return "#";
        }
      }

      return position;
    });
  });

  if (seatChanges === 0) {
    return newBoard.reduce(
      (acc, currRow) => (acc += currRow.filter((seat) => seat === "#").length),
      0
    );
  }
  board = [...newBoard];
  return false;
};

const doThing2 = () => {
  while (true) {
    const occupiedSeats = tick2();
    if (occupiedSeats) return occupiedSeats;
  }
};

console.log("part2", doThing2());
