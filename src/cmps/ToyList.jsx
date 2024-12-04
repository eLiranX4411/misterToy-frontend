import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ToyPreview } from './ToyPreview.jsx'
// import { userService } from '../services/user.service.js'

export function ToyList({ toys, onRemoveToys }) {
  return (
    <ul className='toys-list-container'>
      {toys.map((toy) => (
        <li className='toys-list' key={toy._id}>
          <ToyPreview toy={toy} />
          <div className='btns-container'>
            <Link to={`/edit/${toy._id}`}>Edit</Link>
            <button onClick={() => onRemoveToys}>Remove</button>
          </div>
        </li>
      ))}
    </ul>
  )
}
