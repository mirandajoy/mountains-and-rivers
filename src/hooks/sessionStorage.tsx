import { useEffect, useState } from "react";

const getSessionValue = (key: string, initialValue: string | number ) => {
  const sessionValue = JSON.parse(sessionStorage.getItem(key) || '');
  if (sessionValue) return sessionValue;

  return initialValue;
};

const useSessionStorage = (key: string, initialValue: string | number ) => {
  const [sessionValue, setSessionValue] = useState(() => {
    return getSessionValue(key, initialValue);
  })

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(sessionValue))
  }, [sessionValue])

  return [sessionValue, setSessionValue];
};

export default useSessionStorage;
