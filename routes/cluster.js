import express from 'express'
import db from '../database'
import clusters from '../utils/clusters'
import pathfinder from '../utils/pathfinder'

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
.get('/path', (req, res) => {
  const endPoint = {
    "location": {
        "latitude": 60.165619,
        "longitude": 24.968123,
        "n_points": 0
    }
  }
  db.getData()
  .then( (json) => {
    clusters.calculate(json)
    .then( (clusters) => {
      pathfinder.find({result: clusters,end: endPoint})
      .then( (response) => {
        res.json(response)
      })
      .catch( (error) => {
        res.status(500).json({err: error})
      })
    })
    .catch( (error) => {
      res.status(500).json({err: error})
    })
  })
  .catch( (error) => {
    req.status(500).json({err: error})
  })
})
