import { NavLink } from 'react-router-dom'

export function AppHeader() {
  return (
    <header className='main-header full'>
      <main className='main-header-content main-layout'>
        <nav className='nav-container'>
          <div className='logo'>misterToy</div>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/toy'>Toys</NavLink>
        </nav>
      </main>
    </header>
  )
}
