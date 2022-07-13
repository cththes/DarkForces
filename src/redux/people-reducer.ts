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
    currentCardNumber: 0,
    sumOfCurrentHandCards: 0,
    isGameOver: false,
    players: [[[], [], []], [[], [], []]] as PlayersType,
    deckCardSum: [[0, 0, 0], [0, 0, 0]],
    playerCardSum: [0, 0]
  },
  reducers: {
    setAllPeople(state, action) {
      state.PeopleObject.AllPeople = action.payload;
    },
    setPeople(state) {
      state.PeopleObject.PeopleWithStrength = []
      state.PeopleObject.Strength = []
      state.PeopleObject.CardNames = []
      state.PeopleObject.AllPeople.forEach((el: AllPeopleType) => {
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
      state.currentCard = action.payload.points;
      state.players[state.currentPlayerNumber][state.currentCardDeckNumber].push(action.payload);
      state.deckCardSum[state.currentPlayerNumber][state.currentCardDeckNumber] += action.payload.points
      state.playerCardSum[state.currentPlayerNumber] += action.payload.points
      state.sumOfCurrentHandCards += action.payload.points
      if (state.sumOfCurrentHandCards >= 21) {
        if (state.sumOfCurrentHandCards > 21) {
          state.playerCardSum[state.currentPlayerNumber] -= state.deckCardSum[state.currentPlayerNumber][state.currentCardDeckNumber]
          ++state.playerCardSum[state.currentPlayerNumber]
          state.sumOfCurrentHandCards = 0
        }
        state.sumOfCurrentHandCards = 0
        if ((state.currentPlayerNumber === 1) && (state.currentCardDeckNumber === 2)) {
          state.isGameOver = true
        }
        if (state.currentPlayerNumber === 0)
          state.currentPlayerNumber = 1
        else {
          state.currentPlayerNumber = 0
          if (state.currentCardDeckNumber < 2)
            state.currentCardDeckNumber++
        }
      }
    },
    nextMove(state) {
      state.sumOfCurrentHandCards = 0
      if ((state.currentPlayerNumber === 1) && (state.currentCardDeckNumber === 2)) {
        state.isGameOver = true
      }
      if (state.currentPlayerNumber === 0)
        state.currentPlayerNumber = 1
      else {
        state.currentPlayerNumber = 0
        if (state.currentCardDeckNumber < 2)
          state.currentCardDeckNumber++
      }
    },
    clear(state) {
      state.isGameOver = false
      state.currentPlayerNumber = 0
      state.currentCardDeckNumber = 0
      state.currentCard = 0
      state.sumOfCurrentHandCards = 0
      state.players = [[[], [], []], [[], [], []]]
      state.deckCardSum = [[0, 0, 0], [0, 0, 0]]
      state.playerCardSum = [0, 0]
    },
    deleteCard(state, action) {
      state.PeopleObject.PeopleWithStrength.splice(action.payload, 1)
      state.PeopleObject.Strength.splice(action.payload, 1)
      state.PeopleObject.StrengthPoints.splice(action.payload, 1)
      state.PeopleObject.CardNames.splice(action.payload, 1)
    },
    minusPoints(state) {
      state.playerCardSum[state.currentPlayerNumber] -= --state.deckCardSum[state.currentPlayerNumber][state.currentCardDeckNumber]
    },
  }
}
);

export const requestPeople = () => {
  return peopleAPI.getPeople();
};

export default peopleReducer.reducer;
export const { setAllPeople, setPeople, drawCard, nextMove, minusPoints, clear, deleteCard } = peopleReducer.actions;
