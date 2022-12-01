import { readFile } from "../utils.js";

const testData = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

const data = readFile("Day 1/puzzleInput.txt");

function transformData(inputString) {
  return inputString
    .split("\n\n")
    .map((elfSnackString) => elfSnackString.split("\n").map(Number));
}

function totalCalories(data) {
  return data.map((elfSnacks) => elfSnacks.reduce((a, b) => a + b, 0));
}

function puzzle1() {
  return totalCalories(transformData(data))
    .sort((a, b) => a - b)
    .pop();
}

function puzzle2() {
  return totalCalories(transformData(data))
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((a, b) => a + b, 0);
}

console.log(puzzle1());
console.log(puzzle2());
