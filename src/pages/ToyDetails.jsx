import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import { toyService } from '../services/toy.service.js'
import { Loader } from '../cmps/Loader.jsx'
import { loadReviews, addReview, removeReview } from '../store/actions/review.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function ToyDetails() {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const reviews = useSelector((storeState) => storeState.reviewModule.reviews)

  const [toy, setToy] = useState(null)
  const [msg, setMsg] = useState('')
  const [review, setReview] = useState('')

  const { toyId } = useParams()

  useEffect(() => {
    // console.log(toyId)
    if (!toyId) return
    loadToy()
    loadReviews()
  }, [toyId])

  async function loadToy() {
    try {
      const toy = await toyService.getById(toyId)
      setToy(toy)
    } catch (err) {
      console.log(`Cannot load Toy`, err)
      showErrorMsg(`Cannot load Toy`)
    }
  }

  async function onAddToyMsg(ev) {
    ev.preventDefault()
    if (!msg.trim()) return showErrorMsg('Message cannot be empty')

    const newMsg = {
      txt: msg,
      by: { _id: user._id, fullname: user.fullname }
    }

    try {
      const savedMsg = await toyService.addToyMsg(toyId, newMsg)
      setToy((prevToy) => ({ ...prevToy, msgs: [...prevToy.msgs, savedMsg] })) // Update state
      setMsg('')
      showSuccessMsg('Message added successfully!')
    } catch (err) {
      console.log(`Cannot add msg`, err)
      showErrorMsg(`Cannot add msg`)
    }
  }

  async function onRemoveToyMsg(msgId) {
    try {
      await toyService.removeToyMsg(toyId, msgId)
      setToy((prevToy) => ({
        ...prevToy,
        msgs: prevToy.msgs.filter((msg) => msg.id !== msgId)
      }))
      showSuccessMsg('Message removed successfully!')
    } catch (err) {
      console.log(`Cannot remove msg`, err)
      showErrorMsg(`Cannot remove msg`)
    }
  }

  async function onAddToyReview(ev) {
    ev.preventDefault()
    if (!review.trim()) return showErrorMsg('Review cannot be empty')
    if (!user) return showErrorMsg('You must be logged in to leave a review')

    const newReview = {
      txt: review, // Review text entered by the user
      aboutToyId: toy._id, // The ID of the toy being reviewed
      byUserId: user._id // Add the logged-in user's ID
    }

    try {
      await addReview(newReview) // Dispatch the action to add the review
      setReview('') // Clear the input field
      showSuccessMsg('Review added successfully!')
    } catch (err) {
      console.log(`Cannot add review`, err)
      showErrorMsg('Failed to add review')
    }
  }

  async function onRemoveToyReview(reviewId) {
    try {
      await removeReview(reviewId) // Dispatch the action to remove the review
      showSuccessMsg('Review removed successfully!')
    } catch (err) {
      console.log(`Cannot remove review`, err)
      showErrorMsg('Failed to remove review')
    }
  }

  if (!toy) return <Loader />

  return (
    <main className='toy-details-container'>
      <section className='toy-details'>
        <h1>{toy.name} Details:</h1>
        <img className='toy-img' src={`https://robohash.org/${toy._id}?set=set4`} alt='Toy Img' />
        <h1>
          Toy name: <span>{toy.name}</span>
        </h1>
        <h1>
          Toy price: <span>${toy.price}</span>
        </h1>
        <h1>
          Labels: <span>{toy.labels.join(' ,')}</span>
        </h1>
        <h1 className={toy.inStock ? 'green' : 'red'}>
          {toy.inStock ? 'In stock' : 'Not in stock'}
        </h1>
        <button>
          <Link to='/toy'>Back</Link>
        </button>
      </section>

      {/* Message Section */}
      <section className='msgs-section'>
        {user && (
          <form className='toy-msg-container' onSubmit={onAddToyMsg}>
            <input
              type='text'
              name='msg'
              value={msg}
              onChange={(ev) => setMsg(ev.target.value)}
              placeholder='Enter your message'
            />
            <button type='submit'>Add Msg</button>
          </form>
        )}

        {toy.msgs?.length > 0 && (
          <section className='toy-msgs'>
            <h4>Messages:</h4>
            <ul>
              {toy.msgs.map((msg) => (
                <li key={msg.id}>
                  <p>
                    <strong>{msg.by.fullname}:</strong> {msg.txt}
                  </p>
                  <button onClick={() => onRemoveToyMsg(msg.id)}>Remove Msg</button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </section>

      {/* Review Section */}
      <section className='reviews-section'>
        {user && (
          <form className='review-container' onSubmit={onAddToyReview}>
            <input
              type='text'
              name='review'
              value={review}
              onChange={(ev) => setReview(ev.target.value)}
              placeholder='Enter your review'
            />
            <button type='submit'>Add Review</button>
          </form>
        )}

        {reviews
          .filter((r) => r.aboutToy._id === toy._id)
          .map((review) => (
            <li key={review._id} className='review-item'>
              <div>
                <strong>{review.byUser.fullname}:</strong> {review.txt}
                <div className='rating'>{'⭐⭐⭐⭐⭐'}</div>
              </div>
              {user._id === review.byUser._id && (
                <button onClick={() => onRemoveToyReview(review._id)}>Remove Review</button>
              )}
            </li>
          ))}
      </section>
    </main>
  )
}
