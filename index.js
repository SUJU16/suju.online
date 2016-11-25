import express from 'express'
import massive from 'massive'
const app = express()
const connectionString = process.env.DATABASE_URL
const db = massive.connectSync({connectionString : connectionString})
app.set('db', db)

app
.use(express.static('./dist'))
.get('/database', (req, res) => {
  db.requests.find({}, (err, result) => {
    if (err) res.status(500).json({error:err})
    res.json(result)
  })
})
.listen(5000, () => console.log('server running on 5000'))
