// src/components/Timers.js
import React, { useState, useRef } from 'react';

const Timers = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    setIsActive(true);
    timerRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    setIsActive(false);
    clearInterval(timerRef.current);
  };

  const resetTimer = () => {
    setIsActive(false);
    clearInterval(timerRef.current);
    setTime(0);
  };

  return (
    <div className="timers">
      <h2>Timer</h2>
      <div>{time} seconds</div>
      <button onClick={startTimer} disabled={isActive}>Start</button>
      <button onClick={stopTimer} disabled={!isActive}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Timers;
