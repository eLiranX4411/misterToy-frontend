/* eslint-disable react/prop-types */

import { useState } from 'react'
import { userService } from '../services/user.service.js'
import { useNavigate } from 'react-router'

export function LoginForm({ onLogin, isSignup }) {
  const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
  const navigate = useNavigate()

  function handleChange({ target }) {
    const { name: field, value } = target
    setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    onLogin(credentials)
    navigate('/')
  }

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <h1>
        {isSignup
          ? `Nice to see you again! Please login`
          : `Welcome, Please Fill the form below and Signup`}
      </h1>
      <input
        type='text'
        name='username'
        value={credentials.username}
        placeholder='Username'
        onChange={handleChange}
        required
        autoFocus
      />
      <input
        type='password'
        name='password'
        value={credentials.password}
        placeholder='Password'
        onChange={handleChange}
        required
        autoComplete='off'
      />
      {!isSignup && (
        <input
          type='text'
          name='fullname'
          value={credentials.fullname}
          placeholder='Full name'
          onChange={handleChange}
          required
        />
      )}
      <button>{isSignup ? 'Login' : 'Signup'}</button>
    </form>
  )
}
