import polyline from 'polyline'

export const readRoute = (raw) => {
  let fullRoute = []
  let stops = []
  raw.forEach((a) => { 
    const route = polyline.decode(a.route, 6)
    fullRoute = fullRoute.concat(route)
    stops = stops.concat({date: a.date, points: route, distance: a.distance})
  })
  return {route: fullRoute, stops: stops}
}
