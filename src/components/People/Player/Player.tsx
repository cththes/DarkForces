import React from "react";
import { PlayersType, CardType } from "../../../types/types";
import styles from "./Player.module.css";

type PropsType = {
  players: PlayersType,
  playerNumber: string,
  cardsMap: CardType,
};

const Player: React.FC<PropsType> = ({ players, playerNumber, cardsMap }) => {
  const playerTurns = Object.values(players[playerNumber].turns);
  return (
    <div className={styles.player}>
      {playerTurns.map((turn) => {
        return (
          <div>
            <div className={styles.deck}>
              <strong>Игрок {playerNumber}</strong>
            </div>
            <div className={turn.strength === 10 ? styles.powerLevelText10 : styles.powerLevelText}>Уровень силы хода: {turn.strength}</div>
            <div>
              {turn.cards.map((card) => {
                return (
                  <div className={styles.card_item}>
                    {card} {cardsMap[card].strength}
                  </div>
                );
              })}
              {turn.strength === 1 && turn.cards.length > 1 && (
                <div className={styles.bust}>{"Перебор " + turn.bust}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Player;
