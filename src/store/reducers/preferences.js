const preferences = (state = {
  location: undefined,
  zoomLevel: 11,
  layers: {
    'people': false,
    'clusters': false
  }
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
    case 'TOGGLE_LAYER':
      const new_layers = state.layers
      new_layers[action.layerId] = !state.layers[action.layerId]
      return {
        ...state,
        layers: new_layers
      }
    default:
      return state
  }
}

export default preferences
