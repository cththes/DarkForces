import { CardNamesType, CurrentTurnType } from "./../types/types";
import { createSlice } from "@reduxjs/toolkit";
import { peopleAPI } from "../api/api";
import { AppStateType } from "./store";
import { AllPeopleType, CardType, PeopleWithStrengthType, PlayersType } from "../types/types";

const CalcStrength = (StrengthArray: Array<number>) => {

  const maxStrength = Math.max.apply(null, StrengthArray); //34344
  const minStrength = Math.min.apply(null, StrengthArray); //1122
  const difference = (maxStrength - minStrength) / 9; //3691.3333333333335
  let StrengthPoints: Array<number> = []
  StrengthArray.forEach((el) => {
    StrengthPoints.push(Math.floor((el - minStrength) / difference) + 1);
  });
  return StrengthPoints
}


const peopleReducer = createSlice({
  name: "peopleReducer",
  initialState: {
    PeopleObject: {
      AllPeople: [] as Array<AllPeopleType>,
      PeopleWithStrength: [] as Array<PeopleWithStrengthType>, //real Jedi
      Strength: [] as Array<number>, //mass * height
      CardNames: {} as CardNamesType
    },
    currentTurn: {
      turn: "1",
      player: "1",
    } as CurrentTurnType,
    currentCard: 0,
    sumOfCurrentHandCards: 0,
    isGameOver: false,
    isNoStrength: true,
    isNewGame: true,
    players: {
      "1": {
        turns: {},
        strength: 0
      },
      "2": {
        turns: {},
        strength: 0
      },
    } as PlayersType,
    cards: {} as CardType,
  },
  reducers: {
    setAllPeople(state, action) {
      state.PeopleObject.AllPeople = action.payload;
    },
    setPeople(state) {
      state.PeopleObject.PeopleWithStrength = []
      state.PeopleObject.Strength = []
      state.PeopleObject.AllPeople.forEach((el: AllPeopleType) => {

        let strength: number = el.mass * el.height;
        if (isFinite(strength)) {
          state.cards[el.name] = {
            ...el,
            strength: strength,
          };
          state.PeopleObject.PeopleWithStrength.push(el);
          state.PeopleObject.Strength.push(strength);
          state.PeopleObject.CardNames[el.name] = el.name;
        }
      });

      const StrengthArray = CalcStrength(state.PeopleObject.Strength)
      const newStateCards: CardType = {};
      Object.keys(state.cards).forEach((name, index) => {
        newStateCards[name] = {
          ...state.cards[name],
          strength: StrengthArray[index]
        }
      })
      state.cards = newStateCards
    },
    drawCard(state, action) {
      const currentCardName = action.payload;
      let a = state.players[state.currentTurn.player].turns[state.currentTurn.turn]
      state.players[state.currentTurn.player].turns[state.currentTurn.turn] = {
        cards: a ? [...a.cards, currentCardName] : [currentCardName],
        strength: a ? a.strength + state.cards[currentCardName].strength : state.cards[currentCardName].strength
      }
      state.players[state.currentTurn.player].strength = Object.values(state.players[state.currentTurn.player].turns).reduce((accumulator, turn) => {
        return accumulator + turn.strength;
      }, 0)
      delete state.PeopleObject.CardNames[currentCardName]
      if (Object.keys(state.PeopleObject.CardNames).length === 0) {
        state.isGameOver = true
      }

      state.isNoStrength = false
      state.isNewGame = false

      if (state.players[state.currentTurn.player].turns[state.currentTurn.turn].strength >= 21) {
        state.players[state.currentTurn.player].strength -= (state.players[state.currentTurn.player].turns[state.currentTurn.turn].strength - 1)
        state.players[state.currentTurn.player].turns[state.currentTurn.turn].strength -= (state.players[state.currentTurn.player].turns[state.currentTurn.turn].strength - 1)
        if (state.currentTurn.player === "1")
          state.currentTurn.player = "2"
        else {
          state.currentTurn.player = "1"
          state.currentTurn.turn = String(Number(state.currentTurn.turn + 1))
        }
      }

    },
    nextMove(state) {
      if (state.currentTurn.player === "1")
        state.currentTurn.player = "2"
      else {
        state.currentTurn.player = "1"
        state.currentTurn.turn = String(Number(state.currentTurn.turn + 1))
      }
      state.isNoStrength = true
    },
    clear(state) {
      state.isGameOver = false
      state.isNoStrength = true
      state.isNewGame = true
      state.currentTurn = {
        turn: "1",
        player: "1",
      }
      state.players = {
        "1": {
          turns: {},
          strength: 0
        },
        "2": {
          turns: {},
          strength: 0
        }
      }
      const newCardNames: CardNamesType = {}
      Object.keys(state.cards).forEach((cardName) => {
        newCardNames[cardName] = cardName
      })
      state.PeopleObject.CardNames = newCardNames
    },
  }
}
);

export const requestPeople = () => {
  return peopleAPI.getPeople();
};

export const getState = (state: AppStateType) => {
  return state.peopleReducer;
};

export const getPeople = (state: AppStateType) => {
  return state.peopleReducer.PeopleObject;
};

export const getCurrentTurn = (state: AppStateType) => {
  return state.peopleReducer.currentTurn;
};

export const getIsGameOver = (state: AppStateType) => {
  return state.peopleReducer.isGameOver;
};

export const getIsNoStrength = (state: AppStateType) => {
  return state.peopleReducer.isNoStrength;
};

export const getIsNewGame = (state: AppStateType) => {
  return state.peopleReducer.isNewGame;
};

export const getCardsObject = (state: AppStateType) => {
  return state.peopleReducer.cards
}

export const getCardNames = (state: AppStateType) => {
  return state.peopleReducer.PeopleObject.CardNames
}

export const getPlayers = (state: AppStateType) => {
  return state.peopleReducer.players
}

export default peopleReducer.reducer;
export const { setAllPeople, setPeople, drawCard, nextMove, clear } = peopleReducer.actions;
