import { useContext, useEffect } from "react";
import useSessionStorage from "../../hooks/useSessionStorage.tsx";
import Dice from "../Dice/Dice";
import "./DiceGroup.scss";
import { SocketsContext } from "../../context/SocketsContext.tsx";

interface DiceResults {
  dieA: number;
  dieB: number;
  total: number | null;
}

interface GameSetup {
  players: string[];
  gameStarted: boolean;
  soloGame: boolean;
}

function DiceGroup({
  movePiece,
  activePlayer,
  rollDisabled,
  gameRoom,
  gameSetup,
  yourId,
}: {
  movePiece: (distance: number, player: number) => void;
  activePlayer: number;
  rollDisabled: boolean;
  gameRoom: number;
  gameSetup: GameSetup;
  yourId: number;
}) {
  const [diceResult, setDiceResult] = useSessionStorage("diceResult", { dieA: 3, dieB: 5, total: null });
  const { socket } = useContext(SocketsContext);

  const rollDice = () => {
    const a: number = Math.ceil(Math.random() * 6);
    const b: number = Math.ceil(Math.random() * 6);
    socket.emit("diceRoll", { dieA: a, dieB: b, total: a + b }, gameRoom);
    movePiece(a + b, activePlayer);
  };

  useEffect(() => {
    gameSetup.soloGame && activePlayer === 1 && rollDice();
    socket.on("diceRoll", (rollValues: DiceResults) => {
      setDiceResult(rollValues);
    });
  }, [activePlayer, socket]);

  return (
    <div className="dice-group">
      <div className="dice-group__dice-container">
        <Dice rolledNum={diceResult.dieA} />
        <Dice rolledNum={diceResult.dieB} />
      </div>
      <div className="dice-group__text-container">
        {!rollDisabled && (
          <button
            onClick={() => rollDice()}
            className={`dice-group__roll-btn ${activePlayer !== yourId ? "dice-group__roll-btn--disabled" : ""}`}
            disabled={activePlayer !== yourId}
          >
            Roll the Dice
          </button>
        )}
        {rollDisabled && diceResult.total && (
          <div className="dice-group__result">
            {activePlayer === yourId
              ? `You rolled a ${diceResult.total}`
              : `${gameSetup.players[activePlayer]} rolled a ${diceResult.total}`}
          </div>
        )}
      </div>
    </div>
  );
}

export default DiceGroup;
