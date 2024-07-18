// src/components/Journal.js

import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../styles/Journal.css';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [currentMood, setCurrentMood] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries'));
    if (savedEntries) setEntries(savedEntries);
  }, []);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    const saveInterval = setInterval(() => {
      saveEntry();
    }, 30000); // Save every 30 seconds
    return () => clearInterval(saveInterval);
  }, [editorState, currentMood]);

  const saveEntry = () => {
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) return; // Don't save empty entries

    const rawContent = JSON.stringify(convertToRaw(contentState));
    setEntries([...entries, { content: rawContent, date: new Date(), mood: currentMood, tags: [] }]);
    setEditorState(EditorState.createEmpty());
    setCurrentMood('');
  };

  const onEditorStateChange = (state) => {
    setEditorState(state);
  };

  const filterEntries = () => {
    return entries.filter(entry =>
      JSON.parse(entry.content).blocks.some(block =>
        block.text.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  const deleteEntry = (index) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setEntries(entries.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="journal">
      <h1>Journal</h1>
      <div className="editor">
        <Editor
          editorState={editorState}
          toolbarClassName="toolbar"
          wrapperClassName="wrapper"
          editorClassName="editor-content"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
      <input
        type="text"
        value={currentMood}
        onChange={(e) => setCurrentMood(e.target.value)}
        placeholder="Mood"
        className="mood-input"
      />
      <button onClick={saveEntry}>Save Entry</button>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search entries"
        className="search-bar"
      />
      <ul className="entries-list">
        {filterEntries().map((entry, index) => (
          <li key={index} className="entry-item">
            <div className="entry-date">{new Date(entry.date).toLocaleString()}</div>
            <div className="entry-mood">Mood: {entry.mood}</div>
            <div className="entry-content">
              <Editor
                editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(entry.content)))}
                readOnly
                toolbarHidden
              />
            </div>
            <button onClick={() => deleteEntry(index)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Journal;
