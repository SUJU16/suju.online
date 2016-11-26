import express from 'express'
import db from '../database'
import clusters from '../utils/clusters'

export default express.Router()
.get('/', (req, res) => {
  db.getData()
  .then( (json) => {
    clusters.calculate(json)
    .then( (response) => {
      res.json(response)
    })
    .catch( (error) => {
      res.status(500).json({err: error})
    })
  })
  .catch( (error) => {
    req.status(500).json({err: error})
  })
})
