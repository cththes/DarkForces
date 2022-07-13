import { AppStateType } from "./store";

export const getState = (state: AppStateType) => {
  return state.peopleReducer;
};

export const getPeople = (state: AppStateType) => {
  return state.peopleReducer.PeopleObject;
};

export const getCards = (state: AppStateType) => {
  let peopleReducer = state.peopleReducer;
  return peopleReducer.players[peopleReducer.currentPlayerNumber][peopleReducer.currentCardDeckNumber];
};

export const getPlayerNumber = (state: AppStateType) => {
  return state.peopleReducer.currentPlayerNumber;
};

export const getAllCards = (state: AppStateType) => {
  return state.peopleReducer.players;
};

export const getPlayerCardSum = (state: AppStateType) => {
  return state.peopleReducer.playerCardSum;
};
export const getDeckCardSum = (state: AppStateType) => {
  return state.peopleReducer.deckCardSum;
};

export const getIsGameOver = (state: AppStateType) => {
  return state.peopleReducer.isGameOver;
};
