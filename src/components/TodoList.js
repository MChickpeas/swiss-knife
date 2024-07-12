// src/components/TodoList.js

import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState('Low');
  const [newCategory, setNewCategory] = useState('');
  const [newRecurring, setNewRecurring] = useState('None');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const [addingSubtaskIndex, setAddingSubtaskIndex] = useState(null);
  const [newSubtask, setNewSubtask] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, dueDate: newDueDate, priority: newPriority, category: newCategory, recurring: newRecurring, subtasks: [], completed: false }]);
      setNewTodo('');
      setNewDueDate('');
      setNewPriority('Low');
      setNewCategory('');
      setNewRecurring('None');
    }
  };

  const addSubtask = (event, todoIndex) => {
    event.preventDefault();
    if (newSubtask.trim() !== '') {
      const newTodos = [...todos];
      newTodos[todoIndex].subtasks.push({ text: newSubtask, completed: false });
      setTodos(newTodos);
      setNewSubtask('');
      setAddingSubtaskIndex(null);
    }
  };

  const toggleTodo = index => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const toggleSubtask = (todoIndex, subtaskIndex) => {
    const newTodos = [...todos];
    newTodos[todoIndex].subtasks[subtaskIndex].completed = !newTodos[todoIndex].subtasks[subtaskIndex].completed;
    setTodos(newTodos);
  };

  const deleteTodo = index => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const deleteSubtask = (todoIndex, subtaskIndex) => {
    const newTodos = [...todos];
    newTodos[todoIndex].subtasks = newTodos[todoIndex].subtasks.filter((_, i) => i !== subtaskIndex);
    setTodos(newTodos);
  };

  const editTodo = (index) => {
    setEditingIndex(index);
    setEditingValue(todos[index].text);
  };

  const updateTodo = (event) => {
    event.preventDefault();
    const newTodos = [...todos];
    newTodos[editingIndex].text = editingValue;
    setTodos(newTodos);
    setEditingIndex(null);
    setEditingValue('');
  };

  const filterTodos = (todos) => {
    return todos.filter(todo => 
      (filterPriority === 'All' || todo.priority === filterPriority) &&
      (filterCategory === 'All' || todo.category === filterCategory) &&
      (todo.text.toLowerCase().includes(searchText.toLowerCase()))
    );
  };

  return (
    <div className="todo-list">
      <h1>TODO</h1>
      <form onSubmit={addTodo} className="form">
        <input 
          type="text" 
          value={newTodo} 
          onChange={(e) => setNewTodo(e.target.value)} 
          placeholder="Add a new todo"
        />
        <input 
          type="date" 
          value={newDueDate} 
          onChange={(e) => setNewDueDate(e.target.value)} 
        />
        <select 
          value={newPriority} 
          onChange={(e) => setNewPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <input 
          type="text" 
          value={newCategory} 
          onChange={(e) => setNewCategory(e.target.value)} 
          placeholder="Category"
        />
        <select 
          value={newRecurring} 
          onChange={(e) => setNewRecurring(e.target.value)}
        >
          <option value="None">None</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
        <button type="submit">Add</button>
      </form>
      <div className="filters">
        <input 
          type="text" 
          value={searchText} 
          onChange={(e) => setSearchText(e.target.value)} 
          placeholder="Search todos"
        />
        <select 
          value={filterPriority} 
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select 
          value={filterCategory} 
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <ul>
        {filterTodos(todos).map((todo, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <form onSubmit={updateTodo} className="form-inline">
                <input 
                  type="text" 
                  value={editingValue} 
                  onChange={(e) => setEditingValue(e.target.value)} 
                  autoFocus
                />
              </form>
            ) : (
              <div className="todo-item">
                <span 
                  style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                  onClick={() => toggleTodo(index)}
                >
                  {todo.text} {todo.dueDate && `- Due: ${todo.dueDate}`} {todo.priority && `- Priority: ${todo.priority}`} {todo.category && `- Category: ${todo.category}`}
                </span>
                <div className="actions">
                  <button onClick={() => editTodo(index)}>Edit</button>
                  <button onClick={() => deleteTodo(index)}>Delete</button>
                  <button onClick={() => setAddingSubtaskIndex(index)}>Add Subtask</button>
                </div>
              </div>
            )}
            {addingSubtaskIndex === index && (
              <form onSubmit={(event) => addSubtask(event, index)} className="form-inline">
                <input 
                  type="text" 
                  value={newSubtask} 
                  onChange={(e) => setNewSubtask(e.target.value)} 
                  placeholder="New subtask"
                />
                <button type="submit">Add Subtask</button>
              </form>
            )}
            <ul className="subtasks">
              {todo.subtasks.map((subtask, subIndex) => (
                <li key={subIndex} className="subtask-item">
                  <span 
                    style={{ textDecoration: subtask.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                    onClick={() => toggleSubtask(index, subIndex)}
                  >
                    {subtask.text}
                  </span>
                  <button onClick={() => deleteSubtask(index, subIndex)}>Delete</button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
