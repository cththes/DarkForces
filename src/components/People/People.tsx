import React from "react";
import styles from './People.module.css'
import { useDispatch } from "react-redux";
import { clear, deleteCard, drawCard, minusPoints, nextMove, setPeople } from "../../redux/people-reducer";
import { AllCardsType, PeopleWithStrengthType } from "../../types/types";

type PropsType = {
  StrengthPoints: Array<number>
  onHandCards: Array<number>
  AllCards: AllCardsType
  playerCardSum: Array<Number>
  deckCardSum: Array<Array<Number>>
  PeopleWithStrength: PeopleWithStrengthType
  CardNames: Array<string>
  DeckCardNumber: any,
  PlayerNumber: any,
}

const People: React.FC<PropsType> = ({
  StrengthPoints,
  onHandCards,
  AllCards,
  playerCardSum,
  deckCardSum,
  PeopleWithStrength,
  CardNames,
  DeckCardNumber,
  PlayerNumber,
}) => {

  let rand: number = Math.floor(Math.random() * StrengthPoints.length);
  let currentCard: number = StrengthPoints[rand];
  const sumOfCurrentHandCards: number = AllCards[PlayerNumber][DeckCardNumber].reduce((acc, number) => acc + number, 0);


  let dispatch = useDispatch();
  const onDrawCardButtonClick = (currentCard: number) => {
    if (isFinite(currentCard)) {
      if (sumOfCurrentHandCards <= 21) {
        dispatch(drawCard(currentCard));
        dispatch(deleteCard(rand))
        if (sumOfCurrentHandCards + currentCard >= 21) {
          if (sumOfCurrentHandCards + currentCard > 21) {
            dispatch(minusPoints())
          }
          dispatch(nextMove())

        }
      }
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
      <div className={styles.header}>
        <div className={styles.info}>
          <div>{"Очки игрока №1: " + playerCardSum[0]}</div>
          <div>{"Очки игрока №2: " + playerCardSum[1]}</div>
          { }
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
        <div>
          <button
            onClick={() => {
              onClearButtonClick();
            }}
          >
            Начать заново
          </button>
        </div>
      </div>
      <div className={styles.CardDecks}>
        {AllCards.map(player => player.map(deck => (
          <div className={styles.player}>
            Колода {player.indexOf(deck) + 1 + " "}
            игрока {AllCards.indexOf(player) + 1 + " : " + deckCardSum[AllCards.indexOf(player)][player.indexOf(deck)]}
            {deck.map(card => <div className={styles.deck}>
              {CardNames[card]} {card}
            </div>)}
            {/*sumOfNumbers > 21 && <div className={styles.bust}>перебор</div>*/}
          </div>
        )
        ))
        }
      </div>
    </div >
  );
};

export default People;