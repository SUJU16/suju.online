import moment from 'moment'

const centerLatitude = 60.165619
const centerLongitude = 24.968123
const centerDate = moment();

function randomInt(a, b) {
  return Math.floor(Math.random() * b) + a
}

function randomFloat(a, b) {
  return Math.random() * (b - a) + a;
}

module.exports = {
  generateRandomJSON() {
    const randomLat = centerLatitude + randomFloat(-0.9, 0.9)
    const randomLong = centerLongitude + randomFloat(-0.9, 0.9)
    const randomDate = centerDate.add(randomInt(-2, 2), 'days')
    const result = {
      "latitude": randomLat,
      "longitude": randomLong,
      "date": randomDate.format('X')
    }
    return result
  }
}
