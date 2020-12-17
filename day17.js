const fs = require("fs");

const input = fs.readFileSync("day17input.txt", "utf8");

let rows = input.split("\n");
const originalBoard = rows.map((row) => row.split(""));
let board = [...originalBoard];
// console.log(board)
const interdimensionalSpaceCable = [board];

const appendBoard = (board3d) => {
  board3d.forEach(board => {
    board.forEach(row => {
      row.push('.')
      row.unshift('.')
    })
    board.push(([...new Array(board[0].length).fill(".")]))
    board.unshift(([...new Array(board[0].length).fill(".")]))
  })
  board3d.unshift(board3d[0].map(row => row.map(cube => '.')))
  board3d.push(board3d[0])
}

const tick = (board3D) => {
  appendBoard(board3D)
  let totalActive = 0
  const newBoard3D = board3D.map(board => board.map(row => row.map(cube => cube)))
  for (let board = 0; board < newBoard3D.length; board++) {
    const currBoard = newBoard3D[board]
    for (let row = 0; row < currBoard.length; row++) {
      const currRow = currBoard[row];

      for (let column = 0; column < currRow.length; column++) {
        let currCube = currRow[column];
        let neighborsAlive = checkNeighborsForDeadBodyOdor(board3D, board, row, column)

        if (currCube === "#") {
          //active
          if(neighborsAlive === 2 || neighborsAlive === 3) totalActive++
          else currRow[column] = '.'
        } else {
          if(neighborsAlive === 3){
            totalActive++
            currRow[column] = '#'
          }
        }
      }
      currBoard[row] = currRow
    }
    newBoard3D[board] = currBoard
  }
  console.log(totalActive)
  return newBoard3D
};
let count = 0
const checkNeighborsForDeadBodyOdor = (board3d, board, row, column) => {
  let neighbors = 0
  if(board3d?.[board]?.[row]?.[column + 1] === '#'){
    neighbors++
  }
  if(board3d?.[board + 1]?.[row]?.[column + 1] === '#'){
    neighbors++
  }
  if(board3d?.[board - 1]?.[row]?.[column + 1] === '#'){
    neighbors++
  }
  if(board3d?.[board]?.[row + 1]?.[column + 1] === '#'){
    neighbors++
  }
  if(board3d?.[board]?.[row - 1]?.[column + 1] === '#'){
    neighbors++
  }
  if(board3d?.[board - 1]?.[row + 1]?.[column + 1] === '#'){
    neighbors++
  }
  if(board3d?.[board + 1]?.[row + 1]?.[column + 1] === '#'){
    neighbors++
  }
  if(board3d?.[board + 1]?.[row -1]?.[column + 1] === '#'){
    neighbors++
  }
  if(board3d?.[board - 1]?.[row - 1]?.[column + 1] === '#'){
    neighbors++
  }

  if(board3d?.[board]?.[row]?.[column - 1] === '#'){
    neighbors++
  }
  if(board3d?.[board + 1]?.[row]?.[column - 1] === '#'){
    neighbors++
  }
  if(board3d?.[board - 1]?.[row]?.[column - 1] === '#'){
    neighbors++
  }
  if(board3d?.[board]?.[row + 1]?.[column - 1] === '#'){
    neighbors++
  }
  if(board3d?.[board]?.[row - 1]?.[column - 1] === '#'){
    neighbors++
  }
  if(board3d?.[board - 1]?.[row + 1]?.[column - 1] === '#'){
    neighbors++
  }
  if(board3d?.[board + 1]?.[row + 1]?.[column - 1] === '#'){
    neighbors++
  }
  if(board3d?.[board + 1]?.[row -1]?.[column - 1] === '#'){
    neighbors++
  }
  if(board3d?.[board - 1]?.[row - 1]?.[column - 1] === '#'){
    neighbors++
  }
  if(board3d?.[board + 1]?.[row]?.[column] === '#'){
    neighbors++
  }
  if(board3d?.[board - 1]?.[row]?.[column] === '#'){
    neighbors++
  }
  if(board3d?.[board]?.[row + 1]?.[column] === '#'){
    neighbors++
  }
  if(board3d?.[board]?.[row - 1]?.[column] === '#'){
    neighbors++
  }
  if(board3d?.[board - 1]?.[row + 1]?.[column] === '#'){
    neighbors++
  }
  if(board3d?.[board + 1]?.[row + 1]?.[column] === '#'){
    neighbors++
  }
  if(board3d?.[board + 1]?.[row -1]?.[column] === '#'){
    neighbors++
  }
  if(board3d?.[board - 1]?.[row - 1]?.[column] === '#'){
    neighbors++
  }
  count++
  // console.log(count)
  return neighbors
}

// checkNeighborsForDeadBodyOdor(interdimensionalSpaceCable, interdimensionalSpaceCable[0],interdimensionalSpaceCable[0][0], interdimensionalSpaceCable[0][0][0])

// let timesRan = 0
// let currBoard = interdimensionalSpaceCable
// while(timesRan < 6){

// }
// tick(interdimensionalSpaceCable)
tick(tick(tick(tick(tick(tick(interdimensionalSpaceCable))))))
// setTimeout(() => console.log('submit'), 15000)

// appendBoard(interdimensionalSpaceCable)