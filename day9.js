const fs = require("fs");

const input = fs.readFileSync("day9input.txt", "utf8");

const numbers = input.split('\n').map(num => Number(num))

const numbersSeen = {}
const numberQueue = []
for(let i = 0; i < 25; i++){
  numbersSeen[numbers[i]] = true
  numberQueue.push(numbers[i])
}
const doThing = () => {
  for(let i = 25; i < numbers.length; i++){
    let flag = false
    const currNum = numbers[i]
    for(let j = 0; j < numberQueue.length; j++){
      const numSeen = numberQueue[j]
      
      if(numbersSeen[currNum - numSeen]) {
        flag = true
      }
    }
    if(flag === false) {
      console.log('part1', currNum)
      return currNum
    }
    numbersSeen[numberQueue.shift()] = false
    numbersSeen[currNum] = true
    numberQueue.push(currNum)
  }
}



const doTheOtherThing = () => {
  const target = doThing()
  let sum = 0
  const range = []
  for(let i = 0; i < numbers.length; i++){
    const currNum = numbers[i]
    range.push(currNum)
    sum+= currNum
    if(sum === target){
      return range.sort((a,b)=> a -b).filter((num, idx) => idx === 0 || idx === range.length).reduce((acc, curr) => acc += curr)
    }
    if(sum > target){
      while(sum > target){
        sum -= range.shift()
        if(sum === target){
          return range.sort((a,b)=> a -b).filter((num, idx) => idx === 0 || idx === range.length -1).reduce((acc, curr) => acc += curr)
        }
      }
    }
  }
}

console.log('part2', doTheOtherThing())
