import { combineReducers, configureStore } from "@reduxjs/toolkit";
import peopleReducer from "./people-reducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  peopleReducer: peopleReducer,
});

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER]
      }
    })
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export const persistor = persistStore(store)
export default store
