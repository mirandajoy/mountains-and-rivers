import { useState, useContext } from "react";
import "./SetupGameType.scss";
import { SocketsContext } from "../../context/SocketsContext.tsx";

function SetupGameType({
  soloGame,
  setSoloGame,
}: {
  soloGame: boolean | null;
  setSoloGame: (soloGame: boolean) => void;
}) {
  const [joinRoomValue, setJoinRoomValue] = useState<any>("");
  const { socket } = useContext(SocketsContext);

  const handleRoomJoin = () => {
    socket.emit("createRoom");
  };

  const handleJoin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const roomId = parseInt(joinRoomValue);
    socket.emit("joinRoom", roomId);
  };

  return (
    <div className="game-type">
      <fieldset className="create-game">
        <legend className="create-game__label">Do you want to play alone or with friends?</legend>
        <div className="create-game__options-container">
          <div className="create-game__option-container">
            <input
              type="radio"
              id="solo"
              name="solo"
              checked={soloGame === true}
              value="solo"
              onChange={() => {
                setSoloGame(true);
                handleRoomJoin();
              }}
              className="create-game__option-input"
            />
            <label htmlFor="solo" className="create-game__option-label">
              Play Alone
            </label>
          </div>
          <div className="create-game__option-container">
            <input
              type="radio"
              id="friends"
              name="friends"
              checked={soloGame === false}
              value="friends"
              onChange={() => {
                setSoloGame(false);
                handleRoomJoin();
              }}
              className="create-game__option-input"
            />
            <label htmlFor="friends" className="create-game__option-label">
              Play with Friends
            </label>
          </div>
        </div>
      </fieldset>
      <form id="join" className="join-game" onSubmit={handleJoin}>
        <div className="join-game__input-container">
          <label htmlFor="name" className="join-game__label">
            Join an existing game
          </label>
          <input
            id="game"
            name="game"
            placeholder="Enter 4-digit game id"
            className="join-game__input"
            value={joinRoomValue}
            onChange={(e) => setJoinRoomValue(e.target.value)}
          />
        </div>
        <button type="submit">Join</button>
      </form>
    </div>
  );
}

export default SetupGameType;
