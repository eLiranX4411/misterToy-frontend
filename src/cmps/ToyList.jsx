/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'
import { ToyPreview } from './ToyPreview.jsx'
import { useSelector } from 'react-redux'

export function ToyList({ toys, onRemoveToy }) {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  // console.log(user)

  return (
    <ul className='toys-list-container'>
      {toys.map((toy) => (
        <li className='toys-list' key={toy._id || toy.name}>
          <ToyPreview toy={toy} />
          <Link className='details-btn' to={`/toy/${toy._id}`}>
            Details
          </Link>
          {user && user.isAdmin ? (
            <div className='btns-container'>
              <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
              <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
            </div>
          ) : (
            <div></div>
          )}
        </li>
      ))}
    </ul>
  )
}
