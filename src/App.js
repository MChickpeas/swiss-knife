import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TodoList from './components/TodoList';
import Journal from './components/Journal';
import Timers from './components/Timers';
import Calendar from './components/Calendar';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('TodoList');

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
      default:
        return <TodoList />;
    }
  };

  return (
    <div className="app">
      <Sidebar setActiveComponent={setActiveComponent} />
      <main>{renderComponent()}</main>
    </div>
  );
};

export default App;
