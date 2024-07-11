// src/components/Journal.js
import React, { useState, useEffect } from 'react';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('entries'));
    if (savedEntries) {
      setEntries(savedEntries);
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('entries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    setEntries([...entries, { text: newEntry, editable: false }]);
    setNewEntry('');
  };

  const editEntry = index => {
    const newEntries = [...entries];
    newEntries[index].editable = !newEntries[index].editable;
    setEntries(newEntries);
  };

  const updateEntry = (index, text) => {
    const newEntries = [...entries];
    newEntries[index].text = text;
    newEntries[index].editable = false;
    setEntries(newEntries);
  };

  const deleteEntry = index => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  return (
    <div className="journal">
      <textarea 
        value={newEntry} 
        onChange={(e) => setNewEntry(e.target.value)} 
        placeholder="Write a new journal entry"
      />
      <button onClick={addEntry}>Add Entry</button>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>
            {entry.editable ? (
              <textarea 
                value={entry.text} 
                onChange={(e) => updateEntry(index, e.target.value)} 
                onBlur={() => updateEntry(index, entry.text)}
              />
            ) : (
              <span onClick={() => editEntry(index)}>
                {entry.text}
              </span>
            )}
            <button onClick={() => editEntry(index)}>Edit</button>
            <button onClick={() => deleteEntry(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Journal;
