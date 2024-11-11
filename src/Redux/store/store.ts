import { combineReducers, configureStore } from "@reduxjs/toolkit";
import messageSlice from "../features/messageSlice";
import multiPlayerDataSlice from "../features/multiPlayerDataSlice";
import multiPlayerUserSlice from "../features/multiPlayerUserSlice";
import soloPlayerSlice from "../features/soloPlayerSlice";
import gameModeSlice from "../features/gameModeSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  gameMode: gameModeSlice,
  soloPlayer: soloPlayerSlice,
  multiPlayerData: multiPlayerDataSlice,
  multiPlayerUser: multiPlayerUserSlice,
  message: messageSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);



export type RootState = ReturnType<typeof store.getState>;

export { store, persistor };
