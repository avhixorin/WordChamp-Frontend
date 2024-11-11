import { GameMode } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameMode: GameMode.SOLO,
};

const gameModeSlice = createSlice({
  name: "gameMode",
  initialState,
  reducers: {
    setGameMode: (state, action) => {
      state.gameMode = action.payload;
    },
    resetGameMode: () => initialState,
  },
});

export const { 
    setGameMode, 
    resetGameMode 
} = gameModeSlice.actions;
export default gameModeSlice.reducer;