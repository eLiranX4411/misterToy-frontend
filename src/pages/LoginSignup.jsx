import { useSelector, useDispatch } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, signup, toggleIsSignUp } from '../store/actions/user.actions.js'
import { LoginForm } from '../cmps/LoginForm.jsx'

export function LoginSignup() {
  const isSignup = useSelector((storeState) => storeState.userModule.isSignup)
  const dispatch = useDispatch()

  function onLogin(credentials) {
    isSignup ? _signup(credentials) : _login(credentials)
  }

  function _login(credentials) {
    login(credentials)
      .then(() => {
        showSuccessMsg('Logged in successfully')
      })
      .catch((err) => {
        console.log(`problem with login`, err)
        showErrorMsg('Oops try again')
      })
  }

  function _signup(credentials) {
    signup(credentials)
      .then(() => {
        showSuccessMsg('Signed in successfully')
      })
      .catch((err) => {
        console.log(`problem with signup`, err)
        showErrorMsg('Oops try again')
      })
  }

  function toggleSignup() {
    dispatch(toggleIsSignUp(!isSignup))
  }

  return (
    <section className='login-user-cmp'>
      <main className='login-user-container'>
        <div className='login-page'>
          <LoginForm onLogin={onLogin} isSignup={isSignup} />
          <div className='btns'>
            <a href='#' onClick={toggleSignup}>
              {isSignup ? 'New user? Signup here' : 'Already a member? Login'}
            </a>
          </div>
        </div>
      </main>
    </section>
  )
}
