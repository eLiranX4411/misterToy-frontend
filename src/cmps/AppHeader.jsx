import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { useState, useRef, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function AppHeader() {
  return <h1>App Header</h1>
}
