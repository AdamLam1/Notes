import React, { useState } from 'react';

import EditNote from './EditNote'
import DeleteNote from './DeleteNote'

const FoundNote = ({ note }) => {

  const [editNoteId, setEditNoteId] = useState(null);

  const handleEditNote = (noteId) => {
    if (editNoteId === noteId) {
      setEditNoteId(null);
    } else {
      setEditNoteId(noteId);
    }
  };

    return (
      <div className='notes__notelist_note fundNote__note' key={note.ID}>
        Wyniki wyszukiwania
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
    );
};

export default FoundNote