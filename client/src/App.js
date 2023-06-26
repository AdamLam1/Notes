import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleLogin, GoogleLogout } from '@dump-work/react-google-login';
import { gapi } from 'gapi-script';

import './index.css';

import SearchBar from './components/SearchBar';
import NoteList from './components/NoteList';
import FoundNote from './components/FoundNote';
import NewNote from './components/NewNote';
import EditNote from './components/EditNote'; // Nowy komponent do edycji notatki

const clientId = '336667597768-n5ckta12vsl4ac3s5ssk9l9j1a08njot.apps.googleusercontent.com';
const API_URL = 'http://localhost:3001/note';
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTY4NzczNzc3OSwiZXhwIjoxNjk2Mzc3Nzc5fQ.yxIqtKrhF84NbxmubaZs8w1P_o26JOfVtFnbOkbbnSk';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [foundNote, setFoundNote] = useState(null);
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [editNote, setEditNote] = useState(null); // Stan do przechowywania notatki do edycji

  const responseFailed = (response) => {
    console.log('Nie zalogowano/Wylogowano!');
    localStorage.removeItem('userName');
    window.location.reload();
  }

  const responseGoogle = (response) => {
    setUserName(response.profileObj.name);
    localStorage.setItem('userName', response.profileObj.name);
  }

  const LoginButton = () => {
    return (
      <div id='signInButton'>
          <GoogleLogin 
              clientId={clientId}
              buttonText='Zaloguj się'
              onSuccess={responseGoogle}
              onFailure={responseFailed}
              cookiePolicy={'single-host-origin'}
              isSignedIn={true}
          />
      </div>
    )
  }

  const LogoutButton = () => {
    return (
      <div id='signOutButton'>
          <GoogleLogout 
              clientId={clientId}
              buttonText={'Wyloguj sie'}
              onLogoutSuccess={responseFailed}
          />
      </div>
    )
  }

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    axios
      .get(API_URL, { headers: { Authorization: AUTH_TOKEN } })
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error('Błąd podczas pobierania notatek:', error);
      });
  };

  const searchNote = (searchId) => {
    axios
      .get(`${API_URL}/${searchId}`, { headers: { Authorization: AUTH_TOKEN } })
      .then((response) => {
        setFoundNote(response.data);
      })
      .catch((error) => {
        console.error('Błąd podczas wyszukiwania notatki:', error);
      });
  };

  const addNote = () => {
    getNotes(); 
  };

  const editNoteHandler = (note) => {
    setEditNote(note);
  };

  const saveNote = (updatedNote) => {
    axios
      .put(`${API_URL}/${updatedNote.id}`, updatedNote, { headers: { Authorization: AUTH_TOKEN } })
      .then((response) => {
        // Aktualizuj stan notatek po zapisaniu edytowanej notatki
        getNotes();
        setEditNote(null); // Wyłącz tryb edycji
      })
      .catch((error) => {
        console.error('Błąd podczas aktualizacji notatki:', error);
      });
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    }
    gapi.load('client:auth2', start);
  });

  return (
    <div>
      {!userName && <LoginButton />}
      {userName && <LogoutButton />}
      {userName && <SearchBar onSearch={searchNote} />}
      {userName && <NewNote onAddNote={addNote}/>}
      {foundNote && <FoundNote note={foundNote} />}
      {editNote && <EditNote note={editNote} onSave={saveNote} />} {/* Dodaj komponent EditNote */}
      {userName && (
        <NoteList
          notes={notes}
          onEditNote={editNoteHandler} // Przekaż funkcję obsługującą edycję notatki
        />
      )}
    </div>
  );
};

export default App;