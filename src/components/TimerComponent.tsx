"use client";

import useTimer from "@/lib/hooks/useTimer";
import { FunctionComponent } from "react";

interface TimerComponentProps {
  createdAt: string;
}

const TimerComponent: FunctionComponent<TimerComponentProps> = ({ createdAt }) => {
  const { lapse, setLapse, running, setRunning, clear } = useTimer();

  return <>{lapse}</>;
};

export default TimerComponent;
