const preferences = (state = {
  location: undefined,
  zoomLevel: 11
}, action) => {
  switch (action.type) {
    case 'SET_LOCATION':
      return {
        ...state,
        location: {
          lat: action.ltd,
          lon: action.lon
        }
      }
    case 'SET_ZOOM':
      return {
        ...state,
        zoomLevel: action.zoomLevel
      }
    default:
      return state
  }
}

export default preferences
