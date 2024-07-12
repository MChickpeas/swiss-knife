// src/components/StartScreen.js
import React from 'react';

const StartScreen = () => {
  return (
    <div style={styles.container}>
      <img src="swiss-knife-logo.png" alt="Swiss knife logo" style={styles.logo} />
      <h1 style={styles.text}>Swiss Knife</h1>
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
};

export default StartScreen;
