const fs = require('fs')

const input = fs.readFileSync('day7input.txt', 'utf8')

const rules = input.split('\n')

const ruleMap = {}

rules.forEach(rule => {
  rule = rule.split(' contain ')
  let bagColor = rule[0].split(' ')
  bagColor.pop()
  bagColor = bagColor.join(' ')
  ruleMap[bagColor] = {}
  let innerBags = rule[1]
  innerBags = innerBags.split(', ').map(innerBag => {
    innerBagRule = innerBag.split(' ')
    innerBagRule.pop()
    const amount = innerBagRule.shift()
    const color = innerBagRule.join(' ')

    ruleMap[bagColor][color] = amount
    return{
      amount,
      color
    }
  })
})

const bagsThatCanHoldShinyGold = {}
Object.keys(ruleMap).forEach(rule => {
  if(ruleMap[rule]['shiny gold']) bagsThatCanHoldShinyGold[rule] = true
})

const queue = Object.keys(bagsThatCanHoldShinyGold)

while(queue.length){
  const currColor = queue.shift()
  Object.keys(ruleMap).forEach(rule => {
    if(ruleMap[rule][currColor]) {
      if(!bagsThatCanHoldShinyGold[rule]) {
        bagsThatCanHoldShinyGold[rule] = true
        queue.push(rule)
      }
    }
  })
}
console.log('part1', Object.keys(bagsThatCanHoldShinyGold).length)

const calculateTotalInnerBags = (color) => {
  if(ruleMap[color]['other']) return 0

  const totalInners = []
  Object.keys(ruleMap[color]).forEach(currBag => {
    totalInners.push(Number(ruleMap[color][currBag]) + (calculateTotalInnerBags(currBag) * Number(ruleMap[color][currBag])))
  })
  return totalInners.reduce((acc, curr) => acc += curr, 0)
}

console.log('part1', calculateTotalInnerBags('shiny gold'))
