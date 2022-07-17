import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import People from "./People";
import {
  getCardNames,
  getCardsObject,
  getCurrentTurn,
  getIsGameOver,
  getIsNewGame,
  getIsNoStrength,
  getPeople,
  getPlayers,
} from "../../redux/people-reducer";
import { setAllPeople, requestPeople, setPeople } from "../../redux/people-reducer";
import { RequestPeopleResultsType } from "../../types/types";

const PeopleContainer = () => {
  const dispatch = useDispatch();
  const PeopleObject = useSelector(getPeople);
  const currentTurn = useSelector(getCurrentTurn)
  const isGameOver = useSelector(getIsGameOver)
  const isNoStrength = useSelector(getIsNoStrength)
  const isNewGame = useSelector(getIsNewGame)
  const cards = useSelector(getCardsObject)
  const CardNames = useSelector(getCardNames)
  const players = useSelector(getPlayers)

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
  console.log("PC currentTurn", currentTurn)
  console.log("PC cards", cards)
  return <People
    PeopleWithStrength={PeopleObject.PeopleWithStrength}
    currentTurn={currentTurn}
    isNoStrength={isNoStrength}
    isGameOver={isGameOver}
    CardNames={CardNames}
    cardsMap={cards}
    players={players}
    isNewGame={isNewGame}
  />;
};

export default PeopleContainer;
