import { combineReducers, createStore } from "redux";
import peopleReducer from "./people-reducer";

const rootReducer = combineReducers({
  peopleReducer: peopleReducer,
});

const store = createStore(rootReducer);

export default store;
