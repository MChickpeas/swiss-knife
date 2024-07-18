// src/App.js

import React, { useState } from 'react';
import Shelf from './components/Shelf';
import TodoList from './components/TodoList';
import Journal from './components/Journal';
import Timers from './components/Timers';
import Calendar from './components/Calendar';
import MoneyConverter from './components/MoneyConverter';
import FileExtensionConverter from './components/FileExtensionConverter';
import YouTubeToMp3Converter from './components/YouTubeToMp3Converter';
import StartScreen from './components/StartScreen';
import DesmosCalculator from './components/DesmosCalculator';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('StartScreen');
  const [shelfVisible, setShelfVisible] = useState(false);
  const [journalAuthenticated, setJournalAuthenticated] = useState(false);

  const toggleShelf = () => {
    setShelfVisible(!shelfVisible);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'TodoList':
        return <TodoList />;
      case 'Journal':
        return journalAuthenticated ? <Journal /> : <JournalAuth setJournalAuthenticated={setJournalAuthenticated} />;
      case 'Timers':
        return <Timers />;
      case 'Calendar':
        return <Calendar />;
      case 'MoneyConverter':
        return <MoneyConverter />;
      case 'FileExtensionConverter':
        return <FileExtensionConverter />;
      case 'Calculator':
        return <DesmosCalculator />;
      case 'YouTubeToMp3Converter':
        return <YouTubeToMp3Converter />;
      default:
        return <StartScreen />;
    }
  };

  return (
    <div className="app">
      <Shelf setActiveComponent={setActiveComponent} toggleShelf={toggleShelf} shelfVisible={shelfVisible} />
      <main>{renderComponent()}</main>
    </div>
  );
};

const JournalAuth = ({ setJournalAuthenticated }) => {
  const [password, setPassword] = useState('');

  const handlePasswordSubmit = () => {
    if (password === 'your_password_here') {
      setJournalAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit();
    }
  };

  return (
    <div className="journal-auth">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        onKeyPress={handleKeyPress}
      />
      <button onClick={handlePasswordSubmit}>Submit</button>
    </div>
  );
};

export default App;
