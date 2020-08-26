import React, { useEffect } from 'react'
import Note from './Note'
import noteService from '../services/notes'

const NotesList = ({ notesToShow, toggleImportance, setNotes}) => {

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

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