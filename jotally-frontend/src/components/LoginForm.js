import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2 className="title">Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label className="subtitle" for="username">Username</label>
          <input
            className="formTextbox"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>

        <div>
        <label className="subtitle" for="password">Password</label>
          <input
            className="formTextbox"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="button" id='login-button' type="submit">Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm