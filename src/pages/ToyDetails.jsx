import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.js'
import { Loader } from '../cmps/Loader.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const [msg, setMsg] = useState('')
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const { toyId } = useParams()

  useEffect(() => {
    // console.log(toyId)
    if (!toyId) return
    loadToy()
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

  if (!toy) return <Loader />

  return (
    <section className='toy-details-container'>
      <main className='toy-details'>
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
      </main>

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
    </section>
  )
}
