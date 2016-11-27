import polyline from 'polyline'

export const readRoute = (raw) => {
  let fullRoute = []
  let stops = []
  let cluster_id = []
  raw.forEach((a) => {
    const route = polyline.decode(a.route, 6)
    fullRoute = fullRoute.concat(route)
    stops = stops.concat({date: a.date, points: route, distance: a.distance})
    cluster_id = a.cluster_id
  })
  return {route: fullRoute, stops, cluster_id}
}
