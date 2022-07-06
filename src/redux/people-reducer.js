import { peopleAPI } from "../api/api";

const SET_PEOPLE = "peopleReducer/SET_PEOPLE";
const DRAW_CARD = "peopleReducer/DRAW_CARD";

let initialState = {
  people: [],
  currentCard: 0,
  onHandCards: [],
};

const peopleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PEOPLE:
      return {
        ...state,
        people: action.payload,
      };
    case DRAW_CARD:
      return {
        ...state,
        currentCard: action.currentCard,
        onHandCards: [...state.onHandCards, action.currentCard],
      };
    default:
      return state;
  }
};

export const setPeople = (people) => {
  return { type: SET_PEOPLE, people };
};

export const requestPeople = () => {
  return peopleAPI.getPeople();
};

export const drawCardActionCreator = (currentCard) => ({
  type: DRAW_CARD,
  currentCard,
});

export default peopleReducer;
