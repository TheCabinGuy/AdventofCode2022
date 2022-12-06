import { readFile } from "../utils.js";

const testData = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const data = readFile("Day 5/puzzleInput.txt");

function transformData(data) {
  let [crates, craneInstructions] = data.split("\n\n");
  return [
    parseCrateDrawing(crates),
    craneInstructions.split("\n").map(parseInstruction),
  ];
}

function parseCrateDrawing(crateDrawing) {
  let [numbers, ...crateStacks] = crateDrawing.split("\n").reverse();
  crateStacks = crateStacks.map((a) =>
    a.match(/.{1,4}/g).map((a) => a.replace(/\[|]| /g, ""))
  );
  return numbers
    .split(" ")
    .map(() => [])
    .map((a, index) =>
      crateStacks.reduce((total, crates) => {
        if (crates[index]) {
          total.push(crates[index]);
        }
        return total;
      }, [])
    );
}

function parseInstruction(instructionString) {
  const [amount, start, end] = instructionString
    .replace(/move |from |to /g, "")
    .split(" ")
    .map(Number);
  return {
    amount,
    start,
    end,
  };
}

function puzzle1() {
  const [crates, instructions] = transformData(data);
  return instructions
    .reduce((currentCrates, { amount, start, end }) => {
      const cratesToMove = currentCrates[start - 1].slice(amount * -1);
      currentCrates[start - 1] = currentCrates[start - 1].slice(
        0,
        currentCrates[start - 1].length - amount
      );
      currentCrates[end - 1] = currentCrates[end - 1].concat(
        ...cratesToMove.reverse()
      );
      return currentCrates;
    }, crates)
    .reduce((total, crateStack) => [...total, crateStack.pop()], [])
    .join("");
}

function puzzle2() {
  const [crates, instructions] = transformData(data);
  return instructions
    .reduce((currentCrates, { amount, start, end }) => {
      const cratesToMove = currentCrates[start - 1].slice(amount * -1);
      currentCrates[start - 1] = currentCrates[start - 1].slice(
        0,
        currentCrates[start - 1].length - amount
      );
      currentCrates[end - 1] = currentCrates[end - 1].concat(...cratesToMove);
      return currentCrates;
    }, crates)
    .reduce((total, crateStack) => [...total, crateStack.pop()], [])
    .join("");
}

console.log(puzzle1());

console.log(puzzle2());
