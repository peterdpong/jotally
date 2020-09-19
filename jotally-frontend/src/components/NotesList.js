import React, { useEffect } from 'react'
import Note from './Note'
import noteService from '../services/notes'
import NoteForm from './NoteForm'

const NotesList = ({ notesToShow, toggleImportance, setNotes, createNote}) => {

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  return(
    <div>
      <NoteForm createNote={createNote}/>

      <h2 className="title">Your notes.</h2>
      <ul className="noteList">
          {notesToShow.map(note => 
            <Note 
            key={note.id} 
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
            />)}
      </ul>
    </div>
    
  )

}

export default NotesList