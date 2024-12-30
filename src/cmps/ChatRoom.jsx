import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'

import {
  socketService,
  SOCKET_EMIT_SEND_MSG,
  SOCKET_EVENT_ADD_MSG,
  SOCKET_EMIT_SET_TOPIC
} from '../services/socket.service.js'

export function ChatRoom() {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  const [msg, setMsg] = useState({ txt: '' })
  const [msgs, setMsgs] = useState([])
  const [topic, setTopic] = useState('Love')
  //   const { toyId } = useParams()

  useEffect(() => {
    socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
    return () => {
      socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
    }
  }, [])

  useEffect(() => {
    socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
  }, [topic])

  function addMsg(newMsg) {
    setMsgs((prevMsgs) => [...prevMsgs, newMsg])
  }

  function sendMsg(ev) {
    ev.preventDefault()
    const from = user.fullname || 'Me'
    const newMsg = { from, txt: msg.txt }
    socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
    setMsg({ txt: '' })
  }

  function handleFormChange({ target }) {
    const { name, value } = target
    setMsg((prevMsg) => ({ ...prevMsg, [name]: value }))
  }

  return (
    <section className='chat-room-container'>
      <h2>{user ? `Lets Chat about ${topic}` : `You must logged in to chat`}</h2>
      {user && (
        <>
          <div>
            <label>
              <input
                type='radio'
                name='topic'
                value='Love'
                checked={topic === 'Love'}
                onChange={({ target }) => setTopic(target.value)}
              />
              Love
            </label>

            <label>
              <input
                type='radio'
                name='topic'
                value='Politics'
                checked={topic === 'Politics'}
                onChange={({ target }) => setTopic(target.value)}
              />
              Politics
            </label>
          </div>

          <form onSubmit={sendMsg}>
            <input
              type='text'
              value={msg.txt}
              onChange={handleFormChange}
              name='txt'
              autoComplete='off'
            />
            <button>Send</button>
          </form>

          <ul>
            {msgs.map((msg, idx) => (
              <li key={idx}>
                {msg.from}: {msg.txt}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
