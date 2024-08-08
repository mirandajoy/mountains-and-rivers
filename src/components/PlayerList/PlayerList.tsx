import { useState } from "react";
import "./PlayerList.scss";

function PlayerList() {
  const players: string[] = ["Player 1", "Player 2"];
  const [activePlayer, setActivePlayer] = useState<number>(0);

  function changePlayer() {
    setActivePlayer((prevPlayer) => (prevPlayer === players.length - 1 ? 0 : prevPlayer + 1));
  }

  return (
    <div className="players">
      <ul className="players__list">
        {players.map((player, i) => {
          return (
            <li key={i} className="players__item">
              <span className="players__name">{player}</span>
              {activePlayer === i && <span className="players__active-tag">Your Turn</span>}
            </li>
          );
        })}
      </ul>
      <button onClick={() => changePlayer()}>Complete Turn</button>
    </div>
  );
}

export default PlayerList;
