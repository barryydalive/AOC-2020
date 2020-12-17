const fs = require("fs");
const { set } = require("lodash");
const { format } = require("path");

const input = fs.readFileSync("./day16input.txt", "utf8").split("\n\n");

let [rules, myTicket, tix] = input;
tix = tix.split("\n");
tix.shift();
tix = tix.map((ticket) => ticket.split(",").map(Number));
myTicket = myTicket.split("\n");
myTicket.shift();
myTicket = myTicket[0];
myTicket = myTicket.split(",").map(Number);

rules = rules.split("\n").map((rule) => {
  const [name, range] = rule.split(": ");
  const [range1, range2] = range
    .split(" or ")
    .map((range) => range.split("-").map(Number));
  return { name, range1, range2 };
});

const invalid = [];
invalidTixIdx = [];

const checkRule = ({
  range1: [range1Min, range1Max],
  range2: [range2Min, range2Max],
}, num) => {
  if (num >= range1Min && num <= range1Max) {
    return true;
  }
  if (num >= range2Min && num <= range2Max) {
    return true;
  }
  return false
}

tix.forEach((ticket, idx) => {
  ticket.forEach((num) => {
    let valid = false;
    let i = 0;
    while (!valid && i < rules.length) {
      valid = checkRule(rules[i],num)
      i++;
    }
    if (valid === false) {
      invalid.push(num);
      tix[idx] = null;
    }
  });
});
console.log(invalid.reduce((acc, curr) => (acc += curr)));

tix = tix.filter((ticket) => ticket !== null);
// console.log(tix);
rules = rules.map(rule => ({
  ...rule,
  indexes:[]
}))

rules.forEach((rule) => {
  let allGood = true
  for (let i = 0; i < myTicket.length; i++) {
    tix.forEach(ticket => {
      if(!checkRule(rule, ticket[i])){
        allGood = false
      }
    })
    if(allGood){
      rule.indexes.push(i)
    }
  }
});

console.log(rules)

// 		// Step 2: Find the correct indexes
//     console.log(fields)
// 		while (Object.values(fields).some(value => (value.index === undefined))) {
// 			Object.keys(fields).forEach((key1)=>{
// 				fields[key1].indexes.some((index) => {
// 					if (!Object.keys(fields).some((key2) =>
// 						(fields[key2].indexes.includes(index) &&
// 						(key1 != key2))
// 					)) {
// 						fields[key1].index = index;
// 						fields[key1].indexes = [index];
// 						return true;
// 					}
// 					return false;
// 				});
// 			});
// 		}

// 		// Step 3: Multiply all of the values and return
// 		let result = 1;
// 		Object.keys(fields).forEach((key)=>{
// 			if (key.startsWith("departure")) {
// 				result *= myTicket[fields[key].index];
// 			}
// 		});
// 		return result;
// 	}
// 	return null;
// };

// console.log(thing(input,2))
