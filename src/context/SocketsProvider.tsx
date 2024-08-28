import { useEffect } from "react";
import { socket, SocketsContext } from "./SocketsContext";

interface Props {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    const storedRoom = sessionStorage.getItem("room");
    const parsedRoom = storedRoom && JSON.parse(storedRoom);

    socket.on("connect", () => {
      console.log("SocketIO: Connected and authenticated");
      if (!!parsedRoom) {
        socket.emit("joinRoom", parsedRoom);
      }
    });
  }, []);

  return <SocketsContext.Provider value={{ socket: socket }}>{children}</SocketsContext.Provider>;
};
