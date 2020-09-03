import React, { useState } from 'react'

const NoteForm = ({createNote}) => {
  const [newNoteDesc, setNewNoteDesc] = useState('')
  const [newNoteTitle, setNewNoteTitle] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    
    createNote({
      title: newNoteTitle,
      content: newNoteDesc,
      important: false
    })

    setNewNoteDesc('')
    setNewNoteTitle('')
  }
  return (
    <div className='formDiv'>
      <h2 className="title">Add a new note</h2>

      <form onSubmit={addNote}>
        <div>
          <label className="subtitle" for="username">Title</label>
          <input
            className="formTextbox"
            id="NoteTitle"
            value={newNoteTitle}
            onChange={({ target }) => setNewNoteTitle(target.value)}
          />
        </div>
        
        <div>
          <label className="subtitle" for="username">Note Contents</label>
          <textarea 
            rows="4" cols="25" 
            className="formTextbox textbox-large"
            id="NoteDesc"
            value={newNoteDesc}
            onChange={({ target }) => setNewNoteDesc(target.value)}></textarea>
        </div>
        <button className="button" type="submit">Save</button>
      </form>
    </div>
  )
}

export default NoteForm