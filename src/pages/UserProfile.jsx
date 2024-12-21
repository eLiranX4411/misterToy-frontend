import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { useNavigate } from 'react-router-dom'

export function UserProfile() {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const navigate = useNavigate()

  async function onLogout() {
    try {
      await logout()
      showSuccessMsg('Logout successfully')
      navigate('/')
    } catch (err) {
      console.log(`problem with logout`, err)
      showErrorMsg('Oops try again')
    }
  }

  return (
    <section className='profile-user-cmp'>
      <main className='profile-user-container'>
        {user && (
          <>
            <img
              className='user-img'
              src={`https://robohash.org/${user._id}?set=set5`}
              alt='User Img'
            />
            <h1>{user.fullname} Profile</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus optio
              perspiciatis magnam laudantium deserunt quo eaque hic, minima in quia dolorem libero
              veniam voluptatum dignissimos doloribus voluptatibus suscipit, animi alias.
            </p>
          </>
        )}
        <button onClick={onLogout}>Logout</button>
      </main>
    </section>
  )
}
