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
    const loggedUserJSON = window.localStorage.getItem('loggedJotallyUser')
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

  const deleteNote = (id) => {
    noteService.deleteNote(id).then(returnedNote => {
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const logOut = () => {
    localStorage.removeItem('loggedJotallyUser')
    setUser(null)
  }

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
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-urgent" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M8 16v-4a4 4 0 0 1 8 0v4" />
              <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
              <rect x="6" y="16" width="12" height="4" rx="1" />
            </svg>
          </button>


          {user ? <div className="flex-right"><span className="text">{user.name} currently logged in.</span> <button className="button" onClick={() => logOut()}>Log out</button></div> : 
            <div className="flex-right">
              <Link to="/login">
                <button className="button">Login</button>
              </Link>
              <Link to="/register">
                <button className="button">Register</button>
              </Link>
            </div>
          
          }
          
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
            user ? <NotesList notesToShow={notesToShow} toggleImportance={toggleImportance} setNotes={setNotes} createNote={addNote} deleteNote={deleteNote}/> 
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