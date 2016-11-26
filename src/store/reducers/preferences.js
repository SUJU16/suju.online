const preferences = (state = {}, action) => {
  switch (action.type) {
    case 'SET_LOCATION':
      return {
        location: {
          lat: action.ltd,
          lon: action.lon
        }
      }
    default:
      return state
  }
}

export default preferences
