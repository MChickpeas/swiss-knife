// src/components/Shelf.js
import React from 'react';
import { FaList, FaBook, FaClock, FaCalendarAlt, FaBars } from 'react-icons/fa';

const Shelf = ({ setActiveComponent, toggleShelf, shelfVisible }) => {
  return (
    <div style={styles.shelf}>
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
    backgroundColor: '#f4f4f4',
    padding: '10px',
    width: '60px',
    height: '100vh',
    position: 'fixed',
    left: '0',
    top: '0',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
  },
  toggleButton: {
    marginBottom: '20px',
    fontSize: '1.5rem',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
  },
  iconButton: {
    margin: '10px 0',
    fontSize: '1.5rem',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
  },
};

export default Shelf;
