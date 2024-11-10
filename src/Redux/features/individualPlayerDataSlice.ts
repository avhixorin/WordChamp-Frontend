import { GameMode, IndividualGameData } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialIndividualState: IndividualGameData = {
  powerUps: [],
  guessedWords: [],
  score: 0,
  soloGameString: "",
  gameMode: GameMode.SOLO,
  isHosting: true,
  isJoiningRoom: false,
};

const individualPlayerDataSlice = createSlice({
  name: "individualPlayerData",
  initialState: initialIndividualState,
  reducers: {
    addPowerUp: (state, action: PayloadAction<string>) => {
      state.powerUps.push(action.payload);
    },
    setHostingStatus: (state, action: PayloadAction<boolean>) => {
      state.isHosting = action.payload;
    },
    setGameMode: (state, action: PayloadAction<GameMode>) => {
      state.gameMode = action.payload;
    },
    setSoloGameString: (state, action: PayloadAction<string>) => {
      state.soloGameString = action.payload;
    },
    setJoiningStatus: (state, action: PayloadAction<boolean>) => {
      state.isJoiningRoom = action.payload;
    },
    addIndividualScore: (state, action: PayloadAction<number>) => {
      if(state.gameMode === GameMode.SOLO && state.score >= 0) {
        state.score += action.payload;
      }
    },
    addGuessedWord: (state, action: PayloadAction<string>) => {
      if (state.guessedWords.length >= 10) {
        state.guessedWords.shift(); 
      }
      state.guessedWords.push(action.payload);
    },
    resetGuesses: (state) => {
      state.guessedWords = [];
    },
    resetIndividualPlayerData: () => initialIndividualState,
  }
});

export const {
  addPowerUp,
  addIndividualScore,
  setGameMode,
  addGuessedWord,
  setSoloGameString,
  setHostingStatus,
  setJoiningStatus,
  resetGuesses,
  resetIndividualPlayerData
} = individualPlayerDataSlice.actions;

export default individualPlayerDataSlice.reducer;
