import { useState } from "react";
import "./PlayerList.scss";

interface Token {
  shape: string[];
  color: string[];
}

function PlayerList({ players, activePlayer }: { players: string[]; activePlayer: number }) {
  const tokens: Token = { shape: ["eco", "spa"], color: ["option-1", "option-2"] };

  return (
    <div className="players">
      <ul className="players__list">
        {players.map((player, i) => {
          return (
            <li key={i} className="players__item">
              <div className="players__name-container">
                <div className={`players__token-container players__token-container--${tokens.color[i]}`}>
                  <span className="material-symbols-outlined players__token">{tokens.shape[i]}</span>
                </div>
                <span className="players__name">{player}</span>
              </div>
              {activePlayer === i && (
                <span className={`players__active-tag players__active-tag--${tokens.color[i]}`}>
                  {i === 0 ? "Your Turn" : `${player}'s turn`}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PlayerList;
