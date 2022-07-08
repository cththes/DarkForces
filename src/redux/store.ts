import { combineReducers, configureStore } from "@reduxjs/toolkit";
import peopleReducer from "./people-reducer";

const rootReducer = combineReducers({
  peopleReducer: peopleReducer,
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export const store = configureStore({
  reducer: rootReducer,
});
