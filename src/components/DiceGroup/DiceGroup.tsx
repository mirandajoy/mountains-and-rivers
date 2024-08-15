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

function DiceGroup({
  movePiece,
  activePlayer,
  rollDisabled,
}: {
  movePiece: (distance: number, player: number) => void;
  activePlayer: number;
  rollDisabled: boolean;
}) {
  const [diceResult, setDiceResult] = useSessionStorage("diceResult", { dieA: 3, dieB: 5, total: null });
  const { socket } = useContext(SocketsContext);

  const rollDice = () => {
    const a: number = Math.ceil(Math.random() * 6);
    const b: number = Math.ceil(Math.random() * 6);
    socket.emit("diceRoll", { dieA: a, dieB: b, total: a + b });
    movePiece(a + b, activePlayer);
  };

  useEffect(() => {
    activePlayer === 1 && rollDice();
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
          <button onClick={() => rollDice()} className="dice-group__roll-btn">
            Roll the Dice
          </button>
        )}
        {rollDisabled && diceResult.total && (
          <div className="dice-group__result">
            {activePlayer === 0 ? `You rolled a ${diceResult.total}` : `The guide rolled a ${diceResult.total}`}
          </div>
        )}
      </div>
    </div>
  );
}

export default DiceGroup;
