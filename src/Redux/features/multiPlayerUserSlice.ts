import { Answer, MultiplayerUser, PowerUp, RoomAction, Theme } from "@/types/types";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const initialState: MultiplayerUser = {
    id: "",
    username: "",
    avatar: "",
    theme: Theme.LIGHT,
    powerUps: [],
    answers: [],
    score: 0,
    roomAction: RoomAction.IDLE,
}

const multiPlayerUserSlice = createSlice({
    name: "multiPlayerUser",
    initialState,
    reducers: {
        setMultiPlayerUser: (state, action: PayloadAction<Partial<MultiplayerUser>>) => {
            Object.assign(state, action.payload);
        },
        setMultiPlayerUserField: <K extends keyof MultiplayerUser>(state: MultiplayerUser, action: PayloadAction<{ key: K, value: MultiplayerUser[K] }>) => {
            state[action.payload.key] = action.payload.value;
        },
        addMultiPlayerUserAnswer: (state, action: PayloadAction<Answer>) => {
            state.answers.push(action.payload);
        },
        updateMultiPlayerUserScore: (state, action: PayloadAction<number>) => {
            state.score = Math.max(0, state.score + action.payload);
        },
        addMultiPlayerUserPowerUp: (state, action: PayloadAction<PowerUp>) => {
            state.powerUps.push(action.payload);
        },
        setRoomAction: (state, action: PayloadAction<RoomAction>) => {
            state.roomAction = action.payload;
        },
        resetMultiplayerUser: () => initialState,
    },
    
});

export const { 
    setMultiPlayerUser,
    setMultiPlayerUserField, 
    addMultiPlayerUserAnswer, 
    updateMultiPlayerUserScore, 
    addMultiPlayerUserPowerUp, 
    setRoomAction, 
    resetMultiplayerUser 
} = multiPlayerUserSlice.actions;
export default multiPlayerUserSlice.reducer;