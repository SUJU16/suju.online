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
  .then( (json) => { //Calculate clusters from current database
    clusters.calculate(json)
    .then( (clusters) => { //Find optimal paths between clusters
      pathfinder.find({result: clusters,end: endPoint})
      .then( (response) => { //Find routes between cluster points
        console.log('response')
        //console.log(JSON.stringify(response, undefined, 2))
        Promise.all( response.paths.map( (path) => {
          console.log("path: ", path)
          let list = []
          path.reduce( (a, b) => {
            console.log('a', a)
            console.log('b', b)
            list.push(pathfinder.getSpline(a, b))
            console.log(list.length)
          })
          return Promise.all(list);
        }))
        .then( (splines) => {
          console.log('splines')
          console.log(JSON.stringify(splines, null, 2))
          res.json(splines)
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
      res.status(500).json({err: error})
    })
  })
  .catch( (error) => {
    req.status(500).json({err: error})
  })
})
