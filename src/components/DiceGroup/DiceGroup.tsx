import { useState } from "react";
import "./DiceGroup.scss";
import Dice from "../Dice/Dice";

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
  const [diceResult, setDiceResult] = useState<DiceResults>({ dieA: 3, dieB: 5, total: null });

  const rollDice = () => {
    const a: number = Math.ceil(Math.random() * 6);
    const b: number = Math.ceil(Math.random() * 6);
    setDiceResult({ dieA: a, dieB: b, total: a + b });
    movePiece(a + b, activePlayer);
  };

  return (
    <div className="dice-group">
      <div className="dice-group__dice-container">
        <Dice rolledNum={diceResult.dieA} />
        <Dice rolledNum={diceResult.dieB} />
      </div>

      {!rollDisabled && <button onClick={() => rollDice()} className="dice-group__roll-btn">
        Roll the Dice
      </button>}
      {rollDisabled && diceResult.total && <div className="dice-group__result">You rolled a {diceResult.total}</div>}
    </div>
  );
}

export default DiceGroup;
