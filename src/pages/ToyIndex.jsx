import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useState, useEffect } from 'react'

import { toyService } from '../../src/services/toy.service.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from './ToyFilter.jsx'
// import { userService } from '../services/user.service.js'

export function ToyIndex() {
  return (
    <main className='main-toys'>
      <h1>Index</h1>
    </main>
  )
}
