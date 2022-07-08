import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawCard } from "../../redux/people-reducer";
import { getCards } from "../../redux/people-selector";

const People = ({ StrengthPoints }) => {
  let onHandCards = useSelector((state) => getCards(state));
  let rand = Math.floor(Math.random() * StrengthPoints.length);
  let currentCard = StrengthPoints[rand];
  const sumOfNumbers = onHandCards.reduce((acc, number) => acc + number, 0);

  let dispatch = useDispatch();
  const onButtonClick = (currentCard) => {
    if (isFinite(currentCard)) {
      if (sumOfNumbers + currentCard <= 21) {
        dispatch(drawCard(currentCard));
      } else alert(sumOfNumbers + currentCard + " перебор");
      /*if (sumOfNumbers + currentCard > 21) {
        alert(sumOfNumbers + currentCard + " перебор");
      }*/
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          onButtonClick(currentCard);
        }}
      >
        Вытянуть карту
      </button>
      <span>Сумма: {sumOfNumbers}</span>
      <div>
        {onHandCards.map((el) => (
          <div>
            {el}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
