import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export function AppHeader() {
  const isSignup = useSelector((storeState) => storeState.userModule.isSignup)
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  // console.log(user)

  return (
    <header className='main-header full'>
      <main className='main-header-content main-layout'>
        <nav className='nav-container'>
          <div className='logo'>
            <NavLink to='/'>MisterToy</NavLink>
          </div>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/toy'>Toys</NavLink>
          <NavLink to='/toy/dashboard'>Dashboard</NavLink>
          {!user ? (
            <NavLink to='/user/loginsignup'>{isSignup ? 'Login' : 'Signup'}</NavLink>
          ) : (
            <NavLink to='/user/profile'>Profile</NavLink>
          )}
        </nav>
      </main>
    </header>
  )
}
