import { useCallback } from "react";

const useRoomID = () => {
  const createRoomId = useCallback(() => {
    let roomId = "";
    for (let i = 0; i < 9; i++) {
      roomId += Math.floor(Math.random() * 10);
    }
    return roomId;
  }, []);

  return { createRoomId };
};

export default useRoomID;
