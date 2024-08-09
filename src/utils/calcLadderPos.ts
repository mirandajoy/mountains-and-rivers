import { createBoardMatrix } from "./boardStrut.ts";

interface Start {
  y: number;
  x: number;
}

interface End {
  y: number;
  x: number;
}

interface SingleLadder {
  start: Start;
  end: End;
}

interface SingleLadderDetails {
  start: Start;
  end: End;
  direction: string;
  width: number;
  height: number;
  hypot: number;
  angle: number;
}

const ladders: SingleLadder[] = [
  { start: { y: 0, x: 3 }, end: { y: 1, x: 6 } },
  { start: { y: 0, x: 8 }, end: { y: 3, x: 9 } },
  { start: { y: 1, x: 0 }, end: { y: 3, x: 2 } },
  { start: { y: 2, x: 7 }, end: { y: 8, x: 3 } },
  { start: { y: 3, x: 0 }, end: { y: 5, x: 1 } },
  { start: { y: 6, x: 2 }, end: { y: 8, x: 0 } },
  { start: { y: 7, x: 9 }, end: { y: 9, x: 9 } },
];

let spaceSize = 4.5;

const ladderDetails: SingleLadderDetails[] = ladders.map((l) => {
  let direction = l.end.x > l.start.x ? "right" : "left";
  let width = (direction === "right" ? l.end.x - l.start.x : l.start.x - l.end.x) * spaceSize;
  let height = (l.end.y - l.start.y) * spaceSize;
  let hypot = Math.hypot(height, width);
  let angle = direction === "right" ? Math.asin(height / hypot) : 3.1415 - Math.asin(height / hypot);
  return {
    ...l,
    direction: direction,
    width: width,
    height: height,
    hypot: hypot,
    angle: angle,
  };
});

const ladderSpaces = ladders.map((l) => {
  const board = createBoardMatrix();
  let startSq = board[l.start.y][l.start.x];
  let endSq = board[l.end.y][l.end.x];
  return {
    ...l,
    startSq: startSq,
    endSq: endSq,
  };
});

export { ladderDetails, ladderSpaces };
