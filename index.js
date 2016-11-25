import express from 'express'
import db from './database'

const app = express()

app
.use(express.static('./dist'))
.get('/database', (req, res) => {
  db.getData()
  .then( (response) => {
    res.json(response)
  })
  .catch( (error) => {
    res.status(500).json({err: error})
  })
})
.listen(5000, () => console.log('server running on 5000'))
