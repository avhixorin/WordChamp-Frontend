import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Difficulty, SharedGameData } from "@/types/types";

const initialSharedState: SharedGameData = {
  maxGameParticipants: 1,
  currentGameString: "",
  difficulty: Difficulty.EASY,
};

const sharedGameDataSlice = createSlice({
  name: "sharedGameData",
  initialState: initialSharedState,
  reducers: {
    setMaxGameParticipants: (state, action: PayloadAction<number>) => {
      state.maxGameParticipants = action.payload;
    },
    setDifficulty: (state, action: PayloadAction<Difficulty>) => {
      state.difficulty = action.payload;
    },
    setSharedGameData: (state, action: PayloadAction<SharedGameData>) => {
      state.maxGameParticipants = action.payload.maxGameParticipants;
      state.currentGameString = action.payload.currentGameString;
      state.difficulty = action.payload.difficulty;
    },
    resetSharedGameData: () => initialSharedState,
  }
});

export const {
  setMaxGameParticipants,
  setDifficulty,
  setSharedGameData,
  resetSharedGameData
} = sharedGameDataSlice.actions;

export default sharedGameDataSlice.reducer;
