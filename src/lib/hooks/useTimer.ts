"use client";

import { useEffect, useRef, useState } from "react";

function useLocalStorage(key, initialValue, parseValue = (v) => v) {
  const [item, setValue] = useState(() => {
    const value = parseValue(localStorage.getItem(key)) || initialValue;
    localStorage.setItem(key, value);
    return value;
  });

  const setItem = (newValue) => {
    setValue(newValue);
    window.localStorage.setItem(key, newValue);
  };

  return [item, setItem];
}

function Stopwatch() {
  const [lapse, setLapse] = useLocalStorage("timer:time", 0, (v) => Number(v));
  const [running, setRunning] = useLocalStorage("timer:running", false, (string) => string === "true");
  const timerRef = useRef();

  useEffect(() => {
    const startTime = Date.now() - lapse;
    const timer = setInterval(() => {
      if (running) {
        setLapse(Math.round((Date.now() - startTime) / 1000) * 1000);
      }
    }, 1000);

    timerRef.current = timer;

    return () => clearInterval(timer);
  }, [running, lapse, setLapse]);

  const clear = () => {
    setLapse(0);
    setRunning(false);
    clearInterval(timerRef.current);
  };
}

const useTimer = () => {
  const [lapse, setLapse] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    const startTime = Date.now() - lapse;
    const timer = setInterval(() => {
      if (running) {
        setLapse(Math.round((Date.now() - startTime) / 1000) * 1000);
      }
    }, 1000);

    timerRef.current = timer;

    return () => clearInterval(timer);
  }, [running, lapse, setLapse]);

  const clear = () => {
    setLapse(0);
    setRunning(false);
    clearInterval(timerRef.current);
  };

  return { lapse, setLapse, running, setRunning, clear };
};
export default useTimer;
