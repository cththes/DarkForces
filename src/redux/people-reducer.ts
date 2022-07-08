import { createSlice } from "@reduxjs/toolkit";
import { peopleAPI } from "../api/api";
import { AllPeopleType, PeopleWithStrengthType } from "../types/types";

type PeopleReducerType = typeof peopleReducer

const peopleReducer = createSlice({
  name: "peopleReducer",
  initialState: {
    PeopleObject: {
      AllPeople: [] as Array<AllPeopleType>,
      PeopleWithStrength: [] as Array<PeopleWithStrengthType>, //real Jedi
      Strength: [] as Array<number>, //mass * height
      StrengthPoints: [] as Array<number>, //Strength * 10 / maxStrength; integer points from 1 to 10
    },
    currentCard: 0,
    onHandCards: [0] as Array<number>,
  },
  reducers: {
    setPeople(state, action) {
      state.PeopleObject.AllPeople = action.payload;
      state.PeopleObject.AllPeople.forEach((el: any) => {
        let strength: number = el.mass * el.height;
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
