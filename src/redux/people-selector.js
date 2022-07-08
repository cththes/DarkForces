export const getPeople = (state) => {
  return state.peopleReducer.PeopleObject;
};

export const getCards = (state) => {
  return state.peopleReducer.onHandCards;
};
