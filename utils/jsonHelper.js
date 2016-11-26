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
    const randomLat = centerLatitude + randomFloat(-0.008, 0.008)
    const randomLong = centerLongitude + randomFloat(-0.016, 0.016)
    const randomDate = centerDate
                        .add(randomInt(0, 5), 'hours')
                        .subtract(randomInt(0, 5), 'hours')
    const result = {
      "latitude": randomLat,
      "longitude": randomLong,
      "date": randomDate.format('X')
    }
    return result
  }
}
