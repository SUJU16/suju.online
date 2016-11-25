import express from 'express'
import db from './database'
import bodyParser from 'body-parser'
import jsonHelper from './utils/jsonHelper'

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
.get('/addRandom', (req, res) => {
  db.postRequest(jsonHelper.generateRandomJSON())
  .then( (response) => {
    res.json(response)
  })
  .catch( (error) => {
    res.status(500).json({err:error})
  })
})
.get('/fillTest/:amount', (req, res) => {
  for(var i = 0; i < req.params.amount; i++) {
    db.postRequest(jsonHelper.generateRandomJSON())
  }
  res.sendStatus(200);
})
.get('/removeData', (req, res) => {
  db.removeData()
  .then( (response) => {
    res.json(response)
  })
  .catch( (error) => {
    res.status(500).json({err: error})
  })
})
.post('/request', (req, res) => {
  db.postRequest(req.body)
  .then( (response) => {
    res.json(response);
  })
  .catch( (error) => {
    res.status(500).json({err: error})
  })
})
.listen(5000, () => console.log('server running on 5000'))
