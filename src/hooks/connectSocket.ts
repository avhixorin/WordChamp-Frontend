import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { RootState } from "@/Redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { SOCKET_EVENTS } from "@/constants/ClientSocketEvents";
import { HostRoomRequest, HostRoomResponse, JoinRoomRequest, JoinRoomResponse, LeaveRoomResponse, MessageRequest, MessageResponse, NewUserResponse, RoomAction, SoloGameStartResponse, SoloPlayer, StartGameRequest, StartGameResponse } from "@/types/types";
import toast from "react-hot-toast";
import { addPlayers, removePlayer, setMaxRoomPlayers, setMultiPlayerRoomData } from "@/Redux/features/multiPlayerDataSlice";
import { useNavigate } from "react-router-dom";
import { addMessage } from "@/Redux/features/messageSlice";
import { setSoloPlayerGameString } from "@/Redux/features/soloPlayerSlice";

// Singleton Socket instanc
let socket: Socket | null = null;

const initializeSocket = (): Socket => {
  const socketURL = import.meta.env.VITE_SOCKET_URL;
  console.log("The socket URL is: ", socketURL);
  if (!socket) {
    socket = io(socketURL, { autoConnect: false });
  }
  return socket;
};

const useSocket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.multiPlayerUser);
  const { roomAction: roomStatus } = useSelector((state: RootState) => state.multiPlayerUser);

  // Connect socket if not already connected
  const socket = initializeSocket();

  // Event handler functions with debug logs
  const handleHostingResponse = (response: HostRoomResponse) => {
    if (response?.statusCode === 200) {
      toast.success(
        response.message || "Room hosted successfully! Redirecting..."
      );
      if (user && roomStatus === RoomAction.HOSTING) {
        dispatch(addPlayers(user));
      }
      navigate("/waiting-room");
    } else {
      toast.error("Hosting the room was unsuccessful.");
    }
  };

  const handleJoiningResponse = (response: JoinRoomResponse) => {
    console.log("Joining response:", response);

    if (response?.statusCode === 200) {
      toast.success(
        response.message || "Joined room successfully!"
      );
      if(roomStatus === RoomAction.JOINING) dispatch(setMaxRoomPlayers(response.data.maxRoomPlayers));
      response.data.players.forEach((player) => {
        dispatch(addPlayers(player));
      });
      navigate("/waiting-room");
    } else {
      toast.error("Unable to join room. Please try again later.");
    }
  };


  const handleLeaveRoom = (data: LeaveRoomResponse) => {
    console.log("User left response:", data);
    if(data.statusCode === 200){
      toast(`${data.message}`, {
        icon: "👋",
        style: { background: "rgba(255, 0, 0, 0.8)", color: "#fff" },
      });
      dispatch(removePlayer(data.data.user.id));
    }else{
      toast.error(data.message);
    }
    
  };

  const handleNewUser = (data: NewUserResponse) => {
    console.log("New user response:", data);
    toast(`${data.message}`, {
      icon: "👋",
      style: { background: "rgba(0, 255, 0, 0.8)", color: "#fff" },
    });
    dispatch(addPlayers(data.data.user));
  };

  const handleNewMessage = (data: MessageResponse) => {
    console.log("New message response:", data);
    const { content, sender } = data.data;
    dispatch(addMessage({ content, sender }));
  };

  const handleStartGameResponse = (data: StartGameResponse) => {
    console.log("Start Game Response",data);
    if(data.statusCode === 200){
      toast.success(data.message);
      if(data.data.gameData) dispatch(setMultiPlayerRoomData(data.data.gameData));
      navigate("/game");
    }else{
      toast.error(data.message);
    }
  }

  const handleSoloGameStartResponse = (data:SoloGameStartResponse) => {
    console.log("Solo Game Start Response",data);
    if(data){
      toast.success("Happy Gaming!", {
        icon: "🤩"
      });
      dispatch(setSoloPlayerGameString(data.data.gameString));
      navigate("/game");
    }else{
      toast.error("Unable to start the game");
    }
  }

  const hostRoom = (request: HostRoomRequest) => {
    console.log("Emitting HOST_ROOM event:", request);
    socket.emit(SOCKET_EVENTS.HOST_ROOM, request);

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
    // socket.on(SOCKET_EVENTS.UPDATE_SCORE_RESPONSE, (data:UpdateScoreResponse) => {
    //   console.log("Score update response inside the hostRoom function",data);
    //   dispatch(updateScore({ playerId: data.data.user.username, score: data.data.score }));
    // });
  };

  const joinRoom = (request: JoinRoomRequest) => {
    console.log("Emitting JOIN_ROOM event:", request);
    socket.emit(SOCKET_EVENTS.JOIN_ROOM, request);

    // socket.on(SOCKET_EVENTS.LEAVE_ROOM, (response: LeaveRoomResponse) => {
    //   handleLeaveRoom(response);
    // });
    socket.on(SOCKET_EVENTS.NEW_USER, (response: NewUserResponse) => {
      handleNewUser(response);
    });
    socket.on(SOCKET_EVENTS.NEW_MESSAGE_RESPONSE, (response: MessageResponse) => {
      handleNewMessage(response);
    });
    socket.on(SOCKET_EVENTS.START_GAME_RESPONSE, (data:StartGameResponse) => {
      handleStartGameResponse(data);
    })
    // socket.on(SOCKET_EVENTS.UPDATE_SCORE_RESPONSE, (data:UpdateScoreResponse) => {
    //   console.log("Score update response inside the joinRoom function",data);
    //   dispatch(updateScore({ playerId: data.data.user.username, score: data.data.score }));
    //   if(data.data.guessedWord) dispatch(addGuessedWord(data.data.guessedWord));
    // });
  };

  const startGame = (request: StartGameRequest) => {
    if(!request.gameData || !request.gameData.room) return;
    console.log("Emitting START_GAME event:",request.gameData);
    socket.emit(SOCKET_EVENTS.START_GAME,
      request
    );
  }

  const sendMessage = (message: MessageRequest) => {
    console.log("Emitting NEW_MESSAGE event:", message);
    socket.emit(SOCKET_EVENTS.NEW_MESSAGE, message);
  }

  const startSoloGame = (user: SoloPlayer) => {
    console.log("Emitting START_SOLO_GAME event:", user);
    socket.emit(SOCKET_EVENTS.START_SOLO_GAME, user);

    socket.on(SOCKET_EVENTS.SOLO_GAME_START_RESPONSE, (data:SoloGameStartResponse) => {
      handleSoloGameStartResponse(data);
    });
  }


  useEffect(() => {
    if (socket && !socket.connected) {
      socket.connect();
    }

    socket.on(SOCKET_EVENTS.HOSTING_RESPONSE, handleHostingResponse);
    socket.on(SOCKET_EVENTS.JOINING_RESPONSE, handleJoiningResponse);

    // socket.on(SOCKET_EVENTS.UPDATE_SCORE_RESPONSE, (data:UpdateScoreResponse) => {
    //   console.log("Score update response outside both the functions",data);
    //   dispatch(updateScore({ playerId: data.data.user.username, score: data.data.score }));
    // });
    return () => {
      socket.off(SOCKET_EVENTS.HOSTING_RESPONSE, handleHostingResponse);
      socket.off(SOCKET_EVENTS.JOINING_RESPONSE, handleJoiningResponse);
      socket.off(SOCKET_EVENTS.LEAVE_ROOM, handleLeaveRoom);
      socket.off(SOCKET_EVENTS.NEW_USER, handleNewUser);
      socket.off(SOCKET_EVENTS.NEW_MESSAGE, handleNewMessage);
      socket.off(SOCKET_EVENTS.START_GAME_RESPONSE, handleStartGameResponse);
      socket.off(SOCKET_EVENTS.SOLO_GAME_START_RESPONSE, handleSoloGameStartResponse);
      // socket.on(SOCKET_EVENTS.UPDATE_SCORE_RESPONSE, (data:UpdateScoreResponse) => {
      //   console.log("Score update response outside both the functions",data);
      //   dispatch(updateScore({ playerId: data.data.user.username, score: data.data.score }));
      // });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ user]);

  return { 
    hostRoom,
    joinRoom, 
    sendMessage, 
    startGame, 
    startSoloGame
  // updateMultiPlayerUserScore, getGameStringForSoloUser 
  };
};

export default useSocket;
