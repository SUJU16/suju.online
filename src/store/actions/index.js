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
