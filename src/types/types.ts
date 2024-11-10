export enum Theme {
  LIGHT = "light",
  DARK = "dark"
}

export enum Verdict {
  RIGHT = "right",
  WRONG = "wrong",
  PROFANE = "profane"
}

export enum RoomStatus {
  HOSTING = "hosting",
  JOINING = "joining",
  NONE = "none",
}

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
  GOD = "god"
}

export enum GameMode {
  SOLO = "solo",
  MULTIPLAYER = "multiplayer"
}

// User-related types
export type User = {
  id: string;
  username: string;
  avatar: string;
  theme: Theme;
};

// Room-related types
export type Room = {
  roomId: string;
  roomPassword: string;
};

export type RoomData = {
  roomId: string;
  password: string;
  members: User[];
  currentNoOfParticipants: number;
  status: RoomStatus;
};

export type HostRoomData = {
  room: Room;
  user: User;
};

export type JoinRoomData = {
  room: Room;
  user: User;
};

// Messaging-related types
export type MessageData = {
  roomId: string;
  content: string;
};

export type MessageResponse = {
  message: string;
  sender: User;
};

export type Message = {
  message: string;
  sender: User;
  roomId: string;
};

// Gameplay-related types
export type Answer = {
  word: string;
  verdict: Verdict;
};

export type SharedGameData = {
  maxGameParticipants: number;
  currentGameString: string;
  difficulty: Difficulty;
};

export type IndividualGameData = {
  powerUps: string[];
  score: number;
  guessedWords: string[];
  soloGameString: string;
  gameMode: GameMode;
  isHosting: boolean;
  isJoiningRoom: boolean;
}

export type Score = {
  user: User;
  score: number;
}[]

export type Words = {
  words: string[];
  guessedWords: string[];
};

// API response types

export type HostingResponse = {
  statusCode: number;
  message: string;
  data: {
    userCount: number;
  };
};
export type ScoreData = {
  playerId: string;
  score: number;
  roomId: string;
  guessedWord?: string;
}
export type UpdateScoreResponse = {
  statusCode: number;
  message: string;
  data: {
    user: User;
    score: number;
    guessedWord?: string;
  };
};

export type InitialGameData = {
  maxGameParticipants: number;
  currentGameString: string;
  difficulty: Difficulty;
  players: User[];
  currentRound: number;
  timer: number;
}

export type SoloGameStringResponse = {
  statusCode: number;
  message: string;
  data: {
    gameString: string;
  };
}

export type StartGameResponse = {
  statusCode: number;
  message: string;
  data: {
    gameData: SharedGameData;
  };
}

export type TimerResponse = {
  statusCode: number;
  message: string;
  data: {
    timer: number;
  };
}

export type JoiningResponse = {
  statusCode: number;
  message: string;
  data: {
    userCount: number;
    allUsers: User[];
    maxGameParticipants: number;
  };
};

export type LeaveRoomResponse = {
  message: string;
  userId: string;
};

export type NoOfUsersResponse = {
  userCount: number;
};

export type NewUserResponse = {
  message: string;
  user: User;
};
