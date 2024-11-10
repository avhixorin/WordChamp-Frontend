import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import individualPlayerDataSlice from "../features/individualPlayerDataSlice";
import sharedGameDataSlice from "../features/sharedGameDataSlice";
import answerSlice from "../features/answersSlice";
import roomSlice from "../features/roomSlice";
import messageSlice from "../features/messageSlice";
import scoreSlice from "../features/scoreSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userSlice,
  individualPlayerData: individualPlayerDataSlice,
  sharedGameData: sharedGameDataSlice,
  answers: answerSlice,
  room: roomSlice,
  message: messageSlice,
  scores: scoreSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);



export type RootState = ReturnType<typeof store.getState>;

export { store, persistor };
