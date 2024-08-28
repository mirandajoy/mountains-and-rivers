import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RoomProvider } from "./context/RoomProvider.tsx";
import { SocketProvider } from "./context/SocketsProvider.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <RoomProvider> */}
    <SocketProvider>
      <App />
    </SocketProvider>
    {/* </RoomProvider> */}
  </React.StrictMode>
);
