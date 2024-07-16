// src/components/DesmosCalculator.js
import React from 'react';

const DesmosCalculator = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Scientific Calculator</h1>
      <iframe
        title="Desmos Scientific Calculator"
        src="https://www.desmos.com/scientific"
        style={styles.iframe}
      ></iframe>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#121212',
    color: '#ffffff',
  },
  title: {
    marginBottom: '20px',
  },
  iframe: {
    width: '450%',
    height: '100vh',
    border: 'none'
  },
};

export default DesmosCalculator;
