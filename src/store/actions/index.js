import fetch from 'isomorphic-fetch'
import moment from 'moment'

import { readRoute } from '../../utils'

var nextRouteId = 0
var interval;

export const addCluster = (data) => ({
  type: 'ADD_CLUSTER',
  data
})

export const addClusteredDataPoint = (data) => ({
  type: 'ADD_CLUSTERED_DATAPOINT',
  data
})

export const setLocation = (location) => ({
  type: 'SET_LOCATION',
  ...location
})

export const saveMinMax = (min, max) => ({
  type: 'SAVE_MIN_MAX',
  min,
  max
})

export const setZoomLevel = (e) => ({
  type: 'SET_ZOOM',
  zoomLevel: e.target._animateToZoom //haha
})

export const toggleLayer = (layerId) => ({
  type: 'TOGGLE_LAYER',
  layerId
})

export const toggleRoute = (id) => ({
  type: 'TOGGLE_ROUTE',
  id
})

export const addRoute = (route) => ({
  type: 'ADD_ROUTE',
  route: {
    id: nextRouteId++,
    positions: route,
    visible: true,
    positions: route.route,
    stops: route.stops,
    cluster_id: route.cluster_id
  }
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

const uploadSuccess = (res) => ({
  type: 'UPLOAD_SUCCESS',
  res
})

const uploadFailure = (err) => ({
  type: 'UPLOAD_FAILURE',
  err
})

export const setActiveApp = (id) => ({
  type: 'SET_ACTIVE_APP',
  id
})

export const setSliderValue = (e) => ({
  type: 'SET_SLIDER_VALUE',
  value: Number(e.target ? e.target.value : e)
})

export const togglePause = (bool) => ({
  type: 'TOGGLE_PAUSE',
  value: bool
})

export function loadAllDataPoints() {
  return dispatch => {
    fetchData('http://localhost:5000/api/database')
    .then(list => {
      for (var i in list) {
        dispatch(addDataPoint(list[i]))
      }
    })
  }
}

export function getLocation() {
  return dispatch => {
    navigator.geolocation.watchPosition(pos => {
      dispatch(setLocation({ltd: pos.coords.latitude, lon: pos.coords.longitude}),
      { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true })
    })
  }
}

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

export function startPlaying() {
  return (dispatch, getState) => {
    dispatch(togglePause(false))
    if (!interval) {
      interval = setInterval(() => {
        let { sliderValue, paused } = getState().preferences
        let { cluster_min_time } = getState().clusters
        if (sliderValue == 0) sliderValue = cluster_min_time
        if (!paused) dispatch(setSliderValue(sliderValue + 10))
      }, 700)
    }
  }
}

export function loadAllRoutes() {
  return dispatch => {
    fetchData('http://localhost:5000/api/cluster/splines')
    .then(routes => {
      let minDate = undefined
      let maxDate = undefined
      for (let i in routes) {
        let route = readRoute(routes[i])
        dispatch(addRoute(route))
        route.stops.forEach(stop => {
      		minDate = (minDate === undefined || stop.date.start < minDate) ? stop.date.start : minDate
      		maxDate = (maxDate === undefined || stop.date.start > maxDate) ? stop.date.start : maxDate
      	})
      }
      console.log('henri on homo')
      minDate -= 30
      maxDate += 30
      dispatch(saveMinMax(minDate, maxDate))
    })
  }
}

export function loadAllClusters() {
  return dispatch => {
    fetchData('http://localhost:5000/api/cluster')
    .then(json => {
      for (var i in json.clusters) {
        dispatch(addCluster(json.clusters[i]))
      }
      for (var i in json.points) {
        dispatch(addClusteredDataPoint(json.points[i]))
      }
    })
  }
}
