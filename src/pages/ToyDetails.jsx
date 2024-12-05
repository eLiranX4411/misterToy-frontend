import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service'
import { Loader } from '../cmps/Loader.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useParams, Link } from 'react-router-dom'

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()

  useEffect(() => {
    if (!toyId) return
    loadToy()
  }, [toyId])

  function loadToy() {
    toyService
      .getById(toyId)
      .then((toy) => setToy(toy))
      .catch((err) => {
        console.log(`Cannot load Toy`, err)
        showErrorMsg(`Cannot load Toy`, err)
      })
  }

  // console.log(toy)

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
    </section>
  )
}
