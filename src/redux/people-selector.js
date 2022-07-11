export const getState = (state) => {
  return state.peopleReducer;
};

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

export const getAllCards = (state) => {
  return state.peopleReducer.players;
};

export const getPlayerCardSum = (state) => {
  return state.peopleReducer.playerCardSum;
};
export const getDeckCardSum = (state) => {
  return state.peopleReducer.deckCardSum;
};
