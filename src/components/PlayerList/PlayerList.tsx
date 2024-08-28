import { useState } from "react";
import "./PlayerList.scss";

interface Token {
  shape: string[];
  color: string[];
}

function PlayerList({ players, activePlayer, yourId }: { players: string[]; activePlayer: number; yourId: number }) {
  const tokens: Token = {
    shape: ["eco", "spa", "psychiatry", "potted_plant"],
    color: ["option-1", "option-2", "option-3", "option-4"],
  };

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
                  {i === yourId ? "Your Turn" : `${player}'s turn`}
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
