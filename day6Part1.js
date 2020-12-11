const fs = require("fs");

const input = fs.readFileSync("./day6input.txt", "utf8");

const groups = input.split("\n\n");

let count = 0;
let part1Count = 0;
groups.forEach((group) => {
  const questions = {
  };
  const part1 = {}

  const people = group.split("\n");

  people.forEach((person) => {
    const responses = {};
    for (let i = 0; i < person.length; i++) {
      const answer = person[i];
      responses[answer] = true;
    }
    Object.keys(responses).forEach(response => {
      if(questions[response]) questions[response]++
      else questions[response] = 1
    })
  });
  Object.keys(questions).forEach((question) => {
    if (questions[question] === people.length) {
      count += 1;
    }
  });
});
console.log(count);