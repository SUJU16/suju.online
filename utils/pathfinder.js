import {spawn} from 'child_process'
import polyline from 'polyline'
import fetch from 'isomorphic-fetch'

module.exports = {
  find(json) {
    return new Promise( (resolve, reject) => {
      const shell = spawn('python', [__dirname + '/pathfinder.py', JSON.stringify(json)])
      var pathData
      shell.stdout.on('data', (data) => {
        pathData = JSON.parse(data)
      })

      shell.stderr.on('data', (data) => {
        console.log(data.toString())
      })

      shell.on('close', (code) => {
        if (code != 0) reject({err: code})
        resolve(pathData)
      })
    })
  },

  getSpline(a, b) {
    console.log('getSplines')
    const url = `https://data.embers.city/api/routing?start_point=${a.location.latitude},${a.location.longitude}&end_point=${a.location.latitude},${a.location.longitude}&is_sorted=true&is_do_instructions=true`
    const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + process.env.EMBERSTOKEN
      }
    }
    console.log('fetch url: ', url)
    console.log('options: ', options)
    return fetch(url, options)
    //.then( (resp) => console.log(resp))
    //.catch( (error) => console.log(error))
  }
}
