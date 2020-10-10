import React from 'react'

const Note = ({note, toggleImportance, deleteNote}) => {
  const importanceicon = note.important ? <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-urgent" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F44336" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M8 16v-4a4 4 0 0 1 8 0v4" />
  <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
  <rect x="6" y="16" width="12" height="4" rx="1" />
</svg> : <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-urgent" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M8 16v-4a4 4 0 0 1 8 0v4" />
  <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
  <rect x="6" y="16" width="12" height="4" rx="1" />
</svg>

const deleteIcon = <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<line x1="18" y1="6" x2="6" y2="18" />
<line x1="6" y1="6" x2="18" y2="18" />
</svg>

  return (
    <li className='note'>
      <p>{note.content}</p>
      <button className="button button-note" onClick={toggleImportance}>{importanceicon}</button>
      <button className="button button-note" onClick={deleteNote}>{deleteIcon}</button>
    </li>
  )
}

export default Note

