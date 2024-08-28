import { useState, useContext, useEffect } from "react";
import useSessionStorage from "../../hooks/useSessionStorage";
import { SocketsContext } from "../../context/SocketsContext.tsx";

import "./PlayerSetup.scss";

function PlayerSetup({
  soloGame,
  gameRoom,
  startGame,
  setYourName,
}: {
  soloGame: boolean | null;
  startGame: (player: string[], soloGame: boolean | null) => void;
  gameRoom: number;
  setYourName: (soloGame: string) => void;
}) {
  const [newPlayer, setNewPlayer] = useState<string>("");
  const [playerList, setPlayerList] = useSessionStorage("playerList", null);
  const { socket } = useContext(SocketsContext);

  const handleJoin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setYourName(newPlayer);
    const list = playerList !== null ? [...playerList, newPlayer] : [newPlayer];
    socket.emit("playerList", list, gameRoom);
    soloGame === true && startGame(list, soloGame);
  };

  const handleStart = () => {
    startGame(playerList, soloGame);
  };

  useEffect(() => {
    socket.on("playerList", (list: string[]) => {
      setPlayerList(list);
    });

    socket.on("getPlayerList", () => {
      socket.emit("playerList", playerList, gameRoom);
    });
  }, [socket]);

  return (
    <div className="player-setup">
      <form id="join" className="join-form" onSubmit={handleJoin}>
        <div className="join-form__input-container">
          <label htmlFor="name" className="join-form__label">
            Enter your name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Your Name"
            className="join-form__input"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
          />
        </div>
        <button type="submit" className="join-form__button">
          {soloGame ? "Start Game" : "Join"}
        </button>
      </form>

      {!soloGame && (
        <>
          <div className="player-management">
            <h3 className="player-management__list-header">Players Joined</h3>
            {playerList === null && <p className="player-management__empty">Waiting for players to join</p>}
            <ul className="player-management__list-container">
              {playerList !== null &&
                playerList.map((player: string, i: number) => {
                  return (
                    <li className="player-management__list-item" key={i}>
                      {player}
                    </li>
                  );
                })}
            </ul>
            <p className="player-management__share-code">Share this code: {gameRoom}</p>
          </div>
          <button type="button" onClick={handleStart} className="player-setup__start-action">
            Start Game
          </button>
        </>
      )}
    </div>
  );
}

export default PlayerSetup;
