import React from "react";
import styles from './People.module.css'
import { useDispatch } from "react-redux";
import { drawCard, nextMove } from "../../redux/people-reducer";

type PropsType = {
  StrengthPoints: Array<number>
  onHandCards: Array<number>
  currentCardDeckNumber: number
  currentPlayerNumber: number
}

const People: React.FC<PropsType> = ({ StrengthPoints, onHandCards, currentCardDeckNumber, currentPlayerNumber }) => {

  let rand: number = Math.floor(Math.random() * StrengthPoints.length);
  let currentCard: number = StrengthPoints[rand];
  const sumOfNumbers: number = onHandCards.reduce((acc, number) => acc + number, 0);

  let dispatch = useDispatch();
  const onDrawCardButtonClick = (currentCard: number) => {
    if (isFinite(currentCard)) {
      if (sumOfNumbers <= 21) {
        dispatch(drawCard(currentCard));
        if (sumOfNumbers + currentCard > 21) {
          alert(sumOfNumbers + "перебор")
          dispatch(nextMove())
        }
      }
      /*if (sumOfNumbers + currentCard > 21) {
        alert(sumOfNumbers + currentCard + " перебор");
      }*/
    }
  };

  const onNextMoveButtonClick = () => {
    dispatch(nextMove())
  }

  return (
    <div>
      <div>
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
      <span>Колода №{currentCardDeckNumber} игрока №{currentPlayerNumber}: {sumOfNumbers}</span>
      <div className={styles.CardDecks}>
        {onHandCards.map((el) => (
          <div className={styles.CardDeck}>
            {el}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
