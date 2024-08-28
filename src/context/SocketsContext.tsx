import { createContext, useContext } from "react";
import io from "socket.io-client";
const serverURL = import.meta.env.VITE_API_URL;

export const socket = io(serverURL);

export const SocketsContext = createContext<any>({ socket: null });

export const useSockets = () => {
  return useContext(SocketsContext);
};
