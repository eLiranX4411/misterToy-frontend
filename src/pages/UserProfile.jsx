import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout, updatePrefs } from '../store/actions/user.actions.js'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ImgUploader } from '../cmps/ImgUploader.jsx'
// import { userService } from '../services/user.service.js'

export function UserProfile() {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const [bkgColor, setBkgColor] = useState('#b1f0f7')
  const [userName, setUserName] = useState(user.fullname)
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.profileColor) {
      setBkgColor(user.profileColor)
    }
  }, [user])

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

  async function handleColorChange({ target }) {
    const newColor = target.value
    setBkgColor(newColor)

    try {
      await updatePrefs({ ...user, profileColor: newColor })
      showSuccessMsg('Profile color updated!')
    } catch (err) {
      console.error('Failed to update profile color', err)
      showErrorMsg('Could not save color, please try again')
    }
  }

  function handleChange({ target }) {
    const newName = target.value
    setUserName(newName)
  }

  async function handleNameChange() {
    try {
      await updatePrefs({ ...user, fullname: userName })
      showSuccessMsg('Username updated!')
    } catch (err) {
      console.error('Failed to update Username', err)
      showErrorMsg('Could not save Username, please try again')
    }
  }

  return (
    <section className='profile-user-cmp'>
      <main style={{ backgroundColor: bkgColor }} className='profile-user-container'>
        {user && (
          <>
            <ImgUploader />
            <h2>{user.fullname} Profile</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus optio
              perspiciatis magnam laudantium deserunt quo eaque hic, minima in quia dolorem libero
              veniam voluptatum dignissimos doloribus voluptatibus suscipit, animi alias.
            </p>
          </>
        )}
        <p>Change Bkg Color:</p>
        <input className='user-bkg-input' type='color' name='color' onChange={handleColorChange} />
        <p>Change Username:</p>

        <input
          className='user-name-input'
          type='text'
          name='name'
          value={userName}
          onChange={handleChange}
        />
        <button className='name-btn' onClick={handleNameChange}>
          Change Name
        </button>
        <button className='logout-btn' onClick={onLogout}>
          Logout
        </button>
      </main>
    </section>
  )
}

{
  /* <img
className='user-img'
src={`https://robohash.org/${user._id}?set=set5`}
alt='User Img'
/> */
}
