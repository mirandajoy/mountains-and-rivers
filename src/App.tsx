import { useContext, useEffect, useState } from "react";
import Board from "./components/Board/Board";
import DiceGroup from "./components/DiceGroup/DiceGroup";
import GameSetup from "./components/GameSetup/GameSetup";
import PlayerList from "./components/PlayerList/PlayerList";
import useSessionStorage from "./hooks/useSessionStorage.tsx";
import { ladderSpaces } from "./utils/calcLadderPos.ts";
import { snakeSpaces } from "./utils/calcSnakePos.ts";
import { SocketsContext } from "./context/SocketsContext.tsx";

import "./App.scss";

interface PlayerPosition {
  [key: number]: number;
}

interface GameSetup {
  players: string[];
  gameStarted: boolean;
}

function App() {
  const [gameSetup, setGameSetup] = useSessionStorage("gameStatus", "");
  const [boardPosition, setBoardPosition] = useSessionStorage("boardPosition", "");
  const [activePlayer, setActivePlayer] = useSessionStorage("activePlayer", 0);
  const [winner, setWinner] = useSessionStorage("winner", null);
  const [message, setMessage] = useSessionStorage("winner", null);

  const [rollDisabled, setRollDisabled] = useState<boolean>(false);
  const { socket } = useContext(SocketsContext);

  const startGame = (player: string) => {
    socket.emit("gameSetup", {
      players: [player, "The Guide"],
      gameStarted: true,
    });
    socket.emit("boardPosition", { 0: 1, 1: 1 });
    socket.emit("activePlayer", 0);
  };

  const restartGame = (player?: string) => {
    player ? startGame(player) : socket.emit("gameSetup", "");
    setRollDisabled(false);
    socket.emit("winner", null);
    socket.emit("message", null);
  };

  function changePlayer() {
    socket.emit("activePlayer", activePlayer === 0 ? 1 : 0);
  }

  const movePiece = (distance: number, player: number) => {
    const newPos: number = boardPosition[player as keyof PlayerPosition] + distance;
    setRollDisabled(true);
    newPos >= 100 && socket.emit("winner", player);
    setTimeout(function () {
      const pos = newPos < 100 ? newPos : 100;
      socket.emit("boardPosition", {
        ...boardPosition,
        [player]: pos,
      });
    }, 1000);
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
    ladder !== undefined && socket.emit("message", `${gameSetup.players[player]} climbs up a mountain`);
    ladder !== undefined &&
      setTimeout(function () {
        socket.emit("boardPosition", {
          ...boardPosition,
          [player]: ladder.endSq,
        });
        setTimeout(function () {
          socket.emit("message", null);
        }, 500);
      }, 2000);
    snake !== undefined && socket.emit("message", `${gameSetup.players[player]} slides down a river`);
    snake !== undefined &&
      setTimeout(function () {
        socket.emit("boardPosition", {
          ...boardPosition,
          [player]: snake.startSq,
        });
        setTimeout(function () {
          socket.emit("message", null);
        }, 500);
      }, 2000);
  };

  useEffect(() => {
    socket.on("gameSetup", (setupDetails: GameSetup) => {
      setGameSetup(setupDetails);
    });

    socket.on("boardPosition", (positionDetails: PlayerPosition[]) => {
      setBoardPosition(positionDetails);
    });

    socket.on("winner", (winner: number | null) => {
      setWinner(winner);
    });

    socket.on("activePlayer", (player: number | null) => {
      setActivePlayer(player);
    });

    socket.on("message", (message: string | null) => {
      setMessage(message);
    });
  }, [socket]);

  return (
    <div className="app">
      {gameSetup && gameSetup.gameStarted ? (
        <>
          <Board boardPosition={boardPosition} />
          <div className="app__actions">
            <div className="app__actions-primary">
              {winner !== null && <p className="app__winner">{gameSetup.players[winner]} wins!</p>}
              <PlayerList players={gameSetup.players} activePlayer={activePlayer} />
              <DiceGroup movePiece={movePiece} activePlayer={activePlayer} rollDisabled={rollDisabled} />
              {message !== null && <p className="app__message">{message}</p>}
            </div>
            <div className="app__actions-secondary">
              <button onClick={() => restartGame(gameSetup.players[0])}>Restart</button>
              <button onClick={() => restartGame()}>New Game</button>
            </div>
          </div>
        </>
      ) : (
        <GameSetup startGame={startGame} />
      )}
    </div>
  );
}

export default App;
