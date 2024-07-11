import React from 'react';

const Sidebar = ({ setActiveComponent }) => {
  return (
    <div className="sidebar">
      <button onClick={() => setActiveComponent('TodoList')}>Todo List</button>
      <button onClick={() => setActiveComponent('Journal')}>Journal</button>
      <button onClick={() => setActiveComponent('Timers')}>Timers</button>
      <button onClick={() => setActiveComponent('Calendar')}>Calendar</button>
    </div>
  );
};

export default Sidebar;
