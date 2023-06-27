import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/note';
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTY4NzczNzc3OSwiZXhwIjoxNjk2Mzc3Nzc5fQ.yxIqtKrhF84NbxmubaZs8w1P_o26JOfVtFnbOkbbnSk';

const NewNote = ({ onAddNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleAddNote = () => {
    const newNote = {
      title: title,
      content: content,
      author: localStorage.getItem('userName')
    };

    axios
      .post(API_URL, null, {
        headers: {
          Authorization: AUTH_TOKEN
        },
        params: newNote
      })
      .then((response) => {
        onAddNote();
        setTitle('');
        setContent('');
      })
      .catch((error) => {
        console.error('Błąd podczas dodawania notatki:', error);
      });
  };

  return (
    <div className='newNote__container'>
      <div>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Tytuł"
          className='newNote__container_title'
        />
        <input
          type="text"
          value={content}
          onChange={handleContentChange}
          placeholder="Treść"
          className='newNote__container_content'
        />
        <button className='newNote__container_button' onClick={handleAddNote}>Dodaj</button>
      </div>
    </div>
  );
};

export default NewNote;