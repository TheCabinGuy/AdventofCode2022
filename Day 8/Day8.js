import { readFile } from "../utils.js";

const testData = `30373
25512
65332
33549
35390`;

const data = readFile("Day 8/puzzleInput.txt");

function transformData(data) {
  return data.split("\n").map((row) => row.split("").map(Number));
}

function isVisible(data, height) {
  return data.every((tree) => tree < height);
}

function isTreeVisible(data, x, y, height) {
  const column = data.map((row) => row[x]);
  return (
    x === 0 ||
    y === 0 ||
    x === data[0].length - 1 ||
    y === data.length - 1 ||
    isVisible(column.slice(0, y), height) ||
    isVisible(column.slice(y + 1), height) ||
    isVisible(data[y].slice(0, x), height) ||
    isVisible(data[y].slice(x + 1), height)
  );
}

function puzzle1() {
  return transformData(data)
    .map((treeRow, indexY, treeGrid) =>
      treeRow.filter((tree, indexX) =>
        isTreeVisible(treeGrid, indexX, indexY, tree)
      )
    )
    .reduce(
      (totalVisibleTreesCount, visibleTreeRow) =>
        totalVisibleTreesCount + visibleTreeRow.length,
      0
    );
}

function calculateScenicScore(data, x, y, treeHeight) {
  const column = data.map((row) => row[x]);
  const upScore =
    column
      .slice(0, y)
      .reverse()
      .findIndex((tree) => tree >= treeHeight) + 1 || column.slice(0, y).length;
  const downScore =
    column.slice(y + 1).findIndex((tree) => tree >= treeHeight) + 1 ||
    column.slice(y + 1).length;
  const leftScore =
    data[y]
      .slice(0, x)
      .reverse()
      .findIndex((tree) => tree >= treeHeight) + 1 ||
    data[y].slice(0, x).length;
  const rightScore =
    data[y].slice(x + 1).findIndex((tree) => tree >= treeHeight) + 1 ||
    data[y].slice(x + 1).length;
  return upScore * downScore * leftScore * rightScore;
}

function puzzle2() {
  return transformData(data)
    .map((treeRow, indexY, treeGrid) =>
      treeRow.map((tree, indexX) =>
        calculateScenicScore(treeGrid, indexX, indexY, tree)
      )
    )
    .reduce(
      (highestTree, treeRow) =>
        Math.max(...treeRow) > highestTree ? Math.max(...treeRow) : highestTree,
      0
    );
}

console.log(puzzle1());

console.log(puzzle2());
