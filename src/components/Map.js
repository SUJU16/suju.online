import React from 'react'
import { connect } from 'react-redux'
import { setLocation } from '../store/actions'

import Page from './Page'
import style from '../styles/Map.scss'

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

const LeafLet = (location, zoomLevel) => {
  return (
    <Map className={style.map} center={location} zoom={zoomLevel}>
      <TileLayer
        className={style.tileLayer}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
        />
    </Map>
  )
}

const MapView = ({ location, zoomLevel, setLocation }) => (
  <div className={style.container}>
  {location ?
    LeafLet(location, zoomLevel)
    : 'Loading location'}
  </div>
)

const mapStateToProps = (state) => ({
  location: state.preferences.location,
  zoomLevel: state.preferences.zoomLevel
})

const mapDispatchToProps = ({
  setLocation
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapView)
