import React, { useState } from 'react';
import Shelf from './components/Shelf';
import TodoList from './components/TodoList';
import Journal from './components/Journal';
import Timers from './components/Timers';
import Calendar from './components/Calendar';
import StartScreen from './components/StartScreen';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('StartScreen');
  const [shelfVisible, setShelfVisible] = useState(false);

  const toggleShelf = () => {
    setShelfVisible(!shelfVisible);
  };

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
      case 'StartScreen':
      default:
        return <StartScreen onSelect={setActiveComponent} />;
    }
  };

  return (
    <div className="app">
      <Shelf setActiveComponent={setActiveComponent} toggleShelf={toggleShelf} shelfVisible={shelfVisible} />
      <main style={{ marginLeft: shelfVisible ? '60px' : '0', transition: 'margin-left 0.3s', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {renderComponent()}
      </main>
    </div>
  );
};

export default App;
