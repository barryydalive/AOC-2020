const fs = require("fs");

fs.readFile("./day1input.txt", "utf8", (err, data) => {
  data = data.split("\n");
  data = data.map((num) => Number(num));
  data = data.sort((a, b) => a - b);
  const hash = {};
  data.forEach((num) => {
    if (hash[num]) {
      console.log("part1", num * hash[num]);
      return;
    } else {
      hash[2020 - num] = num;
    }
  });
});

fs.readFile("./day1input.txt", "utf8", (err, data) => {
  data = data.split("\n");
  data = data.map((num) => Number(num));
  data = data.sort((a, b) => a - b);
  for (let i = 1; i < data.length - 2; i++) {
    const a = data[i];
    let j = i + 1;
    let k = data.length - 1;

    while (j < k) {
      const b = data[j];
      const c = data[k];

      if (a + b + c === 2020) {
        console.log("part2", a * b * c);
        return;
      }

      if (a + b + c > 2020) {
        k--;
      }

      if (a + b + c < 2020) {
        j++;
      }
    }
  }
});
