import polyline from 'polyline'

export const readRoute = (raw) => {
  const coords = polyline.decode(raw[0].route, 6)
  return coords
}
