const preferences = (state = {
  location: {lat: 60.165619, lon: 24.968123},
  zoomLevel: 14,
  layers: {
    'people': false,
    'clusters': false,
    'user': false
  },
  activeApp: 'map',
  routes: []
}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_APP':
      return {
        ...state,
        activeApp: action.id
      }
    case 'SET_LOCATION':
      return {
        ...state,
        location: {
          lat: action.ltd,
          lon: action.lon
        }
      }
    case 'ADD_ROUTE':
      return {
        ...state,
        routes: [
          ...state.routes,
          action.route
        ]
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
