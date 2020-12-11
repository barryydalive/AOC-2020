const fs = require('fs')

const input = fs.readFileSync('./day6input.txt', 'utf8')

const groups = input.split('\n\n')

let count = 0

groups.forEach(group => {
  const questions = {}
  const people = group.split('\n')

  people.forEach(person => {
    for(let i = 0 ; i < person.length; i++){
      const answer = person[i]
      questions[answer] = 1
    }
  })

  Object.keys(questions).forEach(question => {
    count += questions[question]
  })

})

console.log('part1', count)

count = 0

groups.forEach((group) => {
  const questions = {
  };

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
console.log('part2', count);
