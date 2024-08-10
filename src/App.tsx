import { useState, useEffect } from "react";
import "./App.scss";
import Board from "./components/Board/Board";
import DiceGroup from "./components/DiceGroup/DiceGroup";
import PlayerList from "./components/PlayerList/PlayerList";
import GameSetup from "./components/GameSetup/GameSetup";
import { ladderSpaces } from "./utils/calcLadderPos.ts";
import { snakeSpaces } from "./utils/calcSnakePos.ts";

interface PlayerPosition {
  [key: number]: number;
}

function App() {
  const [players, setPlayers] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [boardPosition, setBoardPosition] = useState<PlayerPosition>({});
  const [activePlayer, setActivePlayer] = useState<number>(0);
  const [rollDisabled, setRollDisabled] = useState<boolean>(false);

  const startGame = (player: string) => {
    setPlayers([player, "Computer"])
    setGameStarted(true);
  }

  const setInitialPositions = () => {
    const posObj: Record<number, number> = {};
    players.forEach((_player, i) => {
      posObj[i] = 1;
    });
    setBoardPosition(posObj);
  };

  useEffect(() => {
    setInitialPositions();
  }, [players]);

  function changePlayer() {
    setActivePlayer((prevPlayer) => (prevPlayer === players.length - 1 ? 0 : prevPlayer + 1));
  }

  const movePiece = (distance: number, player: number) => {
    const newPos: number = boardPosition[player as keyof PlayerPosition] + distance;
    setRollDisabled(true);
    setTimeout(function () {
      setBoardPosition((prevPositions) => ({
        ...prevPositions,
        [player]: newPos,
      }));
    }, 300);
    checkAdditionalMoves(newPos, player);
    setTimeout(function () {
      changePlayer();
      setRollDisabled(false);
    }, 2000);
  };

  const checkAdditionalMoves = (pos: number, player: number) => {
    const ladder = ladderSpaces.find((l) => l.startSq === pos);
    const snake = snakeSpaces.find((s) => s.endSq === pos);
    ladder !== undefined &&
      setTimeout(function () {
        setBoardPosition({ ...boardPosition, [player]: ladder.endSq });
      }, 2000);
    ladder !== undefined && console.log(players[player] + " up a ladder");
    snake !== undefined &&
      setTimeout(function () {
        setBoardPosition({ ...boardPosition, [player]: snake.startSq });
      }, 1200);
    snake !== undefined && console.log(players[player] + " down a snake");
  };

  return (
    <div className="app">
      {gameStarted ? (
        <>
          <Board boardPosition={boardPosition} />
          <div className="app__actions">
            <PlayerList players={players} activePlayer={activePlayer} />
            <DiceGroup movePiece={movePiece} activePlayer={activePlayer} rollDisabled={rollDisabled} />
          </div>
        </>
      ) : (
        <GameSetup startGame={startGame} />
      )}
    </div>
  );
}

export default App;
