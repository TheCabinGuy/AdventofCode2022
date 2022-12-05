import { readFile } from "../utils.js";

const testData = `A Y
B X
C Z`;

const SHAPE_POINTS = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const INPUT_SHAPE_MAP = {
  A: "ROCK",
  B: "PAPER",
  C: "SCISSORS",
  X: "ROCK",
  Y: "PAPER",
  Z: "SCISSORS",
};

const SHAPE_INPUT_MAP = Object.fromEntries(
  Object.entries(INPUT_SHAPE_MAP).map((a) => a.reverse())
);

const ROCK_PAPER_SCISSORS = {
  ROCK: "SCISSORS",
  PAPER: "ROCK",
  SCISSORS: "PAPER",
};

const data = readFile("Day 2/puzzleInput.txt");

function transformData(data) {
  return data.split("\n").map((round) => round.split(" "));
}

function calculateScores(shapes) {
  const [opponentShape, myShape] = shapes.map(
    (shapeCode) => INPUT_SHAPE_MAP[shapeCode]
  );
  if (opponentShape === myShape) {
    return [SHAPE_POINTS[opponentShape] + 3, SHAPE_POINTS[myShape] + 3];
  }
  if (ROCK_PAPER_SCISSORS[opponentShape] === myShape) {
    return [SHAPE_POINTS[opponentShape] + 6, SHAPE_POINTS[myShape]];
  } else {
    return [SHAPE_POINTS[opponentShape], SHAPE_POINTS[myShape] + 6];
  }
}

function createScoreSheet(data) {
  return data.map(calculateScores);
}

function puzzle1() {
  return createScoreSheet(transformData(data)).reduce(
    (myTotalScore, [, myScore]) => myTotalScore + myScore,
    0
  );
}

function calculateShapeFromOutcome(opponentShapeCode, outcome) {
  const opponentShape = INPUT_SHAPE_MAP[opponentShapeCode];
  if (outcome === "Y") {
    return [opponentShapeCode, opponentShapeCode];
  }
  if (outcome === "X") {
    return [
      opponentShapeCode,
      SHAPE_INPUT_MAP[ROCK_PAPER_SCISSORS[opponentShape]],
    ];
  }
  return [
    opponentShapeCode,
    SHAPE_INPUT_MAP[ROCK_PAPER_SCISSORS[ROCK_PAPER_SCISSORS[opponentShape]]],
  ];
}

function puzzle2() {
  return createScoreSheet(
    transformData(data).map(([opCode, outcome]) =>
      calculateShapeFromOutcome(opCode, outcome)
    )
  ).reduce((myTotalScore, [, myScore]) => myTotalScore + myScore, 0);
}

console.log(puzzle1());

console.log(puzzle2());
