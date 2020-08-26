import React, { useState } from 'react'

const NoteForm = ({createNote}) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    
    createNote({
      content: newNote,
      important: false
    })

    setNewNote('')
  }
  return (
    <div className='formDiv'>
      <h2 className="title">Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default NoteForm