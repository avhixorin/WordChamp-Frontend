import { Answer, Difficulty, MultiPlayerRoomData, MultiplayerUser, Room, Verdict } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MultiPlayerRoomData = {
    room: null,
    maxRoomPlayers: 1,
    gameString: "",
    roomDifficulty: Difficulty.EASY,
    players: [],
    guessedWords: [],
}

const multiPlayerDataSlice = createSlice({
    name: "multiPlayer",
    initialState,
    reducers: {
        setMultiPlayerRoomData: (state, action: PayloadAction<Partial<MultiPlayerRoomData>>) => {
            Object.assign(state, action.payload);
        },
        setMultiPlayerRoomDataField: <K extends keyof MultiPlayerRoomData>(
            state: MultiPlayerRoomData, 
            action: PayloadAction<{ key: K, value: MultiPlayerRoomData[K] }>
        ) => {
            state[action.payload.key] = action.payload.value;
        },
        setRoom: (state,action:PayloadAction<Room>) => {
            state.room = action.payload;
        },
        setRoomId: (state, action: PayloadAction<string>) => {
            if (state.room) {
                state.room.roomId = action.payload;
            }
        },
        setRoomPassword: (state, action: PayloadAction<string>) => {
            if (state.room) {
                state.room.roomPassword = action.payload;
            }
        },
        setMaxRoomPlayers: (state, action: PayloadAction<number>) => {
            state.maxRoomPlayers = action.payload;
        },
        setGameString: (state, action: PayloadAction<string>) => {
            state.gameString = action.payload;
        },
        setRoomDifficulty: (state, action: PayloadAction<Difficulty>) => {
            state.roomDifficulty = action.payload;
        },
        addPlayers: (state, action: PayloadAction<MultiplayerUser>) => {
            const existingPlayer = state.players.find(player => player.id === action.payload.id || player.username === action.payload.username);
            if (!existingPlayer) {
                state.players.push(action.payload);
            }
        },        
        removePlayer: (state, action: PayloadAction<string>) => {
            state.players = state.players.filter(player => player.id !== action.payload);
        },
        updatePlayerScoreAndAnswer: (
            state,
            action: PayloadAction<{ playerId: string; score: number; guessedWord: Answer }>
        ) => {
            const player = state.players.find(player => player.id === action.payload.playerId);
            
            if (player) {
                if (action.payload.guessedWord.verdict === Verdict.CORRECT) {
                    const wordAlreadyGuessed = state.guessedWords.some(
                        answer => answer === action.payload.guessedWord.word
                    );
                    if (!wordAlreadyGuessed) {
                        if (state.guessedWords.length >= 10) {
                            state.guessedWords.shift(); 
                        }
                        state.guessedWords.push(action.payload.guessedWord.word);
                        player.answers.push(action.payload.guessedWord);
                    }
                }
                player.score += action.payload.score;
            }
        },                       
        addMultiPlayerGuessedWord: (state, action: PayloadAction<string>) => {
            if (!state.guessedWords.includes(action.payload)) {
                state.guessedWords.push(action.payload);
            }
        },        
        resetMultiPlayerData: () => initialState,
    },
});

export const { 
    setMultiPlayerRoomData, 
    setMultiPlayerRoomDataField, 
    setMaxRoomPlayers, 
    setGameString, 
    setRoomDifficulty, 
    addPlayers, 
    removePlayer, 
    updatePlayerScoreAndAnswer, 
    addMultiPlayerGuessedWord,
    resetMultiPlayerData,
    setRoomId, 
    setRoomPassword,
    setRoom 
} = multiPlayerDataSlice.actions;

export default multiPlayerDataSlice.reducer;
