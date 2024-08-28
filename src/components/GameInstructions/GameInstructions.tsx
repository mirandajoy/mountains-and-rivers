import "./GameInstructions.scss";

function GameInstructions() {
  return (
    <div className="instructions">
      <h2 className="instructions__header">Take a journey with our guide or with friends</h2>
      <p className="instructions__body">Roll the dice to make progress on the board.</p>
      <p className="instructions__body">
        If you land at the bottom of a mountain you will climb it to hasten your journey.
      </p>
      <p className="instructions__body">
        If you land atop a river you will drift back down and repeat part of your journey.
      </p>
      <p className="instructions__body">To achieve success reach the end before your guide or your friends.</p>
    </div>
  );
}

export default GameInstructions;
