import { createBoardMatrix } from "./boardStrut.ts";

interface Start {
  y: number;
  x: number;
}

interface End {
  y: number;
  x: number;
}

interface SingleSnake {
  start: Start;
  end: End;
}

interface SingleSnakeDetails {
  start: Start;
  end: End;
  direction: string;
  width: number;
  height: number;
  hypot: number;
  angle: number;
}

const snakes: SingleSnake[] = [
  { end: { y: 1, x: 3 }, start: { y: 0, x: 6 } },
  { end: { y: 5, x: 6 }, start: { y: 3, x: 6 } },
  { end: { y: 6, x: 1 }, start: { y: 1, x: 2 } },
  { end: { y: 6, x: 3 }, start: { y: 5, x: 0 } },
  { end: { y: 8, x: 6 }, start: { y: 2, x: 3 } },
  { end: { y: 9, x: 7 }, start: { y: 7, x: 7 } },
  { end: { y: 9, x: 5 }, start: { y: 7, x: 5 } },
  { end: { y: 9, x: 1 }, start: { y: 7, x: 2 } },
];

let spaceSize = 4.5;

const snakeDetails: SingleSnakeDetails[] = snakes.map((s) => {
  let direction = s.end.x > s.start.x ? "right" : "left";
  let width = (direction === "right" ? s.end.x - s.start.x : s.start.x - s.end.x) * spaceSize;
  let height = (s.end.y - s.start.y) * spaceSize;
  let hypot = Math.hypot(height, width);
  let angle = direction === "right" ? Math.asin(height / hypot) : 3.1415 - Math.asin(height / hypot);
  return {
    ...s,
    direction: direction,
    width: width,
    height: height,
    hypot: hypot,
    angle: angle,
  };
});

const snakeSpaces = snakes.map((s) => {
  const board = createBoardMatrix();
  let startSq = board[s.start.y][s.start.x];
  let endSq = board[s.end.y][s.end.x];
  return {
    ...s,
    startSq: startSq,
    endSq: endSq,
  };
});

export { snakeDetails, snakeSpaces };