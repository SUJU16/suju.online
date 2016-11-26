import fetch from 'isomorphic-fetch'
import moment from 'moment'
import clusters from './clusters'
import { getCoordinates } from '../../utils'

var nextClusterId = 0

export const addCluster = (data) => ({
  type: 'ADD_CLUSTER',
  id: nextClusterId++,
  ...data
})

export const setLocation = (location) => ({
  type: 'SET_LOCATION',
  ...location
})

export const setZoomLevel = (e) => ({
  type: 'SET_ZOOM',
  zoomLevel: e.target._animateToZoom //haha
})

export const toggleLayer = (layerId) => ({
  type: 'TOGGLE_LAYER',
  layerId
})

export const setCurrentRoute = (route) => ({
  type: 'SET_CURRENT_ROUTE',
  route
})

export const setCenter = (e) => ({
  type: 'SET_CENTER',
  point: e.target._lastCenter
})

export const addDataPoint = (dataPoint) => ({
  type: 'ADD_DATAPOINT',
  data: dataPoint
})

const fetchData = (url) => {
  return fetch(url)
  .then(res => res.json())
}

export function loadAllDataPoints() {
  return dispatch => {
    // fetchData('http://localhost:5000/api/database')
    // .then(list => {
    const list = clusters.points
      for (var i in list) {
        dispatch(addDataPoint(list[i]))
      }
    // })
  }
}

export function loadBasicRoute() {
  return dispatch => {
    const route = getCoordinates()
    console.log(route)
    dispatch(setCurrentRoute(route))
  }
}

export function getLocation() {
  return dispatch => {
    navigator.geolocation.getCurrentPosition(pos => {
      dispatch(setLocation({ltd: pos.coords.latitude, lon: pos.coords.longitude}))
    })
  }
}

const uploadSuccess = (res) => ({
  type: 'UPLOAD_SUCCESS',
  res
})

const uploadFailure = (err) => ({
  type: 'UPLOAD_FAILURE',
  err
})

export function uploadPoint(e) {
  return dispatch => {
    const { lat: latitude, lng: longitude } = e.latlng
    const json = JSON.stringify({latitude, longitude, date: moment().unix()})
    fetch(
      'http://localhost:5000/api/database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: json
      }
    )
    .then(res => res.json())
    .then(res => {
      dispatch(addDataPoint(res))
    })
    .catch(err => {
      dispatch(uploadFailure(err))
    })
  }
}

export const setActiveApp = (id) => ({
  type: 'SET_ACTIVE_APP',
  id
})

export function loadAllClusters() {
  return dispatch => {
    // fetchData('http://localhost:5000/api/clusters')
    // .then(list => {
    //
    // })
    for (var i in clusters.clusters) {
      dispatch(addCluster(clusters.clusters[i]))
    }
  }
}
