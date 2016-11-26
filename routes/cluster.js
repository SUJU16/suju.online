import express from 'express'
import db from '../database'
import clusters from '../utils/clusters'
import pathfinder from '../utils/pathfinder'

const endPoint = {
    "latitude": 60.165619,
    "longitude": 24.968123,
    "n_points": 0
}

function getSplines(path) {
  let list = []
  path.reduce( (a, b) => {
    list.push(pathfinder.getSpline(a, b))
    return b
  })
  return Promise.all(list)
}

export default express.Router()
.get('/', (req, res) => {
  db.getData()
  .then( (json) => clusters.calculate(json))
  .then( (clusters) => res.json(clusters))
  .catch( (error) => {
    res.status(500).json({err: error})
  })
})
.get('/sjukstra', (req, res) => {
  db.getData()
  .then( (json) => clusters.calculate(json))
  .then( (clusters) => pathfinder.find({result: clusters,end: endPoint}))
  .then( (sortedClusters) => res.json(sortedClusters))
  .catch( (error) => res.status(500).json(error))
})
.get('/splines', (req, res) => {
  db.getData()
  .then( (json) => clusters.calculate(json))
  .then( (clusters) => pathfinder.find({result: clusters,end: endPoint}))
  .then( (sortedClusters) => Promise.all( sortedClusters.paths.map( (path) => getSplines(path))))
  .then( (splines) => {
    res.json(splines)
  })
  .catch( (error) => {
    res.status(500).json({err: error})
  })
})
