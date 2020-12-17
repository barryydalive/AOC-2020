const fs = require("fs");

const input = fs.readFileSync("day17input.txt", "utf8");

let rows = input.split("\n");
const originalBoard = rows.map((row) => row.split(""));
let board = [...originalBoard];

const interdimensionalSpaceCable = [[board]];

const appendBoard = (board4d) => {
  board4d.forEach((board3d) => {
    board3d.forEach((board) => {
      board.forEach((row) => {
        row.push(".");
        row.unshift(".");
      });
      board.push([...new Array(board[0].length).fill(".")]);
      board.unshift([...new Array(board[0].length).fill(".")]);
    });
    board3d.unshift(board3d[0].map((row) => row.map((cube) => ".")));
    board3d.push(board3d[0]);
  });
  board4d.unshift(
    board4d[0].map((board) => board.map((row) => row.map((cube) => ".")))
  );
  board4d.push(board4d[0]);
};

const tick = (board4D) => {
  appendBoard(board4D);
  let totalActive = 0;
  const newBoard4D = board4D.map((board3d) =>
    board3d.map((board) => board.map((row) => row.map((cube) => cube)))
  );
  for (let board3d = 0; board3d < newBoard4D.length; board3d++) {
    const currBoard3D = newBoard4D[board3d];
    for (let board = 0; board < currBoard3D.length; board++) {
      const currBoard = currBoard3D[board];
      for (let row = 0; row < currBoard.length; row++) {
        const currRow = currBoard[row];

        for (let column = 0; column < currRow.length; column++) {
          let currCube = currRow[column];
          let neighborsAlive = checkNeighborsForDeadBodyOdor(
            board4D,
            board3d,
            board,
            row,
            column
          );

          if (currCube === "#") {
            //active
            if (neighborsAlive === 2 || neighborsAlive === 3) totalActive++;
            else currRow[column] = ".";
          } else {
            if (neighborsAlive === 3) {
              totalActive++;
              currRow[column] = "#";
            }
          }
        }
        currBoard[row] = currRow;
      }
      currBoard3D[board] = currBoard;
    }
    newBoard4D[board3d] = currBoard3D;
  }
  console.log(totalActive);
  return newBoard4D;
};

const checkNeighborsForDeadBodyOdor = (
  board4D,
  board3d,
  board,
  row,
  column
) => {
  let neighbors = 0;
  if (board4D?.[board3d]?.[board]?.[row]?.[column + 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board]?.[row]?.[column + 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board]?.[row]?.[column + 1] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board + 1]?.[row]?.[column + 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board + 1]?.[row]?.[column + 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board + 1]?.[row]?.[column + 1] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board - 1]?.[row]?.[column + 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board - 1]?.[row]?.[column + 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board - 1]?.[row]?.[column + 1] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board]?.[row + 1]?.[column + 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board]?.[row + 1]?.[column + 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board]?.[row + 1]?.[column + 1] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board]?.[row - 1]?.[column + 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board]?.[row - 1]?.[column + 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board]?.[row - 1]?.[column + 1] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board - 1]?.[row + 1]?.[column + 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board - 1]?.[row + 1]?.[column + 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board - 1]?.[row + 1]?.[column + 1] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board + 1]?.[row + 1]?.[column + 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board + 1]?.[row + 1]?.[column + 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board + 1]?.[row + 1]?.[column + 1] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board + 1]?.[row - 1]?.[column + 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board + 1]?.[row - 1]?.[column + 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board + 1]?.[row - 1]?.[column + 1] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board - 1]?.[row - 1]?.[column + 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board - 1]?.[row - 1]?.[column + 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board - 1]?.[row - 1]?.[column + 1] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board]?.[row]?.[column - 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board]?.[row]?.[column - 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board]?.[row]?.[column - 1] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board + 1]?.[row]?.[column - 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board + 1]?.[row]?.[column - 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board + 1]?.[row]?.[column - 1] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board - 1]?.[row]?.[column - 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board - 1]?.[row]?.[column - 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board - 1]?.[row]?.[column - 1] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board]?.[row + 1]?.[column - 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board]?.[row + 1]?.[column - 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board]?.[row + 1]?.[column - 1] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board]?.[row - 1]?.[column - 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board]?.[row - 1]?.[column - 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board]?.[row - 1]?.[column - 1] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board - 1]?.[row + 1]?.[column - 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board - 1]?.[row + 1]?.[column - 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board - 1]?.[row + 1]?.[column - 1] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board + 1]?.[row + 1]?.[column - 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board + 1]?.[row + 1]?.[column - 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board + 1]?.[row + 1]?.[column - 1] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board + 1]?.[row - 1]?.[column - 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board + 1]?.[row - 1]?.[column - 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board + 1]?.[row - 1]?.[column - 1] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board - 1]?.[row - 1]?.[column - 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board - 1]?.[row - 1]?.[column - 1] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board - 1]?.[row - 1]?.[column - 1] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board + 1]?.[row]?.[column] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board + 1]?.[row]?.[column] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board + 1]?.[row]?.[column] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board - 1]?.[row]?.[column] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board - 1]?.[row]?.[column] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board - 1]?.[row]?.[column] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board]?.[row + 1]?.[column] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board]?.[row + 1]?.[column] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board]?.[row + 1]?.[column] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board]?.[row - 1]?.[column] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board]?.[row - 1]?.[column] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board]?.[row - 1]?.[column] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board - 1]?.[row + 1]?.[column] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board - 1]?.[row + 1]?.[column] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board - 1]?.[row + 1]?.[column] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board + 1]?.[row + 1]?.[column] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board + 1]?.[row + 1]?.[column] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board + 1]?.[row + 1]?.[column] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board + 1]?.[row - 1]?.[column] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board + 1]?.[row - 1]?.[column] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board + 1]?.[row - 1]?.[column] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d]?.[board - 1]?.[row - 1]?.[column] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d + 1]?.[board - 1]?.[row - 1]?.[column] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board - 1]?.[row - 1]?.[column] === "#") {
    neighbors++;
  }

  if (board4D?.[board3d + 1]?.[board]?.[row]?.[column] === "#") {
    neighbors++;
  }
  if (board4D?.[board3d - 1]?.[board]?.[row]?.[column] === "#") {
    neighbors++;
  }

  return neighbors;
};

const hyperCube = tick(tick(tick(tick(tick(tick(interdimensionalSpaceCable))))));

