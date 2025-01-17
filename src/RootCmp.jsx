import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './store/store.js'
import { Provider } from 'react-redux'

import { Home } from './pages/Home.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { ToyDashboard } from './pages/ToyDashboard.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { UserProfile } from './pages/UserProfile.jsx'
import { ReviewExplore } from './pages/ReviewExplore.jsx'
import { ChatRoom } from './cmps/ChatRoom.jsx'

export function RootCmp() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <section className='main-layout app'>
          <AppHeader />
          <main>
            <Routes>
              <Route element={<Home />} path='/' />
              <Route element={<AboutUs />} path='/about' />
              <Route element={<ToyIndex />} path='/toy' />
              <Route element={<ToyDashboard />} path='/toy/dashboard' />
              <Route element={<ToyEdit />} path='/toy/edit/:toyId' />
              <Route element={<ToyEdit />} path='/toy/edit' />
              <Route element={<ToyDetails />} path='/toy/:toyId' />
              <Route element={<ReviewExplore />} path='/reviews' />
              <Route element={<ChatRoom />} path='/toy/chat/:toyId' />

              <Route element={<LoginSignup />} path='/user/loginsignup' />
              <Route element={<UserProfile />} path='/user/profile' />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </BrowserRouter>
      <UserMsg />
    </Provider>
  )
}
