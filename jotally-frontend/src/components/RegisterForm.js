import React, { useState } from 'react'
import registerService from '../services/register'
import { useHistory } from 'react-router-dom'


const RegisterForm = ({
  setErrorMessage
}) => {
  const history = useHistory()
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('') 

  const onCancel = (event) => {
    event.preventDefault()
    history.push('/')
  }

  const handleRegister = async (event) => {
    event.preventDefault()

    if(newUsername == '' || newPassword == ''){
      setErrorMessage('Username or Password cannot be left empty.')
      setTimeout(() => {
        setErrorMessage('')
      }, 2500)
      return
    }

    try {
      const user = await registerService.register({
        newUsername, newPassword
      })
      setNewUsername('')
      setNewPassword('')
      history.push('/')
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Error: Could not register. Try again later.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2500)
    }
  }

  return(
    <div>
      <h2 className="title">Register</h2>

      <form onSubmit={handleRegister}>
        <div>
          <label className="subtitle" for="username">Username</label>
          <input
            className="formTextbox"
            id="username"
            value={newUsername}
            onChange={({ target }) => setNewUsername(target.value)}
          />
        </div>

        <div>
        <label className="subtitle" for="password">Password</label>
          <input
            className="formTextbox"
            id="password"
            type="password"
            value={newPassword}
            onChange={({ target }) => setNewPassword(target.value)}
          />
        </div>
        <button className="button" id='login-button' type="submit">Register</button>
        <button className="button" id='cancel-button' onClick={onCancel}>Cancel</button>
      </form>

      
    </div>
  )
}

export default RegisterForm