import { Answer } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export type AnswerState = {
    words: Answer[];
}

const initialState:AnswerState = {
    words:[]
}

const answerSlice = createSlice({
    name: "answers",
    initialState,
    reducers: {
      addAnswer: (state, action: PayloadAction<Answer>) => {
        state.words.push(action.payload);
      },
      removeAnswer: (state, action: PayloadAction<number>) => {
        state.words = state.words.filter((_, index) => index !== action.payload);
      },
        resetAnswers: () => initialState,
      },
  });

export const {addAnswer,removeAnswer,resetAnswers} = answerSlice.actions

export default answerSlice.reducer
  
