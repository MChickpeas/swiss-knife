// src/components/StartScreen.js
import React from 'react';

const StartScreen = ({ onSelect }) => {
  return (
    <div style={styles.container}>
      <img src="/swiss-knife-logo.png" alt="Swiss Knife Logo" style={styles.logo} />
      <h1 style={styles.text}>Swiss Knife</h1>
      <div style={styles.buttons}>
        <button onClick={() => onSelect('TodoList')} style={styles.button}>Todo List</button>
        <button onClick={() => onSelect('Journal')} style={styles.button}>Journal</button>
        <button onClick={() => onSelect('Timers')} style={styles.button}>Timers</button>
        <button onClick={() => onSelect('Calendar')} style={styles.button}>Calendar</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  logo: {
    width: '150px',
    marginBottom: '20px',
  },
  text: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

export default StartScreen;
