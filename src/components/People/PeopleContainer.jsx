import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestPeople } from "../../redux/people-reducer";
import People from "./People";
import { getPeople } from "../../redux/people-selector";

const PeopleContainer = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    requestPeople().then((responses) => {
      console.log("useEffect", responses);
      let results = [];
      responses.forEach((page) => {
        results = [...results, ...page.data.results];
      });
      console.log("results", results);
      dispatch({ type: "peopleReducer/SET_PEOPLE", payload: results });
    });
  }, []);
  let people = useSelector((state) => getPeople(state));
  console.log("useSelector", people);

  return <People people={people} />;
};

export default PeopleContainer;
