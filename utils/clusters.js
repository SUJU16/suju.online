import {spawn} from 'child_process'

module.exports = {
  calculate(json) {
    return new Promise( (resolve, reject) => {
      const shell = spawn('python', [__dirname + '/cluster.py', JSON.stringify(json)])
      var clusterData = ""
      shell.stdout.on('data', (data) => {
        clusterData += data
      })

      shell.stderr.on('data', (data) => {
        //console.log(data.toString())
      })

      shell.on('close', (code) => {
        if (code != 0) reject({err: code})
        console.log(clusterData)
        resolve(JSON.parse(clusterData))
      })
    })
  }
}
