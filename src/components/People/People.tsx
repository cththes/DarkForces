import React from "react";
import styles from './People.module.css'
import { useDispatch } from "react-redux";
import { clear, deleteCard, drawCard, nextMove, setPeople } from "../../redux/people-reducer";
import { AllCardsType, PeopleWithStrengthType, CurrentCardType } from "../../types/types";
import Gameover from "./Gameover/Gameover";

type PropsType = {
  StrengthPoints: Array<number>
  AllCards: AllCardsType
  playerCardSum: Array<Number>
  deckCardSum: Array<Array<Number>>
  PeopleWithStrength: PeopleWithStrengthType
  CardNames: Array<string>
  DeckCardNumber: any,
  PlayerNumber: any,
  isGameOver: boolean,
  sumOfCurrentHandCards: number,
}

const People: React.FC<PropsType> = ({
  StrengthPoints,
  AllCards,
  playerCardSum,
  deckCardSum,
  PlayerNumber,
  isGameOver,
  PeopleWithStrength
}) => {

  let rand: number = Math.floor(Math.random() * StrengthPoints.length);
  let currentCard = {} as any
  currentCard.Points = StrengthPoints[rand]
  currentCard.Name = PeopleWithStrength[rand].name
  let dispatch = useDispatch();


  const onDrawCardButtonClick = (currentCard: CurrentCardType) => {
    if (isFinite(currentCard.Points)) {
      dispatch(drawCard(currentCard))
      dispatch(deleteCard(rand))
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
          <div>{"Карту тянет игрок №: " + (PlayerNumber + 1)}</div>
          {isGameOver && <Gameover playerCardSum={playerCardSum} />}
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
              {card.Name} {card.Points}
            </div>)}
            {deckCardSum[AllCards.indexOf(player)][player.indexOf(deck)] > 21 && <div className={styles.bust}>Перебор</div>}
          </div>
        )
        ))
        }
      </div>
    </div >
  );
};

export default People;