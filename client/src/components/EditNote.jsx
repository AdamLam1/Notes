import React, { useState } from 'react';
import axios from 'axios';

import '../index.css';

const API_URL = 'http://localhost:3001/note';
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTY4NzczNzc3OSwiZXhwIjoxNjk2Mzc3Nzc5fQ.yxIqtKrhF84NbxmubaZs8w1P_o26JOfVtFnbOkbbnSk';


const EditNote = ({ note }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {

    const newNote = {
        title: title,
        content: content,
        author: localStorage.getItem('userName')
      };

    axios.put(`${API_URL}/${note.ID}`, null, {
        headers: {
          Authorization: AUTH_TOKEN
        },
        params: newNote
      }).then((response) => {
        window.location.reload();
      }).catch((error) => {
        console.error('Błąd podczas edytowania notatki:', error);
      });

  };

  return (
    <div className='note_edit__all'>
      <form className='note_edit__container' onSubmit={handleSubmit}>
        <label>
          <input style={{width: '750px'}} type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <label>
          <textarea style={{width: '750px', height: '300px'}} value={content} onChange={handleContentChange} />
        </label>
        <br />
        <button onClick={handleSubmit} type="submit">Zapisz</button>
      </form>
    </div>
  );
};

export default EditNote;