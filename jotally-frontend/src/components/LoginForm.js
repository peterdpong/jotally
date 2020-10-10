import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import noteService from '../services/notes'
import loginService from '../services/login'




const LoginForm = ({
  username,
  password,
  setUser,
  setUsername,
  setPassword,
  setErrorMessage
  
}) => {

  const history = useHistory()

  const onCancel = (event) => {
    event.preventDefault()
    history.push('/')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
  
      window.localStorage.setItem(
        'loggedJotallyUser', JSON.stringify(user)
      )
  
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      history.push('/')
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Wrong username or password.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2500)
    } 
  }


  return (
    <div>
      <h2 className="title">Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label className="subtitle" for="username">Username</label>
          <input
            className="formTextbox"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
        <label className="subtitle" for="password">Password</label>
          <input
            className="formTextbox"
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className="button" id='login-button' type="submit">Login</button>
        <button className="button" id='cancel-button' onClick={onCancel}>Cancel</button>
      </form>

      
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
}

export default LoginForm