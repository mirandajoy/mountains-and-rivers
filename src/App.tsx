import { useState, useEffect } from "react";
import "./App.scss";
import Board from "./components/Board/Board";
import DiceGroup from "./components/DiceGroup/DiceGroup";
import PlayerList from "./components/PlayerList/PlayerList";

interface PlayerPosition {
  [key: number]: number;
}

function App() {
  const players: string[] = ["Player 1", "Player 2"];
  const [boardPosition, setBoardPosition] = useState<PlayerPosition>({});
  const [activePlayer, setActivePlayer] = useState<number>(0);

  const setInitialPositions = () => {
    const posObj: Record<number, number> = {};
    players.forEach((_player, i) => {
      posObj[i] = 1;
    });
    setBoardPosition(posObj);
  };

  useEffect(() => {
    setInitialPositions();
  }, []);

  function changePlayer() {
    setActivePlayer((prevPlayer) => (prevPlayer === players.length - 1 ? 0 : prevPlayer + 1));
  }

  const movePiece = (distance: number, player: number) => {
    const newPos: number = boardPosition[player as keyof PlayerPosition] + distance;
    setBoardPosition((prevPositions) => ({
      ...prevPositions,
      [player]: newPos,
    }));
    changePlayer()
  };

  return (
    <div className="app">
      <Board players={players} boardPosition={boardPosition}/>
      <div className="app__actions">
        <PlayerList players={players} activePlayer={activePlayer} />
        <DiceGroup movePiece={movePiece} activePlayer={activePlayer}/>
      </div>
    </div>
  );
}

export default App;
