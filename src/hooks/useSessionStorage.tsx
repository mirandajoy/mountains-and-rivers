import { useEffect, useState } from "react";
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

interface DiceResults {
  dieA: number;
  dieB: number;
  total: number | null;
}

const getSessionValue = (key: string, initialValue: string | number | DiceResults | null ) => {
  const sessionValue = JSON.parse(sessionStorage.getItem(key) || 'null');
  if (sessionValue) return sessionValue;

  return initialValue;
};

const useSessionStorage = (key: string, initialValue: string | number | DiceResults | null ) => {
  const [sessionValue, setSessionValue] = useState(() => {
    return getSessionValue(key, initialValue);
  })

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(sessionValue))
  }, [sessionValue])

  return [sessionValue, setSessionValue];
};

export default useSessionStorage;
