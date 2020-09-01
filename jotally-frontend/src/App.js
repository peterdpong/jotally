import React, { useState, useEffect, useRef } from 'react'
import noteService from './services/notes'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import RegisterForm from './components/RegisterForm'
import Toggable from './components/Toggable'

import NotesList from './components/NotesList'

import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

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
    if(user){
      noteService.getAll().then(initialNotes => {
        setNotes(initialNotes)
      })
    }
  }, [])

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


  const noteForm = () => (
    <Toggable buttonLabel='New Note' ref={noteFormRef}>
      <NoteForm
        createNote={addNote}/>
    </Toggable>
  )

  return (
    <Router>
      <div className="app">
        <Notification message={errorMessage}/>

        <Link to="/">
          <div className="navbar">
              <img className="logo" src="./res/pencil-svg.svg" alt="Logo"/>
              <h1 className="title">Jotally</h1>
          </div>
        </Link>
        

        <div className="optionsbar">
          <button className="button" onClick={() => setShowAll(!showAll)}>
            Show {showAll ? 'Important' : 'All'}
          </button>
          <div className="flex-right">
            <Link to="/login">
              <button className="button">Login</button>
            </Link>
            <Link to="/register">
              <button className="button">Register</button>
            </Link>
          </div>
        </div>
        

        <Switch>
          <Route path="/login">
            <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            setUser={setUser}
            setErrorMessage={setErrorMessage}
            />
          </Route>

          <Route path="/register">
            <RegisterForm
            setErrorMessage={setErrorMessage}
            />
          </Route>

          <Route path="/" render={() => 
            user ? <NotesList notesToShow={notesToShow} toggleImportance={toggleImportance} setNotes={setNotes}/> 
            : <h3 className="subtitle">You aren't currently logged in. Log in to see your saved notes.</h3>}>
            
          </Route>
        </Switch>

        
        <div className="footer">
          <p className="title">Created by <a className="links" href="https://peterdpong.github.io/">Peter D'Pong</a></p>
          
          <div className="flex-right">
            <p className="title"><a className="links" href="https://github.com/peterdpong/jotally">Source</a></p>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App