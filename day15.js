const input = [0,14,6,20,1,4]

const mem = {}

input.forEach((num, i) => {
  mem[num] = [i,i]
})

const tracker = [...input]
for(let i = input.length; i < 2020; i++){
  const lastNum = tracker[i - 1]
  const currNum = mem[lastNum][1] - mem[lastNum][0]
  tracker.push(currNum)
  if(!mem[currNum]) mem[currNum] = [i, i]
  else mem[currNum] = [mem[currNum][1], i] 
}
console.log(tracker.pop())

const memPart2 = {}

input.forEach((num, i) => {
  memPart2[num] = [i,i]
})

let lastNum = 4

for(let i = input.length; i < 30000000; i++){
  const currNum = memPart2[lastNum][1] - memPart2[lastNum][0]
  lastNum = currNum
  if(!memPart2[currNum]) memPart2[currNum] = [i, i]
  else memPart2[currNum] = [memPart2[currNum][1], i] 
}
console.log('part2', lastNum)