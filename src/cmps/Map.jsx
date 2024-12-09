import GoogleMapReact from 'google-map-react'
import { useState } from 'react'

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '20px' }}>{text}</div>

export function Map() {
  const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
  const zoom = 11

  function onMapClick({ lat, lng }) {
    setCoordinates({ lat, lng })
  }

  return (
    // Important! Always set the container height explicitly
    <section className='map-container'>
      <div className='map'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyA5YAKbctMWmj2etXv-KY7MSXDMGaWr0qs' }}
          center={coordinates}
          defaultZoom={zoom}
          onClick={onMapClick}
        >
          <AnyReactComponent {...coordinates} text='🙋‍♂️' />
        </GoogleMapReact>
      </div>
    </section>
  )
}
