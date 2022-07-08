import { combineReducers, configureStore } from "@reduxjs/toolkit";
import peopleReducer from "./people-reducer";

const rootReducer = combineReducers({
  peopleReducer: peopleReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
