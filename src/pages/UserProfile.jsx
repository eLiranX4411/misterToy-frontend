import { useSelector, useDispatch } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function UserProfile() {
  const isSignup = useSelector((storeState) => storeState.userModule.isSignup)
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const dispatch = useDispatch()

  return (
    <section className='profile-user-cmp'>
      <main className='profile-user-container'>
        <h1>Hey {user.fullname}</h1>
      </main>
    </section>
  )
}
