import "./Board.scss";
import { ladderDetails } from "../../utils/calcLadderPos.ts";
import { snakeDetails } from "../../utils/calcSnakePos.ts";
import riverS from "../../assets/simple-river-s.svg";
import riverM from "../../assets/simple-river-m.svg";
import riverL from "../../assets/simple-river-l.svg";
import mountainS from "../../assets/simple-mountain-s.svg";
import mountainM from "../../assets/simple-mountain-m.svg";
import mountainL from "../../assets/simple-mountain-l.svg";

interface PlayerPosition {
  [key: number]: number;
}

function Board({ boardPosition }: { boardPosition: PlayerPosition }) {
  const boardOrder: number[] = [
    100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 80, 79, 78, 77, 76, 75, 74, 73, 72,
    71, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 41, 42, 43, 44, 45, 46, 47, 48,
    49, 50, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 20, 19, 18, 17, 16, 15, 14,
    13, 12, 11, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ];

  return (
    <div className="board">
      {boardOrder.map((sq, i) => {
        return (
          <div
            key={i}
            id={sq.toString()}
            className={`board__space ${sq % 2 ? "board__space--odd" : "board__space--even"}`}
          >
            <div className="board__number">{sq}</div>
            {boardPosition[0] === sq && (
              <div className="board__token-container">
                <span className="material-symbols-outlined board__token">eco</span>
              </div>
            )}
            {boardPosition[1] === sq && (
              <div className="board__token-container">
                <span className="material-symbols-outlined board__token">spa</span>
              </div>
            )}
          </div>
        );
      })}
      {ladderDetails.map((l, i) => {
        const transformStyle = `rotate(-${l.angle}rad)`;
        const img = () => {
          if (l.hypot < 12) {
            return mountainS;
          } else if (l.hypot < 25) {
            return mountainM;
          } else {
            return mountainL;
          }
        };
        return (
          <img
            src={img()}
            key={i}
            className="board__ladder"
            style={{
              left: `calc(4.5rem * ${l.start.x} + 2.25rem)`,
              bottom: `calc(4.5rem * ${l.start.y} + 2.25rem)`,
              width: `calc(${l.hypot}rem)`,
              transform: transformStyle,
            }}
          />
        );
      })}
      {snakeDetails.map((s, i) => {
        const transformStyle = `rotate(-${s.angle}rad)`;
        const img = () => {
          if (s.hypot < 12) {
            return riverS;
          } else if (s.hypot < 25) {
            return riverM;
          } else {
            return riverL;
          }
        };
        return (
          <img
            src={img()}
            key={i}
            className="board__snake"
            style={{
              left: `calc(4.5rem * ${s.start.x} + 2.25rem)`,
              bottom: `calc(4.5rem * ${s.start.y} + 2.25rem)`,
              width: `calc(${s.hypot}rem)`,
              transform: transformStyle,
            }}
          />
        );
      })}
    </div>
  );
}

export default Board;
