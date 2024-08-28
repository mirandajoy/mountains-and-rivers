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
  soloGame: boolean;
}

function App() {
  const [gameRoom, setGameRoom] = useSessionStorage("room", "");
  const [gameSetup, setGameSetup] = useSessionStorage("gameStatus", "");
  const [boardPosition, setBoardPosition] = useSessionStorage("boardPosition", "");
  const [activePlayer, setActivePlayer] = useSessionStorage("activePlayer", 0);
  const [winner, setWinner] = useSessionStorage("winner", null);
  const [message, setMessage] = useSessionStorage("message", null);
  const [yourName, setYourName] = useSessionStorage("yourName", null);
  const [rollDisabled, setRollDisabled] = useState<boolean>(false);
  const { socket } = useContext(SocketsContext);
  const yourId = gameSetup.players && gameSetup.players.indexOf(yourName);

  const startGame = (players: string[], soloGame: boolean | null) => {
    const playerList: string[] = soloGame ? [...players, "The Guide"] : players;
    const boardPosition = playerList.reduce((acc: any, cur, index: any) => {
      acc[index] = 1;
      return acc;
    }, {});

    socket.emit(
      "gameSetup",
      {
        players: playerList,
        gameStarted: true,
        soloGame: soloGame,
      },
      gameRoom
    );
    socket.emit("boardPosition", boardPosition, gameRoom);
    socket.emit("activePlayer", 0, gameRoom);
  };

  const restartGame = (player?: string[]) => {
    const playerList = player && gameSetup.soloGame ? [player[0]] : player;
    console.log(!!playerList);
    !!playerList ? startGame(playerList, gameSetup.soloGame) : socket.emit("resetRoom", gameRoom);
    setRollDisabled(false);
    socket.emit("winner", null, gameRoom);
    socket.emit("message", null, gameRoom);
  };

  function changePlayer() {
    const newActivePlayer = activePlayer === gameSetup.players.length - 1 ? 0 : activePlayer + 1;
    socket.emit("activePlayer", newActivePlayer, gameRoom);
  }

  const movePiece = (distance: number, player: number) => {
    const newPos: number = boardPosition[player as keyof PlayerPosition] + distance;
    setRollDisabled(true);
    newPos >= 100 && socket.emit("winner", player, gameRoom);
    setTimeout(function () {
      const pos = newPos < 100 ? newPos : 100;
      socket.emit(
        "boardPosition",
        {
          ...boardPosition,
          [player]: pos,
        },
        gameRoom
      );
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
    ladder !== undefined && socket.emit("message", `${gameSetup.players[player]} climbs up a mountain`, gameRoom);
    ladder !== undefined &&
      setTimeout(function () {
        socket.emit(
          "boardPosition",
          {
            ...boardPosition,
            [player]: ladder.endSq,
          },
          gameRoom
        );
        setTimeout(function () {
          socket.emit("message", null, gameRoom);
        }, 500);
      }, 2000);
    snake !== undefined && socket.emit("message", `${gameSetup.players[player]} slides down a river`, gameRoom);
    snake !== undefined &&
      setTimeout(function () {
        socket.emit(
          "boardPosition",
          {
            ...boardPosition,
            [player]: snake.startSq,
          },
          gameRoom
        );
        setTimeout(function () {
          socket.emit("message", null, gameRoom);
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

    socket.on("joinRoom", (roomId: number) => {
      setGameRoom(roomId);
    });

    socket.on("resetRoom", () => {
      console.log("Test");
      sessionStorage.clear();
      setGameSetup("");
      setGameRoom("");
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
              <PlayerList players={gameSetup.players} activePlayer={activePlayer} yourId={yourId} />
              <DiceGroup
                movePiece={movePiece}
                activePlayer={activePlayer}
                rollDisabled={rollDisabled}
                gameRoom={gameRoom}
                gameSetup={gameSetup}
                yourId={yourId}
              />
              {message !== null && <p className="app__message">{message}</p>}
            </div>
            <div className="app__actions-secondary">
              <button onClick={() => restartGame(gameSetup.players)}>Restart</button>
              <button onClick={() => restartGame()}>New Game</button>
            </div>
          </div>
        </>
      ) : (
        <GameSetup startGame={startGame} gameRoom={gameRoom} setYourName={setYourName} />
      )}
    </div>
  );
}

export default App;
