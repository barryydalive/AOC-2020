
const fs = require("fs");
const bignum = require('bignum')
const crt = require('nodejs-chinese-remainder')
const _ = require('lodash')
const input = fs.readFileSync("day13input.txt", "utf8").split('\n')
// mulInv = (a,b) =>{
// 	let b0 = b
// 	let [x0,x1] = [0,1]
// 	if (b==1) return 1
//   let q
// 	while (a > 1){
//     q = Math.floor(a/b)
//     [a,b] = [b, a % b]
// 		[x0,x1] = [x1-q*x0, x0]
//   }
// 	if (x1 < 0)  x1 += b0
// 	return x1

// }

// const crt = (n,a) =>{
//   sum = 0
//   prod = n.reduce((a,c) => a*c)
//   for( const [ni,ai] in _.zip(n,a) ){
//     p = Math.floor(prod / ni)
//     sum += (ai * p * mulInv(p,ni))
//   }

//   return sum % prod
// }

console.log(crt([3,5,7].map(num => bignum(Number(num))), [2,3,2].map(num => bignum(Number(num)))).toString())

let [earliestTime, buses] = input
earliestTime = Number(earliestTime)
let activeBuses = buses.split(',').filter(bus => bus !== 'x').map(bus => Number(bus))
let currentTime = earliestTime
let found = false


while(!found){
  for(let i = 0; i < activeBuses.length;i++){
    const currBus = activeBuses[i]
    if(currentTime % currBus === 0){
      i=activeBuses.length
      found = true
    }
  }
  currentTime++
}
console.log(currentTime)
// const busesMinusOrder = activeBuses.map((bus, i) => Number(bus - i))
// console.log(busesMinusOrder)

// console.log( '  The solution is: ' + crt([5,3,7].map(num => bignum(num)), [4,5,11].map(num => bignum(num))));
// console.log(crt(activeBuses, busesMinusOrder).toString(), 'yes')
// console.log(crt(busesMinusOrder, activeBuses).toNumber(), 'yes')

activeBuses = buses.split(',').map((x, i) => [x, i]).filter(([x,i]) => x !== 'x').map(([x,i]) => [bignum(Number(x)), bignum(Number(i))])
console.log(activeBuses)

const [yesBuses, busesMinusIndex] = _.unzip(activeBuses)
console.log('yes', yesBuses.map(bus => bus.toString()))
console.log(busesMinusIndex.map(bus => bus.toString()))
console.log(crt(yesBuses, busesMinusIndex).toNumber())
// console.log(crt([5,3,7],[4,5,11]))
// run(parseInput(input.join('\n')))
function run(buses) {
	let step = 1;
	let n = 1;
	for (let [bus, offset] of buses) {
		while ((n + offset) % bus !== 0) {
			n += step;
		}
		step *= bus;
	}
	return n;
}
function parseInput(line2) {
	const buses = line2.split(',')
		.map((x,i) => [x,i])
		.filter(([x,i]) => x !== 'x')
		.map(([x,i]) => [+x,i]);
	return buses;
}
console.log(input[1])
console.log(run(parseInput(input[1])))