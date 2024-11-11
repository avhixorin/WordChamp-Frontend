// Theme and RoomAction Enums
export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export enum RoomAction {
  HOSTING = "hosting",
  JOINING = "joining",
  IDLE = "idle",
}

// Difficulty and GameMode Enums
export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
  GOD = "god",
}

export enum GameMode {
  SOLO = "solo",
  MULTIPLAYER = "multiplayer",
}

// Verdict Enum
export enum Verdict {
  CORRECT = "correct",
  INCORRECT = "incorrect",
  PROFANE = "profane",
}

// PowerUp Type
export type PowerUp = {
  name: string;
  description: string;
  count: number;
}

// Answer Type
export type Answer = {
  word: string;
  verdict: Verdict;
  awardedPoints: number;
}

// Room Type
export type Room = {
  roomId: string;
  roomPassword: string;
}

// SoloPlayer Type
export type SoloPlayer = {
  id: string;
  username: string;
  avatar: string;
  difficulty: Difficulty;
  gameMode: GameMode;
  score: number;
  powerUps: PowerUp[];
  gameString: string;
  guessedWords: string[];
  answers: Answer[];
  theme: Theme;
}

// MultiplayerUser Type
export type MultiplayerUser = {
  id: string;
  username: string;
  avatar: string;
  theme: Theme;
  powerUps: PowerUp[];
  answers: Answer[];
  score: number;
  roomAction: RoomAction;
}

// MultiPlayerRoomData Type
export type MultiPlayerRoomData = {
  room: Room | null;
  maxRoomPlayers: number;
  gameString: string;
  roomDifficulty: Difficulty;
  players: MultiplayerUser[];
  guessedWords: string[];
}

// Request & Response Types

// Room Hosting Request
export type HostRoomRequest = {
  room: Room;
  maxRoomPlayers: number;
  user: MultiplayerUser;
}

// Room Hosting Response
export type HostRoomResponse = {
  statusCode: number;
  message: string;
  data: {
    roomId: string;
    maxRoomPlayers: number;
    participants: number;
  };
}

// Room Joining Request
export type JoinRoomRequest = {
  room: Room;
  user: MultiplayerUser;
}

// Room Joining Response
export type JoinRoomResponse = {
  statusCode: number;
  message: string;
  data: {
    maxRoomPlayers: number;
    players: MultiplayerUser[];
  };
}

export type NewUserResponse = {
  statusCode: number;
  message: string;
  data: {
    user: MultiplayerUser;
  };
}

// Game Start Request
export type StartGameRequest = {
  gameData: MultiPlayerRoomData;
}

// Game Start Response
export type StartGameResponse = {
  statusCode: number;
  message: string;
  data: {
    gameData: MultiPlayerRoomData;
  };
}

// Score Update Request
export type UpdateScoreRequest = {
  roomId: string;
  playerId: string;
  score: number;
  guessedWord?: Answer;
}

// Score Update Response
export type UpdateScoreResponse = {
  statusCode: number;
  message: string;
  data: {
    playerId: string;
    score: number;
    guessedWord?: Answer;
  };
}

// Solo Game Start Response
export type SoloGameStartResponse = {
  statusCode: number;
  message: string;
  data: SoloPlayer;
}

// Timer Update Response
export type TimerUpdateResponse = {
  statusCode: number;
  message: string;
  data: {
    timer: number;
  };
}

// Message Type
export type MessageRequest = {
  roomId: string;
  sender: MultiplayerUser;
  content: string;
}

export type Message = {
  content: string;
  sender: MultiplayerUser;
}

// Message Response
export type MessageResponse = {
  statusCode: number;
  message: string;
  data: Message;
}

// Leave Room Response
export type LeaveRoomResponse = {
  statusCode: number;
  message: string;
  data: {
    user: MultiplayerUser;
  };
}

// General Response for actions like leaving room, ending game, etc.
export type GeneralResponse = {
  statusCode: number;
  message: string;
}
