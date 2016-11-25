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
  }
}
