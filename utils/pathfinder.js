import {spawn} from 'child_process'
import fetch from 'isomorphic-fetch'

module.exports = {
  find(json) {
    return new Promise( (resolve, reject) => {
      if (json.result.length === 0) {
        reject({err: "No data given to clusters.calculate"})
      } else {
        const shell = spawn('python', [__dirname + '/pathfinder.py', JSON.stringify(json)])
        var pathData = ""
        shell.stdout.on('data', (data) => {
          pathData += data
        })

        shell.stderr.on('data', (data) => {
          console.log(data.toString())
        })

        shell.on('close', (code) => {
          if (code != 0) reject({err: code})
          if (pathData === "") reject({err: "No path data found"})
          else resolve(JSON.parse(pathData))
        })
      }
    })
  },

  getSpline(a, b) {
    const url = `https://data.embers.city/api/routing?start_point=${a.latitude},${a.longitude}&end_point=${b.latitude},${b.longitude}&is_sorted=true&is_do_instructions=true`
    const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + process.env.EMBERSTOKEN
      }
    }
    return new Promise( (resolve, reject) => {
      fetch(url, options)
      .then( (reqData) => reqData.json())
      .then( (data) => resolve(data))
      .catch( (error) => reject(error))
    })
  }
}
