import { createContext, useContext } from "react";
import io from "socket.io-client";

export const socket = io("http://localhost:8080");

export const SocketsContext = createContext<any>({ socket: null });

export const useSockets = () => {
  return useContext(SocketsContext);
};
