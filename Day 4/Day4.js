import { readFile } from "../utils.js";

const testData = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const data = readFile("Day 4/puzzleInput.txt");

function transformData(data) {
  return data.split("\n").map((elfPair) => elfPair.split(","));
}

function generateSections(elfSectionRange) {
  const [min, max] = elfSectionRange.split("-").map(Number);
  return Array.from({ length: max - min + 1 }, (_, i) => i + min);
}

function hasCompleteOverlap([elf1, elf2]) {
  return (
    elf1.every((section) => elf2.includes(section)) ||
    elf2.every((section) => elf1.includes(section))
  );
}

function hasSomeOverlap([elf1, elf2]) {
  return (
    elf1.some((section) => elf2.includes(section)) ||
    elf2.some((section) => elf1.includes(section))
  );
}

function puzzle1() {
  return transformData(data)
    .map((elfPairs) => elfPairs.map(generateSections))
    .filter(hasCompleteOverlap).length;
}

function puzzle2() {
  return transformData(data)
    .map((elfPairs) => elfPairs.map(generateSections))
    .filter(hasSomeOverlap).length;
}

console.log(puzzle1());

console.log(puzzle2());
