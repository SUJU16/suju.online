const cluster = (state, action) => {
  switch (action.type) {
    case 'ADD_CLUSTER':
      return {
        id: action.id,
        timestamp: action.date,
        latitude: action.latitude,
        longitude: action.longitude,
        size: action.n_points,
        radius: action.radius
      }
    case 'ADD_DATAPOINT':
      return action.data
    default:
      return state
  }
}

const clusters = (state = {
    datapoints: [],
    clusters: []
  }, action) => {
  switch (action.type) {
    case 'ADD_CLUSTER':
      return {
        ...state,
        clusters: [
          ...state.clusters,
          cluster(undefined, action)
        ]
      }
    case 'ADD_DATAPOINT':
      return {
        ...state,
        datapoints: [
          ...state.datapoints,
          cluster(undefined, action)
        ]
      }
    default:
      return state
  }
}

export default clusters
