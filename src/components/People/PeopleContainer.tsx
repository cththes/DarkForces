import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import People from "./People";
import { getAllCards, getDeckCardSum, getIsGameOver, getPeople, getPlayerCardSum, getPlayerNumber } from "../../redux/people-selector";
import { setAllPeople, requestPeople, setPeople } from "../../redux/people-reducer";
import { RequestPeopleResultsType } from "../../types/types";

const PeopleContainer = () => {
  const dispatch = useDispatch();
  const PeopleObject = useSelector(getPeople);
  const AllCards = useSelector(getAllCards)
  const playerCardSum = useSelector(getPlayerCardSum)
  const deckCardSum = useSelector(getDeckCardSum)
  const PlayerNumber = useSelector(getPlayerNumber)
  const isGameOver = useSelector(getIsGameOver)

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
    AllCards={AllCards}
    playerCardSum={playerCardSum}
    deckCardSum={deckCardSum}
    PlayerNumber={PlayerNumber}
    isGameOver={isGameOver}
  />;
};

export default PeopleContainer;
