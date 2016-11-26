import React from 'react'
import { connect } from 'react-redux'
import { setLocation } from '../store/actions'

import Page from './Page'
import style from '../styles/Map.scss'

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

const LeafLet = (location) => {
  return (
    <Map className={style.map} center={location} zoom={11}>
      <TileLayer
        className={style.tileLayer}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
        />
    </Map>
  )
}

const MapView = ({ location, setLocation }) => (
  <div className={style.container}>
  {location ?
    LeafLet(location)
    : 'Loading location'}
  </div>
)

const mapStateToProps = (state) => ({
  location: state.preferences.location
})

const mapDispatchToProps = ({
  setLocation
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapView)
