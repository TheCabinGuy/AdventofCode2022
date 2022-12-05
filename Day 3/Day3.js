import { readFile } from "../utils.js";

const testData = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const alphabetLowerCase = "abcdefghijklmnopqrstuvwxyz";
const priorityList = [
  ...alphabetLowerCase.split(""),
  ...alphabetLowerCase.toUpperCase().split(""),
];

const data = readFile("Day 3/puzzleInput.txt");

function transformData(data) {
  return data
    .split("\n")
    .map((backpack) => [
      backpack.slice(0, backpack.length / 2).split(""),
      backpack.slice(backpack.length / 2, backpack.length).split(""),
    ]);
}

function transformDataPart2(data) {
  let setsOf3 = 0;
  return transformData(data).reduce((total, backpack, index, self) => {
    if (index % 3 === 0) {
      total[setsOf3] = [backpack.flat(1)];
    } else if (index % 3 < 3) {
      total[setsOf3].push(backpack.flat(1));
    }
    if (index % 3 === 2) setsOf3++;
    return total;
  }, []);
}

function findCommonItemsInBags([compartmentA, ...otherCompartments]) {
  return new Set(
    compartmentA.filter((item) =>
      otherCompartments.every((compartment) => compartment.includes(item))
    )
  );
}

function getPriorityFromItem(item) {
  return priorityList.findIndex((priority) => priority === item) + 1;
}

function calculateTotalPriority(items) {
  return items
    .map(findCommonItemsInBags)
    .reduce((total, items) => [...total, ...items], [])
    .map(getPriorityFromItem)
    .reduce((a, b) => a + b, 0);
}

function puzzle1() {
  return calculateTotalPriority(transformData(data));
}

function puzzle2() {
  return calculateTotalPriority(transformDataPart2(data));
}

console.log(puzzle1());

console.log(puzzle2());
