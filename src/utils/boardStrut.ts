const createSquares = () => {
  let board: number[] = [];
  for (let i = 1; i < 101; i++) {
    board.push(i);
  }
  return board;
};

const createBoardMatrix = () => {
  const board = createSquares();
  let board2D: number[][] = [];
  for (let i = 0; i < board.length; i += 10) {
    let row = board.slice(i, i + 10);
    (row[0] - 1) % 20 === 0 ? board2D.push(row) : board2D.push(row.reverse());
  }
  return board2D;
};

export { createBoardMatrix };
