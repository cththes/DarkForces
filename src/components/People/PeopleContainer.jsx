import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestPeople } from "../../redux/people-reducer";
import People from "./People";
import { getPeople } from "../../redux/people-selector";

const PeopleContainer = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    requestPeople().then((responses) => {
      let results = [];
      responses.forEach((page) => {
        results = [...results, ...page.data.results];
      });
      dispatch({ type: "peopleReducer/SET_PEOPLE", payload: results });
    });
  }, []);
  let people = useSelector((state) => getPeople(state));

  let PeopleWithStrength = []; //real Jedi
  let Strength = []; //mass * height
  let StrengthPoints = []; //Strength * 10 / maxStrength; integer points from 1 to 10

  people.forEach((el) => {
    el.strength = el.mass * el.height;
    if (isFinite(el.strength)) {
      PeopleWithStrength.push(el);
      Strength.push(el.strength);
    }
  });

  const maxStrength = Math.max.apply(null, Strength); //34344
  const minStrength = Math.min.apply(null, Strength); //1122
  const difference = (maxStrength - minStrength) / 9; //3691.3333333333335

  Strength.forEach((el) => {
    StrengthPoints.push(Math.floor((el - minStrength) / difference) + 1);
  });

  return <People StrengthPoints={StrengthPoints} />;
};

export default PeopleContainer;
