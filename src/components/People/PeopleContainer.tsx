import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import People from "./People";
import { getAllCards, getCards, getDeckCardSum, getPeople, getPlayerCardSum } from "../../redux/people-selector";
import { requestPeople, setPeople } from "../../redux/people-reducer";
import { RequestPeopleResultsType } from "../../types/types";

const PeopleContainer = () => {
  let dispatch = useDispatch();
  let PeopleObject = useSelector((state) => getPeople(state));
  let onHandCards = useSelector((state) => getCards(state));
  let AllCards = useSelector((state) => getAllCards(state))
  let playerCardSum = useSelector((state) => getPlayerCardSum(state))
  let deckCardSum = useSelector((state) => getDeckCardSum(state))
  useEffect(() => {
    if (PeopleObject.AllPeople.length === 0) {
      requestPeople().then((responses) => {
        let results: Array<RequestPeopleResultsType> = [];
        responses.forEach((page) => {
          results = [...results, ...page.data.results];
        });
        dispatch(setPeople(results));
      });
    }

  }, []);
  console.log(PeopleObject)
  return <People
    StrengthPoints={PeopleObject.StrengthPoints}
    PeopleWithStrength={PeopleObject.PeopleWithStrength}
    CardNames={PeopleObject.CardNames}
    onHandCards={onHandCards}
    AllCards={AllCards}
    playerCardSum={playerCardSum}
    deckCardSum={deckCardSum}
  />;
};

export default PeopleContainer;
