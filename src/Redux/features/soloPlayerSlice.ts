import { Answer, Difficulty, GameMode, PowerUp, SoloPlayer, Theme } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SoloPlayer = {
    id: "",
    username: "",
    avatar: "",
    guessedWords: [],
    answers: [],
    score: 0,
    difficulty: Difficulty.EASY,
    powerUps: [],
    gameString: "",
    gameMode: GameMode.SOLO,
    theme: Theme.LIGHT,
};

const soloPlayerSlice = createSlice({
    name: "soloPlayer",
    initialState,
    reducers: {
        setSoloPlayer: (state, action: PayloadAction<Partial<SoloPlayer>>) => {
            Object.assign(state, action.payload);
        },
        setSoloPlayerField: <K extends keyof SoloPlayer>(state: SoloPlayer, action: PayloadAction<{ key: K, value: SoloPlayer[K] }>) => {
            state[action.payload.key] = action.payload.value;
        },
        setSoloPlayerGameString: (state, action: PayloadAction<string>) => {
            state.gameString = action.payload;
        },
        addSoloPlayerGuessWord: (state, action: PayloadAction<string>) => {
            state.guessedWords.push(action.payload);
        },
        addSoloPlayerAnswer: (state, action: PayloadAction<Answer>) => {
            state.answers.push(action.payload);
        },
        updateSoloPlayerScore: (state, action: PayloadAction<number>) => {
            state.score = Math.max(0, state.score + action.payload);
        },
        addSoloPlayerPowerUp: (state, action: PayloadAction<PowerUp>) => {
            state.powerUps.push(action.payload);
        },
        removeSoloPlayerPowerUp: (state, action: PayloadAction<string>) => {
            state.powerUps = state.powerUps.filter(powerUp => powerUp.name !== action.payload);
        },
        resetSoloPlayer: () => initialState,
    },
});

export const { 
    setSoloPlayer, 
    setSoloPlayerField, 
    addSoloPlayerGuessWord, 
    setSoloPlayerGameString,
    addSoloPlayerAnswer, 
    updateSoloPlayerScore, 
    addSoloPlayerPowerUp, 
    removeSoloPlayerPowerUp,
    resetSoloPlayer
} = soloPlayerSlice.actions;
export default soloPlayerSlice.reducer;
