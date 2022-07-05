import { peopleAPI } from "../api/api";

const SET_PEOPLE = "peopleReducer/SET_PEOPLE";

let initialState = {
  people: [],
};

const peopleReducer = (state = initialState, action) => {
  console.log("switch", action);
  switch (action.type) {
    case SET_PEOPLE:
      return {
        ...state,
        people: action.payload,
      };
    default:
      return state;
  }
};

export const setPeople = (people) => {
  console.log("setPeople", people);
  return { type: SET_PEOPLE, people };
};

export const requestPeople = () => {
  return peopleAPI.getPeople();
};

export default peopleReducer;
