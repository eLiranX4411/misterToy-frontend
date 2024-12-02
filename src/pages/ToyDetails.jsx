import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useState, useRef, useEffect } from 'react'
import { NavLink, Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { toyService } from '../services/toy.service.js'

export function ToyDetails() {
  return <h1>Toy Details</h1>
}
