import { useState } from "react";
import "./GameSetup.scss";

function GameSetup({ startGame }: { startGame: (player: string) => void }) {
  const [newPlayer, setNewPlayer] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startGame(newPlayer);
  }

  return (
    <form id="setup" className="setup" onSubmit={handleSubmit}>
      <label className="setup__label">Enter your name</label>
      <input name="name" className="setup__input" value={newPlayer} onChange={(e) => setNewPlayer(e.target.value)} />
      <button type="submit">Start</button>
    </form>
  );
}

export default GameSetup;
