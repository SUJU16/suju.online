import express from 'express'
import db from './database'
import bodyParser from 'body-parser'

const app = express()

app
.use(bodyParser.json())
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
.post('/request', (req, res) => {
  console.log(JSON.stringify(req.body, null, 2))
  db.postRequest(req.body)
  .then( (response) => {
    res.json(response);
  })
  .catch( (error) => {
    res.status(500).json({err: error})
  })
})
.listen(5000, () => console.log('server running on 5000'))
