export const SOCKET_EVENTS = {
    // Connection events
    CONNECT: "connect",
    DISCONNECT: "disconnect",

    // User actions
    START_GAME: "startGame",
    START_GAME_RESPONSE: "startGameResponse",
    REGISTER: "register",
    HOST_ROOM: "hostRoom",
    JOIN_ROOM: "joinRoom",
    LEAVE_ROOM: "leaveRoom",
    SOMEONE_JOINED: "someoneJoined",
    ANNOUNCE: "announce",
    NO_OF_USERS: "noOfUsers",
    NEW_MESSAGE: "newMessage",
    NEW_MESSAGE_RESPONSE: "newMessageResponse",
    NEW_USER: "newUser",
    USER_TYPING: "userTyping",
    USER_STOPPED_TYPING: "userStoppedTyping",
    UPDATE_SCORE: "updateScore",
    UPDATE_SCORE_RESPONSE: "updateScoreResponse",
    START_SOLO_GAME: "getSoloGameString",
    SOLO_GAME_START_RESPONSE: "soloGameStringResponse",

    // Server responses
    HOSTING_RESPONSE: "hostingResponse",
    JOINING_RESPONSE: "joiningResponse",
    TIMER: "timer",
    REGISTRATION_RESPONSE: "registrationResponse",
    CREATE_ROOM_RESPONSE: "createRoomResponse",
    ENQUIRY_RESPONSE: "enquiryResponse",

    // Room status updates
    ROOM_FULL: "roomFullStatus",
    ERROR: "serverError",
} as const;
