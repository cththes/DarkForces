import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import People from "./People";
import { getAllCards, getCardDeckNumber, getCards, getDeckCardSum, getPeople, getPlayerCardSum, getPlayerNumber, getState } from "../../redux/people-selector";
import { setAllPeople, requestPeople, setPeople } from "../../redux/people-reducer";
import { RequestPeopleResultsType } from "../../types/types";
import { peopleAPI } from "../../api/api";

const PeopleContainer = () => {
  let state = useSelector((state) => getState(state))
  let dispatch = useDispatch();
  let PeopleObject = useSelector((state) => getPeople(state));
  let onHandCards = useSelector((state) => getCards(state));
  let AllCards = useSelector((state) => getAllCards(state))
  let playerCardSum = useSelector((state) => getPlayerCardSum(state))
  let deckCardSum = useSelector((state) => getDeckCardSum(state))
  let DeckCardNumber = useSelector((state) => getCardDeckNumber(state))
  let PlayerNumber = useSelector((state) => getPlayerNumber(state))
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
    onHandCards={onHandCards}
    AllCards={AllCards}
    playerCardSum={playerCardSum}
    deckCardSum={deckCardSum}
    DeckCardNumber={DeckCardNumber}
    PlayerNumber={PlayerNumber}
  />;
};

export default PeopleContainer;
