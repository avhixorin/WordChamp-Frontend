import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "@/constants/ClientSocketEvents";
import {
  Difficulty,
  HostingResponse,
  JoiningResponse,
  LeaveRoomResponse,
  Message,
  MessageResponse,
  NewUserResponse,
  Room,
  RoomStatus,
  ScoreData,
  SharedGameData,
  SoloGameStringResponse,
  StartGameResponse,
  UpdateScoreResponse,
  User,
} from "@/types/types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addMembersToRoom,
  removeMembersFromRoom,
  setCurrentParticipants,
} from "@/Redux/features/roomSlice";
import { addMessage } from "@/Redux/features/messageSlice";
import { RootState } from "@/Redux/store/store";
import { setMaxGameParticipants, setSharedGameData } from "@/Redux/features/sharedGameDataSlice";
import { updateScore } from "@/Redux/features/scoreSlice";
import { addGuessedWord, setSoloGameString } from "@/Redux/features/individualPlayerDataSlice";

// Singleton Socket instance
let socket: Socket | null = null;

const initializeSocket = (): Socket => {
  const socketURL = import.meta.env.VITE_SOCKET_URL;
  if (!socket) {
    socket = io(socketURL, { autoConnect: false });
  }
  return socket;
};

const useSocket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const roomStatus = useSelector((state: RootState) => state.room.status);

  // Connect socket if not already connected
  const socket = initializeSocket();

  // Event handler functions with debug logs
  const handleHostingResponse = (response: HostingResponse) => {
    if (response?.statusCode === 200) {
      toast.success(
        response.message || "Room hosted successfully! Redirecting..."
      );
      dispatch(setCurrentParticipants(response.data.userCount || 1));
      if (user && roomStatus === RoomStatus.HOSTING) {
        dispatch(addMembersToRoom(user));
      }
      navigate("/waiting-room");
    } else {
      toast.error("Hosting the room was unsuccessful.");
    }
  };

  const handleJoiningResponse = (response: JoiningResponse) => {
    console.log("Joining response:", response);

    if (response?.statusCode === 200) {
      toast.success(
        response.message || "Joined room successfully!"
      );
      if(roomStatus === RoomStatus.JOINING) dispatch(setMaxGameParticipants(response.data.maxGameParticipants));
      dispatch(setCurrentParticipants(response.data.userCount || 1));
      response.data.allUsers.forEach((user) => {
        dispatch(addMembersToRoom(user));
      });
      navigate("/waiting-room");
    } else {
      toast.error("Unable to join room. Please try again later.");
    }
  };


  const handleLeaveRoom = (data: LeaveRoomResponse) => {
    console.log("User left response:", data);
    toast(`${data.message}`, {
      icon: "👋",
      style: { background: "rgba(255, 0, 0, 0.8)", color: "#fff" },
    });
    dispatch(removeMembersFromRoom(data.userId));
  };

  const handleNewUser = (data: NewUserResponse) => {
    console.log("New user response:", data);
    toast(`${data.message}`, {
      icon: "👋",
      style: { background: "rgba(0, 255, 0, 0.8)", color: "#fff" },
    });
    dispatch(addMembersToRoom(data.user));
  };

  const handleNewMessage = (data: MessageResponse) => {
    console.log("New message response:", data);
    dispatch(addMessage(data));
  };

  const handleStartGameResponse = (data: StartGameResponse) => {
    console.log("Start Game Response",data);
    if(data.statusCode === 200){
      toast.success(data.message);
      if(data.data.gameData) dispatch(setSharedGameData(data.data.gameData));
      navigate("/game");
    }else{
      toast.error(data.message);
    }
  }

  const handleSoloGameStringResponse = (data:SoloGameStringResponse) => {
    console.log("Solo Game String Response",data);
    if(data.statusCode === 200){
      dispatch(setSoloGameString(data.data.gameString));
      toast.success(data.message);
      navigate("/game");
    }else{
      toast.error(data.message);
    }
  }

  const hostRoom = (room: Room, user: User, maxGameParticipants: number) => {
    console.log("Emitting HOST_ROOM event:", { room, user, maxGameParticipants });
    socket.emit(SOCKET_EVENTS.HOST_ROOM, { room, user, maxGameParticipants });

    socket.on(SOCKET_EVENTS.LEAVE_ROOM, (response: LeaveRoomResponse) => {
      handleLeaveRoom(response);
    });
    socket.on(SOCKET_EVENTS.NEW_USER, (response: NewUserResponse) => {
      handleNewUser(response);
    });
    socket.on(SOCKET_EVENTS.NEW_MESSAGE_RESPONSE, (response: MessageResponse) => {
      handleNewMessage(response);
    });
    socket.on(SOCKET_EVENTS.START_GAME_RESPONSE, (data:StartGameResponse) => {
      handleStartGameResponse(data);
    })
    socket.on(SOCKET_EVENTS.UPDATE_SCORE_RESPONSE, (data:UpdateScoreResponse) => {
      console.log("Score update response inside the hostRoom function",data);
      dispatch(updateScore({ playerId: data.data.user.username, score: data.data.score }));
    });
  };

  const joinRoom = (room: Room, user: User) => {
    console.log("Emitting JOIN_ROOM event:", { room, user });
    socket.emit(SOCKET_EVENTS.JOIN_ROOM, { room, user });

    socket.on(SOCKET_EVENTS.LEAVE_ROOM, (response: LeaveRoomResponse) => {
      handleLeaveRoom(response);
    });
    socket.on(SOCKET_EVENTS.NEW_USER, (response: NewUserResponse) => {
      handleNewUser(response);
    });
    socket.on(SOCKET_EVENTS.NEW_MESSAGE_RESPONSE, (response: MessageResponse) => {
      handleNewMessage(response);
    });
    socket.on(SOCKET_EVENTS.START_GAME_RESPONSE, (data:StartGameResponse) => {
      handleStartGameResponse(data);
    })
    socket.on(SOCKET_EVENTS.UPDATE_SCORE_RESPONSE, (data:UpdateScoreResponse) => {
      console.log("Score update response inside the joinRoom function",data);
      dispatch(updateScore({ playerId: data.data.user.username, score: data.data.score }));
      if(data.data.guessedWord) dispatch(addGuessedWord(data.data.guessedWord));
    });
  };

  const startGame = (roomId: string,gameData: SharedGameData) => {
    console.log("Emitting START_GAME event:", { roomId, gameData });
    socket.emit(SOCKET_EVENTS.START_GAME,{
      roomId,
      gameData
    });
  }

  const sendMessage = (message: Message) => {
    console.log("Emitting NEW_MESSAGE event:", message);
    socket.emit(SOCKET_EVENTS.NEW_MESSAGE, message);
  }


  const getGameStringForSoloUser = (difficulty: Difficulty) => {
    console.log("Emitting GET_GAME_STRING event:", difficulty);
    socket.emit(SOCKET_EVENTS.GET_SOLO_GAME_STRING, difficulty);
  }
  
  const updateMultiPlayerUserScore = (scoreData:ScoreData) => {
    console.log("Emitting UPDATE_SCORE event:", scoreData);
    socket.emit(SOCKET_EVENTS.UPDATE_SCORE, scoreData);
  }

  useEffect(() => {
    if (socket && !socket.connected) {
      socket.connect();
    }

    socket.on(SOCKET_EVENTS.HOSTING_RESPONSE, handleHostingResponse);
    socket.on(SOCKET_EVENTS.JOINING_RESPONSE, handleJoiningResponse);
    socket.on(SOCKET_EVENTS.SOLO_GAME_STRING_RESPONSE,handleSoloGameStringResponse);
    socket.on(SOCKET_EVENTS.UPDATE_SCORE_RESPONSE, (data:UpdateScoreResponse) => {
      console.log("Score update response outside both the functions",data);
      dispatch(updateScore({ playerId: data.data.user.username, score: data.data.score }));
    });
    return () => {
      socket.off(SOCKET_EVENTS.HOSTING_RESPONSE, handleHostingResponse);
      socket.off(SOCKET_EVENTS.JOINING_RESPONSE, handleJoiningResponse);
      socket.off(SOCKET_EVENTS.LEAVE_ROOM, handleLeaveRoom);
      socket.off(SOCKET_EVENTS.NEW_USER, handleNewUser);
      socket.off(SOCKET_EVENTS.NEW_MESSAGE, handleNewMessage);
      socket.off(SOCKET_EVENTS.START_GAME_RESPONSE, handleStartGameResponse);
      socket.on(SOCKET_EVENTS.UPDATE_SCORE_RESPONSE, (data:UpdateScoreResponse) => {
        console.log("Score update response outside both the functions",data);
        dispatch(updateScore({ playerId: data.data.user.username, score: data.data.score }));
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomStatus, user]);

  return { hostRoom, joinRoom, sendMessage, startGame, updateMultiPlayerUserScore, getGameStringForSoloUser };
};

export default useSocket;
