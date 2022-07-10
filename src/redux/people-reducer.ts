import { createSlice } from "@reduxjs/toolkit";
import { peopleAPI } from "../api/api";
import { AllPeopleType, PeopleWithStrengthType, PlayersType } from "../types/types";

const peopleReducer = createSlice({
  name: "peopleReducer",
  initialState: {
    PeopleObject: {
      AllPeople: [] as Array<AllPeopleType>,
      PeopleWithStrength: [] as Array<PeopleWithStrengthType>, //real Jedi
      Strength: [] as Array<number>, //mass * height
      StrengthPoints: [] as Array<number>, //Strength * 10 / maxStrength; integer points from 1 to 10
      CardNames: [] as Array<string>
    },
    currentPlayerNumber: 0,
    currentCardDeckNumber: 0,
    currentCard: 0,
    players: [[[], [], []], [[], [], []]] as PlayersType,
    deckCardSum: [[0, 0, 0], [0, 0, 0]],
    playerCardSum: [0, 0]
  },
  reducers: {
    setPeople(state, action) {
      state.PeopleObject.AllPeople = action.payload;
      state.PeopleObject.PeopleWithStrength = []
      state.PeopleObject.Strength = []
      state.PeopleObject.CardNames = []
      state.PeopleObject.AllPeople.forEach((el: any) => {
        let strength: number = el.mass * el.height;
        if (isFinite(strength)) {
          state.PeopleObject.PeopleWithStrength.push(el);
          state.PeopleObject.Strength.push(strength);
          state.PeopleObject.CardNames.push(el.name);
        }
      });
      const maxStrength = Math.max.apply(null, state.PeopleObject.Strength); //34344
      const minStrength = Math.min.apply(null, state.PeopleObject.Strength); //1122
      const difference = (maxStrength - minStrength) / 9; //3691.3333333333335
      state.PeopleObject.StrengthPoints = []
      state.PeopleObject.Strength.forEach((el) => {
        state.PeopleObject.StrengthPoints.push(Math.floor((el - minStrength) / difference) + 1);
      });
    },
    drawCard(state, action) {
      state.currentCard = action.payload;
      state.players[state.currentPlayerNumber][state.currentCardDeckNumber].push(action.payload);
      state.deckCardSum[state.currentPlayerNumber][state.currentCardDeckNumber] += action.payload
      state.playerCardSum[state.currentPlayerNumber] += action.payload
    },
    deleteCard(state, action) {
      console.log("state.PeopleObject.PeopleWithStrength.length", state.PeopleObject.PeopleWithStrength.length)
      state.PeopleObject.PeopleWithStrength.pop()
      console.log("state.PeopleObject.PeopleWithStrength.length", state.PeopleObject.PeopleWithStrength.length)
    },
    nextMove(state) {
      if (state.currentCardDeckNumber < 3) {
        if (state.currentPlayerNumber === 0)
          state.currentPlayerNumber = 1
        else {
          state.currentPlayerNumber = 0
          state.currentCardDeckNumber++
        }
      }
    },
    minusPoints(state) {
      state.playerCardSum[state.currentPlayerNumber] -= --state.deckCardSum[state.currentPlayerNumber][state.currentCardDeckNumber]
    },
  },
});

export const requestPeople = () => {
  return peopleAPI.getPeople();
};

export default peopleReducer.reducer;
export const { setPeople, drawCard, nextMove, minusPoints, deleteCard } = peopleReducer.actions;
