import React from "react";
import styles from './People.module.css'
import { useDispatch } from "react-redux";
import { clear, drawCard, nextMove, setPeople } from "../../redux/people-reducer";
import {
  PeopleWithStrengthType,
  CurrentTurnType,
  PlayersType,
  CardNamesType,
  CardType
} from "../../types/types";
import Gameover from "./Gameover/Gameover";
import Player from "./Player/Player";

type PropsType = {
  PeopleWithStrength: Array<PeopleWithStrengthType>
  currentTurn: CurrentTurnType
  isGameOver: boolean
  isNoStrength: boolean
  isNewGame: boolean
  CardNames: CardNamesType
  cardsMap: CardType
  players: PlayersType
}

const People: React.FC<PropsType> = ({
  currentTurn,
  isGameOver,
  isNoStrength,
  PeopleWithStrength,
  CardNames,
  cardsMap,
  players,
  isNewGame,
}) => {

  let dispatch = useDispatch();
  if (PeopleWithStrength.length === 0) return null

  const cardNamesLength = Object.keys(CardNames).length

  const onDrawCardButtonClick = () => {
    let rand: number = Math.floor(Math.random() * cardNamesLength);
    const currentCardName = Object.values(CardNames)[rand]
    if (!isGameOver) {
      dispatch(drawCard(currentCardName))
    }
  };

  const onNextMoveButtonClick = () => {
    dispatch(nextMove())
  }
  const onClearButtonClick = () => {
    dispatch(clear())
    dispatch(setPeople())
  }
  return (
    <div className={styles.main_content}>
      <div className={styles.game_content}>
        <div className={styles.header}>
          <div className={styles.info}>
            <div>{"Очки игрока №1: " + players["1"].strength}</div>
            <div>{"Очки игрока №2: " + players["2"].strength}</div>
            {!isGameOver && <div id="playerInfo">{"Карту тянет игрок №: " + (currentTurn.player)}</div>}
            {isGameOver && <Gameover player1Score={players["1"].strength} player2Score={players["2"].strength} cardNamesLength={cardNamesLength} />}
          </div>
          <div className={styles.navbar}>
            <button
              disabled={isGameOver}
              id="draw_card"
              onClick={onDrawCardButtonClick}>
              Вытянуть карту
            </button>
          </div>
          <div>
            <button
              disabled={isGameOver || isNoStrength}
              onClick={() => {
                onNextMoveButtonClick();
              }}
            >
              Закончить ход
            </button>
          </div>
          <div>
            <button
              disabled={isNewGame}
              onClick={() => {
                onClearButtonClick();
              }}
            >
              Начать заново
            </button>
          </div>
        </div>

        <div className={styles.players}>
          <Player players={players} playerNumber="1" cardsMap={cardsMap} />
          <Player players={players} playerNumber="2" cardsMap={cardsMap} />
        </div>
      </div>
      <div className={styles.cardNames}>{Object.values(CardNames).map(CardName => <div className={styles.cardNames_Item}>{CardName}</div>)}</div>
    </div >
  );
};

export default People;