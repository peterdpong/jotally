import React from 'react'
import Note from './Note'

const NotesList = ({ notesToShow, toggleImportance}) => {

  return(
    <ul className="noteList">
        {notesToShow.map(note => 
          <Note 
          key={note.id} 
          note={note}
          toggleImportance={() => toggleImportance(note.id)}
          />)}
    </ul>
  )

}

export default NotesList