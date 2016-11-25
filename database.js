import massive from 'massive'

const connectionString = process.env.DATABASE_URL
const db = massive.connectSync({connectionString : connectionString})

module.exports = {
  getData() {
    return new Promise( (resolve, reject) => {
      db.requests.find({}, (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  },

  postRequest(data) {
    return new Promise( (resolve, reject) => {
      db.requests.save(data, (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  },

  removeData() {
    return new Promise( (resolve, reject) => {
      db.requests.destroy({}, (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }
}
