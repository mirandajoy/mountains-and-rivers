import { useState } from "react";
import "./App.scss";
import Board from "./components/Board/Board";
import DiceGroup from "./components/DiceGroup/DiceGroup";
import GameSetup from "./components/GameSetup/GameSetup";
import PlayerList from "./components/PlayerList/PlayerList";
import useSessionStorage from "./hooks/sessionStorage.tsx";
import { ladderSpaces } from "./utils/calcLadderPos.ts";
import { snakeSpaces } from "./utils/calcSnakePos.ts";

interface PlayerPosition {
  [key: number]: number;
}

function App() {
  const [gameSetup, setGameSetup] = useSessionStorage("gameStatus", "");
  const [boardPosition, setBoardPosition] = useSessionStorage("boardPosition", "");
  const [activePlayer, setActivePlayer] = useSessionStorage("activePlayer", 0);
  const [rollDisabled, setRollDisabled] = useState<boolean>(false);
  const [winner, setWinner] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const startGame = (player: string) => {
    setGameSetup({
      players: [player, "Computer"],
      gameStarted: true,
    });
    setBoardPosition({ 0: 1, 1: 1 });
    setActivePlayer(0);
  };

  function changePlayer() {
    setActivePlayer(activePlayer === 0 ? 1 : 0);
  }

  const movePiece = (distance: number, player: number) => {
    const newPos: number = boardPosition[player as keyof PlayerPosition] + distance;
    setRollDisabled(true);
    newPos >= 100 && setWinner(player);
    setTimeout(function () {
      const pos = newPos < 100 ? newPos : 100;
      setBoardPosition({
        ...boardPosition,
        [player]: pos,
      });
    }, 300);
    checkAdditionalMoves(newPos, player);
    newPos < 100 &&
      setTimeout(function () {
        changePlayer();
        setRollDisabled(false);
      }, 2500);
  };

  const checkAdditionalMoves = (pos: number, player: number) => {
    const ladder = ladderSpaces.find((l) => l.startSq === pos);
    const snake = snakeSpaces.find((s) => s.endSq === pos);
    ladder !== undefined && setMessage(`${gameSetup.players[player]} climbs up a mountain`);
    ladder !== undefined &&
      setTimeout(function () {
        setBoardPosition({
          ...boardPosition,
          [player]: ladder.endSq,
        });
        setTimeout(function () {
          setMessage(null);
        }, 500);
      }, 2000);
    snake !== undefined && setMessage(`${gameSetup.players[player]} slides down a river`);
    snake !== undefined &&
      setTimeout(function () {
        setBoardPosition({
          ...gameSetup.boardPosition,
          [player]: snake.startSq,
        });
        setTimeout(function () {
          setMessage(null);
        }, 500);
      }, 2000);
  };

  return (
    <div className="app">
      {gameSetup && gameSetup.gameStarted ? (
        <>
          <Board boardPosition={boardPosition} />
          <div className="app__actions">
            {winner !== null && <p className="app__winner">{gameSetup.players[winner]} wins!</p>}
            <PlayerList players={gameSetup.players} activePlayer={activePlayer} />
            <DiceGroup movePiece={movePiece} activePlayer={activePlayer} rollDisabled={rollDisabled} />
            {message !== null && <p className="app__message">{message}</p>}
          </div>
        </>
      ) : (
        <GameSetup startGame={startGame} />
      )}
    </div>
  );
}

export default App;
