import polyline from 'polyline'
import routes from './routes'

const const readRoute = (raw) => {
  const coords = polyline.decode(raw[0].route, 6)
  return coords
}

export const readRoutes = () => {
  console.log('getCoordinates')
  return routes.map(list => readRoute(list[0]))
}
