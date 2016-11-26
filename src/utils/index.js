import polyline from 'polyline'

export const readRoute = (raw) => {
  let fullRoute = []
  raw.forEach((a) => { 
    const route = polyline.decode(a.route, 6)
    fullRoute = fullRoute.concat(route)
  })
  return fullRoute
}
