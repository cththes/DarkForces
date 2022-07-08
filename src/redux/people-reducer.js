import { createSlice } from "@reduxjs/toolkit";
import { peopleAPI } from "../api/api";

const peopleReducer = createSlice({
  name: "peopleReducer",
  initialState: {
    PeopleObject: {
      AllPeople: [],
      PeopleWithStrength: [], //real Jedi
      Strength: [], //mass * height
      StrengthPoints: [], //Strength * 10 / maxStrength; integer points from 1 to 10
    },
    currentCard: 0,
    onHandCards: [],
  },
  reducers: {
    setPeople(state, action) {
      state.PeopleObject.AllPeople = action.payload;
      state.PeopleObject.AllPeople.forEach((el) => {
        let strength = el.mass * el.height;
        if (isFinite(strength)) {
          state.PeopleObject.PeopleWithStrength.push(el);
          state.PeopleObject.Strength.push(strength);
        }
      });
      const maxStrength = Math.max.apply(null, state.PeopleObject.Strength); //34344
      const minStrength = Math.min.apply(null, state.PeopleObject.Strength); //1122
      const difference = (maxStrength - minStrength) / 9; //3691.3333333333335

      state.PeopleObject.Strength.forEach((el) => {
        state.PeopleObject.StrengthPoints.push(Math.floor((el - minStrength) / difference) + 1);
      });
    },
    drawCard(state, action) {
      state.currentCard = action.payload;
      state.onHandCards.push(action.payload);
    },
  },
});

export const requestPeople = () => {
  return peopleAPI.getPeople();
};

export default peopleReducer.reducer;
export const { setPeople, drawCard } = peopleReducer.actions;
