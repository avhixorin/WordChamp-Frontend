import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Score } from "@/types/types";

interface ScoreState {
  scores: Score; 
}

const initialScoreState: ScoreState = {
  scores: [],
};

const scoreSlice = createSlice({
  name: "score",
  initialState: initialScoreState,
  reducers: {
    setScores: (state, action: PayloadAction<Score>) => {
      state.scores = action.payload;
    },
    addScore: (state, action: PayloadAction<Score[0]>) => {
      state.scores.push(action.payload);
    },
    resetScores: () => initialScoreState,
    updateScore: (state, action: PayloadAction<{ playerId: string, score: number }>) => {
      const { playerId, score } = action.payload;
      const player = state.scores.find((scoreObj) => scoreObj.user.id === playerId);
      if (player) {
        player.score = score; 
      }
    },
  },
});

export const { setScores, addScore, resetScores, updateScore } = scoreSlice.actions;
export default scoreSlice.reducer;
