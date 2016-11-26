import fetch from 'isomorphic-fetch'

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

export const setZoomLevel = (zoomLevel) => ({
  type: 'SET_ZOOM',
  zoomLevel
})

export const addDataPoint = (dataPoint) => ({
  type: 'ADD_DATAPOINT',
  data: dataPoint
})

export function loadAllDataPoints() {
  return dispatch => {
    fetch('http://localhost:5000/api/database', { method: 'GET' }
    )
    .then(data => data.json())
    .then(list => {
      for (var i in list) {
        dispatch(addDataPoint(list[i]))
      }
    })
  }
}
