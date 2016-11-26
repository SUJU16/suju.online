import fetch from 'isomorphic-fetch'
import moment from 'moment'

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
    console.log('get location')
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
    console.log('addpoint')
    const { lat: latitude, lng: longitude } = e.latlng
    const json = JSON.stringify({latitude, longitude, date: moment().unix()})
    console.log(json)
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
      console.log(res)
      dispatch(addDataPoint(res))
    })
    .catch(err => {
      console.log(err)
      dispatch(uploadFailure(err))
    })
  }
}

export const setActiveApp = (id) => ({
  type: 'SET_ACTIVE_APP',
  id
})

const clusters = [{"date":1480212288.2844827,"location":{"latitude":60.16589716928018,"longitude":24.96703888435517},"n_points":232},{"date":1480145515,"location":{"latitude":60.159659990600005,"longitude":24.977102631833333},"n_points":3},{"date":1480076600.7142856,"location":{"latitude":60.169792791528565,"longitude":24.968448538942855},"n_points":7},{"date":1480053972.142857,"location":{"latitude":60.162377432128565,"longitude":24.961673325457138},"n_points":7}]

export function loadAllClusters() {
  return dispatch => {
    // fetchData('http://localhost:5000/api/clusters')
    // .then(list => {
    //
    // })
    for (var i in clusters) {
      dispatch(addCluster(clusters[i]))
    }
  }
}
