// src/App.js

import React, { useState } from 'react';
import Shelf from './components/Shelf';
import TodoList from './components/TodoList';
import Journal from './components/Journal';
import Timers from './components/Timers';
import Calendar from './components/Calendar';
import MoneyConverter from './components/MoneyConverter';
import FileExtensionConverter from './components/FileExtensionConverter';
import Calculator from './components/Calculator';
import YouTubeToMp3Converter from './components/YouTubeToMp3Converter';
import StartScreen from './components/StartScreen';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('StartScreen');
  const [shelfVisible, setShelfVisible] = useState(false);

  const toggleShelf = () => setShelfVisible(!shelfVisible);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'TodoList':
        return <TodoList />;
      case 'Journal':
        return <Journal />;
      case 'Timers':
        return <Timers />;
      case 'Calendar':
        return <Calendar />;
      case 'MoneyConverter':
        return <MoneyConverter />;
      case 'FileExtensionConverter':
        return <FileExtensionConverter />;
      case 'Calculator':
        return <Calculator />;
      case 'YouTubeToMp3Converter':
        return <YouTubeToMp3Converter />;
      case 'StartScreen':
      default:
        return <StartScreen setActiveComponent={setActiveComponent} />;
    }
  };

  return (
    <div className="app">
      <Shelf setActiveComponent={setActiveComponent} toggleShelf={toggleShelf} shelfVisible={shelfVisible} />
      <main>{renderComponent()}</main>
    </div>
  );
};

export default App;
