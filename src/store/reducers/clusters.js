const cluster = (state, action) => {
  switch (action.type) {
    case 'ADD_CLUSTER':
      return {
        id: action.id,
        timestamp: action.timestamp,
        latitude: action.ltd,
        longitude: action.lon
      }
    default:
      return state
  }
}

const clusters = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CLUSTER':
      return [
        ...state,
        cluster(undefined, action)
      ]
    default:
      return state
  }
}

export default clusters
