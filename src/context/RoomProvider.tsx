import { createContext, useContext, useState, useEffect } from "react";
import useSessionStorage from "../hooks/useSessionStorage";

const RoomContext = createContext<any>("");
const UpdateRoomContext = createContext<any>("");

export function useRoom() {
  return useContext(RoomContext);
}

export function useRoomUpdate() {
  return useContext(UpdateRoomContext);
}

interface Props {
  children: React.ReactNode;
}

export const RoomProvider: React.FC<Props> = ({ children }) => {
  const [room, setRoom] = useSessionStorage("room", "");

  function updateRoom(roomId: number) {
    setRoom("room", roomId);
  }

  const checkRoom = () => {
    const storedRoom = sessionStorage.getItem("room");
    const parsedRoom = storedRoom && JSON.parse(storedRoom);
    if (!!room) {
      updateRoom(parsedRoom);
    }
  };

  useEffect(() => {
    checkRoom();
  }, []);

  return (
    <RoomContext.Provider value={room}>
      <UpdateRoomContext.Provider value={updateRoom}>{children}</UpdateRoomContext.Provider>
    </RoomContext.Provider>
  );
};
