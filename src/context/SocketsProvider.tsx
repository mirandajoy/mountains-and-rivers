import { useEffect, useRef, createContext, useContext } from "react";
import { socket, SocketsContext } from "./SocketsContext";

interface Props {
    children: React.ReactNode;
  }

export const SocketProvider: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("SocketIO: Connected and authenticated");
    });
  }, []);

  return <SocketsContext.Provider value={{ socket: socket }}>{children}</SocketsContext.Provider>;
};
