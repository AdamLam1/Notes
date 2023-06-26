import React from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


const API_URL = 'http://localhost:3001/note';
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTY4NzczNzc3OSwiZXhwIjoxNjk2Mzc3Nzc5fQ.yxIqtKrhF84NbxmubaZs8w1P_o26JOfVtFnbOkbbnSk';

const DeleteNote = ({ noteId }) => {
  const handleDeleteNote = () => {
    axios
      .delete(`${API_URL}/${noteId}`, { headers: { Authorization: AUTH_TOKEN } })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error('Błąd podczas usuwania notatki:', error);
      });
  };

  return (
    <button className='notes__notelist_delete' onClick={handleDeleteNote}>
      <FontAwesomeIcon icon={faXmark} style={{color: "#ff0000",}} />
    </button>
  );
};

export default DeleteNote;