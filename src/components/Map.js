import React from 'react'

import Page from './Page'
import style from '../styles/Map.scss'

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

class MapContainer extends React.Component {
  constructor() {
    super()
    this.state = {position: undefined, zoom: 10}
  }
  componentDidMount() {
    console.log('didmount')
    navigator.geolocation.getCurrentPosition(pos => {
      this.setState(
        {
          position: {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          }
        }
      )
      console.log(this.state.position)
    })
  }
  render() {
    return (
      <div className={style.container}>
        {this.state.position ?
          <Map className={style.map} center={this.state.position} zoom={this.state.zoom}>
            <TileLayer
              className={style.tileLayer}
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              />
          </Map>
          : 'Loading'}
      </div>
    )
  }
}

const MapPage = () => (
  <MapContainer />
)

export default MapPage
