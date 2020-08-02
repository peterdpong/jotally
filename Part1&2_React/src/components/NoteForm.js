import React, {userState, useState} from 'react'

const NoteForm = ({createNote}) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    
    createNote({
      content: newNote,
      important: Math.random() > 0.5
    })

    setNewNote('')
  }
  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}