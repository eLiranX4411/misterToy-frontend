import { useSelector } from 'react-redux'
import { setFilter } from '../store/actions/review.actions.js'
import { Loader } from '../cmps/Loader.jsx'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { loadReviews } from '../store/actions/review.actions.js'

export function ReviewExplore() {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const reviews = useSelector((storeState) => storeState.reviewModule.reviews)
  const filterBy = useSelector((storeState) => storeState.reviewModule.filterBy)

  useEffect(() => {
    loadReviews(filterBy)
  }, [filterBy])

  function handleChange({ target }) {
    const { name, value } = target
    const updatedFilter = { [name]: value }

    setFilter(updatedFilter)
  }
  if (!reviews) return <Loader />

  return (
    <section className='review-explore'>
      <section className='filterBy-reviews'>
        <h2>Filter By:</h2>
        <label htmlFor='byUser'>
          <input
            type='text'
            name='name'
            value={filterBy.name || ''}
            onChange={handleChange}
            placeholder='By Username'
          />
        </label>
      </section>

      {user &&
        reviews.map((review) => (
          <div className='review-card' key={review._id}>
            <h2>{review.byUser.fullname}</h2>
            <div style={{ paddingBottom: `10px` }}>{'⭐⭐⭐⭐⭐'}</div>
            <p>Review Text:</p>
            <p>{review.txt}</p>
            <div>
              In this:
              <Link
                style={{ backgroundColor: `yellow`, padding: `5px` }}
                to={`/toy/${review.aboutToy._id}`}
              >
                TOY
              </Link>
            </div>
          </div>
        ))}
    </section>
  )
}
