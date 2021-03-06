const cluster = (state, action) => {
  switch (action.type) {
    case 'ADD_CLUSTER':
      return action.data
    case 'ADD_CLUSTERED_DATAPOINT':
      return action.data
    case 'ADD_DATAPOINT':
      return action.data
    default:
      return state
  }
}

const clusters = (state = {
    datapoints: [],
    clusters: [],
    clustered_datapoints: [],
    cluster_min_time: undefined,
    cluster_max_time: undefined
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
    case 'SAVE_MIN_MAX':
      return {
        ...state,
        cluster_min_time: action.min,
        cluster_max_time: action.max
      }
    case 'ADD_CLUSTERED_DATAPOINT':
      return {
        ...state,
        clustered_datapoints: [
          ...state.clustered_datapoints,
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
