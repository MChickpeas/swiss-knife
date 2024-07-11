import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    setTodos([...todos, { text: newTodo, completed: false, editable: false }]);
    setNewTodo('');
  };

  const toggleTodo = index => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = index => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const editTodo = index => {
    const newTodos = [...todos];
    newTodos[index].editable = !newTodos[index].editable;
    setTodos(newTodos);
  };

  const updateTodo = (index, text) => {
    const newTodos = [...todos];
    newTodos[index].text = text;
    newTodos[index].editable = false;
    setTodos(newTodos);
  };

  return (
    <div className="todo-list">
      <input 
        type="text" 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.editable ? (
              <input 
                type="text" 
                value={todo.text} 
                onChange={(e) => updateTodo(index, e.target.value)} 
                onBlur={() => updateTodo(index, todo.text)}
              />
            ) : (
              <span 
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                onClick={() => toggleTodo(index)}
              >
                {todo.text}
              </span>
            )}
            <button onClick={() => editTodo(index)}>Edit</button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
