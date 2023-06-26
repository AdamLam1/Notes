import React, { useState } from 'react';

import DeleteNote from './DeleteNote';
import EditNote from './EditNote';

const NoteList = ({ notes, onDeleteNote }) => {
  const reversedNotes = [...notes].reverse();
  const [editNoteId, setEditNoteId] = useState(null);

  const handleEditNote = (noteId) => {
    if (editNoteId === noteId) {
      setEditNoteId(null);
    } else {
      setEditNoteId(noteId);
    }
  };

  return (
    <div className='notes__notelist'>
      {reversedNotes.map((note) => (
        <div className='notes__notelist_note' key={note.ID}>
          <div className='notes__notelist_title_container'>
            <p className='notes__notelist_title'>{note.title}</p>
          </div>
          <p className='notes__notelist_content'>{note.content}</p>
          <div className='notes__notelist_author_container'>
            <p className='notes__notelist_author'>
              Autor: {note.author} ID: {note.ID}
            </p>
          </div>
          <DeleteNote noteId={note.ID} />
          <button className='notes__notelist_edit' onClick={() => handleEditNote(note.ID)}>
            {editNoteId === note.ID ? 'Wyłącz' : 'Edytuj'}
          </button>
          {editNoteId === note.ID && <EditNote note={note} />}
        </div>
      ))}
    </div>
  );
};

export default NoteList;