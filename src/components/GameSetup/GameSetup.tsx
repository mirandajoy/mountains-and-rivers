import { useState } from "react";
import bg from "../../assets/setup-bg.jpg";
import "./GameSetup.scss";
import SetupGameType from "../SetupGameType/SetupGameType.tsx";
import PlayerSetup from "../PlayerSetup/PlayerSetup.tsx";

function GameSetup({
  startGame,
  gameRoom,
  setYourName,
}: {
  startGame: (player: string[], soloGame: boolean | null) => void;
  gameRoom: number;
  setYourName: (soloGame: string) => void;
}) {
  const [soloGame, setSoloGame] = useState<boolean | null>(null);

  return (
    <div className="setup">
      <div className="setup__header-container">
        <img className="setup__header-img" src={bg} />
        <h1 className="setup__header">Zen Trails</h1>
      </div>
      {!gameRoom && <SetupGameType soloGame={soloGame} setSoloGame={setSoloGame} />}
      {gameRoom && (
        <PlayerSetup soloGame={soloGame} startGame={startGame} gameRoom={gameRoom} setYourName={setYourName} />
      )}
    </div>
  );
}

export default GameSetup;
