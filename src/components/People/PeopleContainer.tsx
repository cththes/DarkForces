import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import People from "./People";
import { getCardDeckNumber, getCards, getPeople, getPlayerNumber } from "../../redux/people-selector";
import { requestPeople, setPeople } from "../../redux/people-reducer";
import { RequestPeopleResultsType } from "../../types/types";

const PeopleContainer = () => {
  let dispatch = useDispatch();
  let PeopleObject = useSelector((state) => getPeople(state));
  let onHandCards = useSelector((state) => getCards(state));
  let currentCardDeckNumber = useSelector((state) => getCardDeckNumber(state));
  let currentPlayerNumber = useSelector((state) => getPlayerNumber(state));

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

  return <People
    StrengthPoints={PeopleObject.StrengthPoints}
    onHandCards={onHandCards}
    currentCardDeckNumber={currentCardDeckNumber}
    currentPlayerNumber={currentPlayerNumber}
  />;
};

export default PeopleContainer;
