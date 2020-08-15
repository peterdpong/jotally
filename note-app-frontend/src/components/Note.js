import React from 'react'

const Note = ({note, toggleImportance}) => {
  const label = note.important ? "Make not important" : "Make important"

  return (
    <li className='note'>
      <p>{note.content}</p>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note