import { readFile } from "../utils.js";

const testData = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`;

const data = readFile("Day 6/puzzleInput.txt");

function transformData(data) {
  return data.split("");
}

function findDistinctCharacterTrain(string, amount) {
  return (
    string.findIndex(
      (_, index, self) =>
        new Set(self.slice(index, index + amount)).size === amount
    ) + amount
  );
}

function puzzle1() {
  return findDistinctCharacterTrain(transformData(data), 4);
}

function puzzle2() {
  return findDistinctCharacterTrain(transformData(data), 14);
}

console.log(puzzle1());

console.log(puzzle2());
