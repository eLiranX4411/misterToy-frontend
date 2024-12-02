import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useState, useRef, useEffect } from 'react'
import { NavLink, Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { toyService } from '../../src/services/toy.service.js'

export function ToyEdit() {
  return <h1>Toy Edit</h1>
}
