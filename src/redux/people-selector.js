export const getPeople = (state) => {
  return state.peopleReducer.people;
};

export const getCards = (state) => {
  return state.peopleReducer.onHandCards;
};
