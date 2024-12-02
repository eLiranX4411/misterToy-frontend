import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'

export function RootCmp() {
  return (
    <section className='app main-layout'>
      <AppHeader />

      <main>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/toy/:toyId' element={<ToyDetails />} />
            <Route path='/toy/edit/:toyId' element={<ToyEdit />} />
            <Route path='/toy/edit' element={<ToyEdit />} />
            <Route path='/toy' element={<ToyIndex />} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Routes>
        </BrowserRouter>
      </main>

      <AppFooter />
    </section>
  )
}
