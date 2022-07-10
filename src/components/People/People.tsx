import React from "react";
import styles from './People.module.css'
import { useDispatch } from "react-redux";
import { drawCard, minusPoints, nextMove } from "../../redux/people-reducer";
import { AllCardsType } from "../../types/types";

type PropsType = {
  StrengthPoints: Array<number>
  onHandCards: Array<number>
  AllCards: AllCardsType
  playerCardSum: Array<Number>
  deckCardSum: Array<Array<Number>>
}

const People: React.FC<PropsType> = ({
  StrengthPoints,
  onHandCards,
  AllCards,
  playerCardSum,
  deckCardSum }) => {

  let rand: number = Math.floor(Math.random() * StrengthPoints.length);
  let currentCard: number = StrengthPoints[rand];
  const sumOfNumbers: number = onHandCards.reduce((acc, number) => acc + number, 0);
  let deckSum = sumOfNumbers


  let dispatch = useDispatch();
  const onDrawCardButtonClick = (currentCard: number) => {
    if (isFinite(currentCard)) {
      if (sumOfNumbers <= 21) {
        dispatch(drawCard(currentCard));
        if (sumOfNumbers + currentCard > 21) {
          dispatch(minusPoints())
          dispatch(nextMove())
        }
      }
    }
  };

  const onNextMoveButtonClick = () => {
    dispatch(nextMove())
  }
  console.log(deckCardSum)
  return (
    <div className={styles.main_content}>
      <div className={styles.header}>
        <div className={styles.info}>
          <div>{"Очки игрока №1: " + playerCardSum[0]}</div>
          <div>{"Очки игрока №2: " + playerCardSum[1]}</div>
        </div>
        <div className={styles.navbar}>
          <button
            onClick={() => {
              onDrawCardButtonClick(currentCard);
            }}
          >
            Вытянуть карту
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              onNextMoveButtonClick();
            }}
          >
            Закончить ход
          </button>
        </div>
      </div>
      <div className={styles.CardDecks}>
        {AllCards.map(player => player.map(deck => (
          <div className={styles.player}>
            Колода {player.indexOf(deck) + 1 + " "}
            игрока {AllCards.indexOf(player) + 1 + " : " + deckCardSum[AllCards.indexOf(player)][player.indexOf(deck)]}
            {deck.map(card => <div className={styles.deck}>
              {card}
            </div>)}
            {deckSum > 21 && <div className={styles.bust}>перебор</div>}
          </div>
        )
        ))
        }
      </div>
    </div >
  );
};

export default People;