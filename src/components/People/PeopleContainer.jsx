import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import People from "./People";
import { getPeople } from "../../redux/people-selector";
import { requestPeople, setPeople } from "../../redux/people-reducer";

const PeopleContainer = () => {
  let dispatch = useDispatch();
  const shouldDispatch = useRef(true);
  useEffect(() => {
    if (shouldDispatch.current) {
      shouldDispatch.current = false;
      requestPeople().then((responses) => {
        let results = [];
        responses.forEach((page) => {
          results = [...results, ...page.data.results];
        });
        dispatch(setPeople(results));
      });
    }
  }, []);

  let PeopleObject = useSelector((state) => getPeople(state));

  return <People StrengthPoints={PeopleObject.StrengthPoints} />;
};

export default PeopleContainer;
