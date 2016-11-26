import polyline from 'polyline'
import routes from './routes'

export const readRoute = (raw) => {
  let fullRoute = []
  raw.forEach((a) => { 
    const route = polyline.decode(a.route, 6)
    fullRoute = fullRoute.concat(route)
  })
  return fullRoute
}

export const readRoutes = () => {
  console.log('getCoordinates')
  return routes.map(list => readRoute(list[0]))
}
