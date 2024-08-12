import { useState } from "react";
import bg from "../../assets/setup-bg.jpg";
import "./GameSetup.scss";

function GameSetup({ startGame }: { startGame: (player: string) => void }) {
  const [newPlayer, setNewPlayer] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startGame(newPlayer);
  };

  return (
    <div className="setup">
      <div className="setup__header-container">
        <img className="setup__header-img" src={bg} />
        <h1 className="setup__header">Mountains and Rivers</h1>
      </div>
      <form id="setup" className="setup__form" onSubmit={handleSubmit}>
        <label className="setup__label">Enter your name</label>
        <input name="name" className="setup__input" value={newPlayer} onChange={(e) => setNewPlayer(e.target.value)} />
        <button type="submit">Start</button>
      </form>
      <div className="setup__welcome">
        <h2 className="setup__subheader">Take a journey with our guide</h2>
        <p className="setup__body">Roll the dice to make progress on the board.</p>
        <p className="setup__body">If you land at the bottom of a mountain you will climb it to hasten your journey.</p>
        <p className="setup__body">
          If you land atop a river you will drift back down and repeat part of your journey.
        </p>
        <p className="setup__body">To achieve success reach the end before your guide.</p>
      </div>
    </div>
  );
}

export default GameSetup;
