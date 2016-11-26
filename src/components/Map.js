import React from 'react'
import { connect } from 'react-redux'
import { setLocation, setZoomLevel, toggleLayer } from '../store/actions'
import PeopleIcon from 'react-icons/lib/io/ios-body'
import ClusterIcon from 'react-icons/lib/io/ios-circle-filled'

import Page from './Page'
import style from '../styles/Map.scss'

import { Map, TileLayer, LayerGroup, Circle } from 'react-leaflet';

const getColor = (size) => {
  return '#be2f2f'
}

const MapView = ({ datapoints, clusters, location, zoomLevel, peopleEnabled, clustersEnabled, setLocation, setZoomLevel, toggleLayer }) => (
  <div className={style.container}>
    <div className={style.sidebar}>
      <button className={peopleEnabled ? style.buttonEnabled : ''} onClick={toggleLayer.bind(this, "people")}><PeopleIcon size={24}/></button>
      <button className={clustersEnabled ? style.buttonEnabled : ''} onClick={toggleLayer.bind(this, "clusters")}><ClusterIcon size={24}/></button>
    </div>
    {location ?
      <Map className={style.map} center={location} zoom={zoomLevel} onZoom={setZoomLevel}>
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
            return (<Circle key={point.id} center={coords} color={'#1e79b4'} weight={0.5} radius={20} fillOpacity={1} />)
          }) : null}
          { (clusters && clustersEnabled) ? clusters.map(point => {
            const coords = {
              lat: point.latitude,
              lon: point.longitude
            }
            return (<Circle key={point.id} center={coords} color={getColor(point.size)} radius={point.size} />)
          }) : null}
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
  clustersEnabled: state.preferences.layers.clusters
})

const mapDispatchToProps = ({
  setLocation,
  setZoomLevel,
  toggleLayer
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapView)
