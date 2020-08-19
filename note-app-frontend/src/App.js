import React, { useState, useEffect, useRef } from 'react'
import noteService from './services/notes'
import Note from './components/Note'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Toggable from './components/Toggable'


const Notification = ( {message} ) => {
  if(message == null){
    return null
  }

  return(
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const noteFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])
  console.log("render", notes.length, "notes")

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService.createNote(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote("")})
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService.updateNote(id, changedNote).then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from the server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Toggable buttonLabel='Login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}/>
    </Toggable>
  )

  const noteForm = () => (
    <Toggable buttonLabel='New Note' ref={noteFormRef}>
      <NoteForm
        createNote={addNote}/>
    </Toggable>
  )

  return (
    <div>
      <Notification message={errorMessage}/>

      <div className="inline">
        <h1 className="title">Notes</h1>
        {user === null ? loginForm() : 
          <div className="login-note-form">
            <p className="subtitle">{user.name} currently Logged In</p>
            {noteForm()}
          </div>
        }
      </div>

      <div>
        <button className="button" onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'Important' : 'All'}
        </button>
      </div>
      <ul className="noteList">
        {notesToShow.map(note => 
          <Note 
          key={note.id} 
          note={note}
          toggleImportance={() => toggleImportance(note.id)}
          />)}
      </ul>
      
      <div>
        <p className="title">Note Web App - <a className="links" href="https://peterdpong.github.io/">Peter D'Pong</a></p>
      </div>
    </div>
  )
}

export default App