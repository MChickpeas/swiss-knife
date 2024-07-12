// src/components/Shelf.js
import React from 'react';
import { FaList, FaBook, FaClock, FaCalendarAlt, FaBars } from 'react-icons/fa';

const Shelf = ({ setActiveComponent, toggleShelf, shelfVisible }) => {
  return (
    <div style={{ ...styles.shelf, left: shelfVisible ? '0' : '-60px' }}>
      <button onClick={toggleShelf} style={styles.toggleButton}>
        <FaBars />
      </button>
      {shelfVisible && (
        <>
          <button onClick={() => setActiveComponent('TodoList')} style={styles.iconButton}>
            <FaList />
          </button>
          <button onClick={() => setActiveComponent('Journal')} style={styles.iconButton}>
            <FaBook />
          </button>
          <button onClick={() => setActiveComponent('Timers')} style={styles.iconButton}>
            <FaClock />
          </button>
          <button onClick={() => setActiveComponent('Calendar')} style={styles.iconButton}>
            <FaCalendarAlt />
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  shelf: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: '10px',
    width: '60px',
    height: '100vh',
    position: 'fixed',
    left: '0',
    top: '5rem',
    transition: 'left 0.3s',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
  },
  toggleButton: {
    position: 'fixed',
    top: '20px',  // Move the toggle button down a bit
    left: '20px', // Move the toggle button to the right
    marginBottom: '20px',
    fontSize: '1.75rem',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    color: '#ffffff',
    zIndex: '1000',
  },
  iconButton: {
    margin: '30px 0', // Increase the margin to move icons further down
    fontSize: '1.5rem',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    color: '#ffffff'
  },
};

export default Shelf;
