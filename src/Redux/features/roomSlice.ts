import { RoomData, RoomStatus, User } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RoomData = {
  roomId: "",
  password: "",
  members: [],
  currentNoOfParticipants: 0,
  status: RoomStatus.NONE,
};

const roomSlice = createSlice({
  name: "roomSlice",
  initialState,
  reducers: {
    setRoomPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
    setRoomStatus: (state, action: PayloadAction<RoomStatus>) => {
      state.status = action.payload;
    },
    setCurrentParticipants: (state,action:PayloadAction<number>) => {
      state.currentNoOfParticipants = action.payload;
    },
    addMembersToRoom: (state, action: PayloadAction<User>) => {
      const userExists = state.members.some((member) => member.id === action.payload.id);
      if (!userExists) {
        console.log("Adding member to room:", action.payload);
        state.members.push(action.payload);
      } else {
        console.log(`User with ID ${action.payload.id} already exists in the room.`);
      }
    },    
    removeMembersFromRoom: (state, action: PayloadAction<string>) => {
      state.members = state.members.filter((member) => member.id !== action.payload);
    },
    resetRoom: () => initialState,
  },
});

export const { setRoomId, setRoomPassword, setRoomStatus, resetRoom,setCurrentParticipants, addMembersToRoom, removeMembersFromRoom } =
  roomSlice.actions;
export default roomSlice.reducer;
