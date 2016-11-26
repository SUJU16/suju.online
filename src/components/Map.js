import React from 'react'
import { connect } from 'react-redux'
import { setLocation, setZoomLevel, toggleLayer, uploadPoint, getLocation } from '../store/actions'
import PeopleIcon from 'react-icons/lib/io/ios-body'
import ClusterIcon from 'react-icons/lib/io/ios-circle-filled'
import NavIcon from 'react-icons/lib/io/ios-navigate-outline'

import Page from './Page'
import style from '../styles/Map.scss'

import { Map, TileLayer, LayerGroup, Circle, Polyline } from 'react-leaflet';

var colors = {}

const getColor = (id) => {
  if (!colors[id]) {
    colors[id] = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
  }
  return colors[id]
}

const MapView = ({ datapoints, clusters, location, zoomLevel, peopleEnabled, clustersEnabled, userEnabled, currentRoute, setLocation, setZoomLevel, toggleLayer, newPoint, getAndSetLocation }) => (
  <div className={style.container}>
    <div className={style.sidebar + ' ' + style.middle}>
      <button className={peopleEnabled ? style.buttonEnabled : ''} onClick={toggleLayer.bind(this, "people")}><PeopleIcon size={24}/></button>
      <button className={clustersEnabled ? style.buttonEnabled : ''} onClick={toggleLayer.bind(this, "clusters")}><ClusterIcon size={24}/></button>
    </div>
    <div className={style.sidebar + ' ' + style.bottom}>
      <button onClick={getAndSetLocation}>
        <NavIcon size={24} />
      </button>
    </div>
    {location ?
      <Map className={style.map}
        center={location}
        zoom={zoomLevel}
        onZoom={setZoomLevel}
        onClick={newPoint}>
        <LayerGroup>
          <TileLayer
            className={style.tileLayer}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
            />
          { (datapoints && peopleEnabled) ? datapoints.map(point => {
            const coords = {
              lat: point.latitude,
              lon: point.longitude
            }
            return (<Circle key={point.id} center={coords} color={clustersEnabled ? getColor(point.cluster_id) : '#2366b4'} weight={0.5} radius={20} fillOpacity={1} />)
          }) : null}
          { (clusters && clustersEnabled) ? clusters.map(point => {
            const coords = {
              lat: point.latitude,
              lon: point.longitude
            }
            return (<Circle key={point.id} center={coords} color={getColor(point.id)} radius={point.radius} />)
          }) : null}
          { userEnabled && location ? (
            <Circle center={location} color={'#2bcc8d'} fillColor={'#2b986e'} radius={10} weight={3} fillOpacity={1}/>
          ) : null}
          { currentRoute ? (
            <Polyline positions={currentRoute} color={'#6ccaf2'} weight={4} smoothFactor={1} />
          ) : null}
        </LayerGroup>
      </Map>
    : 'Loading location'}
  </div>
)

const mapStateToProps = (state) => ({
  datapoints: state.clusters.datapoints,
  clusters: state.clusters.clusters,
  location: state.preferences.location,
  zoomLevel: state.preferences.zoomLevel,
  peopleEnabled: state.preferences.layers.people,
  clustersEnabled: state.preferences.layers.clusters,
  userEnabled: state.preferences.layers.user,
  currentRoute: state.preferences.currentRoute
})

const mapDispatchToProps = (dispatch) => {
  return {
    setLocation: (location) => dispatch(setLocation(location)),
    setZoomLevel: (zoomLevel) => dispatch(setZoomLevel(zoomLevel)),
    toggleLayer: (id) => dispatch(toggleLayer(id)),
    newPoint: (e) => dispatch(uploadPoint(e)),
    getAndSetLocation: () => {
      dispatch(toggleLayer('user'))
      dispatch(getLocation())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapView)
