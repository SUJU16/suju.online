import {spawn} from 'child_process'

module.exports = {
  sum(a, b) {
    return new Promise( (resolve, reject) => {
      const shell = spawn('python', [__dirname + '/sum.py', a, b])
      shell.stdout.on('data', (data) => {
        console.log(data.toString())
        resolve({result: data.toString()})
      });
    })
  },
  calculate(json) {
    return new Promise( (resolve, reject) => {
      const shell = spawn('python', [__dirname + '/cluster.py', JSON.stringify(json)])
      var clusterData
      shell.stdout.on('data', (data) => {
        clusterData = JSON.parse(data)
      })

      shell.stderr.on('data', (data) => {
        //console.log(data.toString())
      })

      shell.on('close', (code) => {
        if (code != 0) reject({err: code})
        resolve(clusterData)
      })
    })
  }
}
