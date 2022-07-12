import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import People from "./People";
import { getAllCards, getCardDeckNumber, getDeckCardSum, getIsGameOver, getPeople, getPlayerCardSum, getPlayerNumber, getSumOfCurrentCards } from "../../redux/people-selector";
import { setAllPeople, requestPeople, setPeople } from "../../redux/people-reducer";
import { RequestPeopleResultsType } from "../../types/types";

const PeopleContainer = () => {
  const dispatch = useDispatch();
  const PeopleObject = useSelector((state) => getPeople(state));
  const AllCards = useSelector((state) => getAllCards(state))
  const playerCardSum = useSelector((state) => getPlayerCardSum(state))
  const deckCardSum = useSelector((state) => getDeckCardSum(state))
  const DeckCardNumber = useSelector((state) => getCardDeckNumber(state))
  const PlayerNumber = useSelector((state) => getPlayerNumber(state))
  const isGameOver = useSelector((state) => getIsGameOver(state))
  const sumOfCurrentHandCards = useSelector((state) => getSumOfCurrentCards(state))

  useEffect(() => {
    if (PeopleObject.AllPeople.length === 0) {
      requestPeople().then((responses) => {
        let results: Array<RequestPeopleResultsType> = [];
        responses.forEach((page) => {
          results = [...results, ...page.data.results];
        });
        dispatch(setAllPeople(results));
        dispatch(setPeople())
      });
    }

  }, []);
  return <People
    StrengthPoints={PeopleObject.StrengthPoints}
    PeopleWithStrength={PeopleObject.PeopleWithStrength}
    CardNames={PeopleObject.CardNames}
    AllCards={AllCards}
    playerCardSum={playerCardSum}
    deckCardSum={deckCardSum}
    DeckCardNumber={DeckCardNumber}
    PlayerNumber={PlayerNumber}
    isGameOver={isGameOver}
    sumOfCurrentHandCards={sumOfCurrentHandCards}
  />;
};

export default PeopleContainer;
