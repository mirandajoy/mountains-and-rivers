import { createContext, useContext } from "react";
import io from "socket.io-client";

export const socket = io(import.meta.env.VITE_SERVER_HOST);

export const SocketsContext = createContext<any>({ socket: null });

export const useSockets = () => {
  return useContext(SocketsContext);
};
