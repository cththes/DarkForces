export const getPeople = (state) => {
  return state.peopleReducer.PeopleObject;
};

export const getCards = (state) => {
  let peopleReducer = state.peopleReducer;
  return peopleReducer.players[peopleReducer.currentPlayerNumber][peopleReducer.currentCardDeckNumber];
};

export const getCardDeckNumber = (state) => {
  return state.peopleReducer.currentCardDeckNumber;
};
export const getPlayerNumber = (state) => {
  return state.peopleReducer.currentPlayerNumber;
};
