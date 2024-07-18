// src/components/Timers.js

import React, { useState, useEffect, useRef } from 'react';
import '../styles/Timers.css';

const Timers = () => {
  const [timers, setTimers] = useState([]);
  const [newLabel, setNewLabel] = useState('');
  const [newDuration, setNewDuration] = useState('');
  const [mode, setMode] = useState('countdown');

  const intervalRef = useRef({});

  const addTimer = () => {
    if (newLabel.trim() === '' || (mode === 'countdown' && newDuration.trim() === '')) return;

    setTimers([
      ...timers,
      {
        id: Date.now(),
        label: newLabel,
        duration: mode === 'countdown' ? parseInt(newDuration) * 60 : 0,
        remaining: mode === 'countdown' ? parseInt(newDuration) * 60 : 0,
        running: false,
        mode,
      },
    ]);

    setNewLabel('');
    setNewDuration('');
  };

  const toggleTimer = (id) => {
    setTimers((timers) =>
      timers.map((timer) => {
        if (timer.id === id) {
          if (timer.running) {
            clearInterval(intervalRef.current[id]);
            return { ...timer, running: false };
          } else {
            const intervalId = setInterval(() => {
              setTimers((timers) =>
                timers.map((t) => {
                  if (t.id === id) {
                    if (t.mode === 'countdown') {
                      if (t.remaining > 0) {
                        return { ...t, remaining: t.remaining - 1 };
                      } else {
                        clearInterval(intervalRef.current[id]);
                        alert(`Timer "${t.label}" finished!`);
                        return { ...t, running: false };
                      }
                    } else {
                      return { ...t, remaining: t.remaining + 1 };
                    }
                  }
                  return t;
                })
              );
            }, 1000);

            intervalRef.current[id] = intervalId;
            return { ...timer, running: true };
          }
        }
        return timer;
      })
    );
  };

  const resetTimer = (id) => {
    clearInterval(intervalRef.current[id]);
    setTimers((timers) =>
      timers.map((timer) =>
        timer.id === id ? { ...timer, remaining: timer.duration, running: false } : timer
      )
    );
  };

  const deleteTimer = (id) => {
    clearInterval(intervalRef.current[id]);
    setTimers((timers) => timers.filter((timer) => timer.id !== id));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    return () => {
      timers.forEach((timer) => clearInterval(intervalRef.current[timer.id]));
    };
  }, [timers]);

  return (
    <div className="timers">
      <h1>Timers</h1>
      <div className="new-timer-form">
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Label"
        />
        {mode === 'countdown' && (
          <input
            type="number"
            value={newDuration}
            onChange={(e) => setNewDuration(e.target.value)}
            placeholder="Duration (minutes)"
          />
        )}
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="countdown">Countdown</option>
          <option value="stopwatch">Stopwatch</option>
        </select>
        <button onClick={addTimer}>Add Timer</button>
      </div>
      <ul className="timers-list">
        {timers.map((timer) => (
          <li key={timer.id} className="timer-item">
            <div className="timer-label">{timer.label}</div>
            <div className="timer-time">{formatTime(timer.remaining)}</div>
            <div className="timer-controls">
              <button onClick={() => toggleTimer(timer.id)}>
                {timer.running ? 'Pause' : 'Start'}
              </button>
              <button onClick={() => resetTimer(timer.id)}>Reset</button>
              <button onClick={() => deleteTimer(timer.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timers;
