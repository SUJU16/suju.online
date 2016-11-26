import {spawn} from 'child_process'

module.exports = {
  calculate(json) {
    return new Promise( (resolve, reject) => {
      if (json.length === 0) reject({err: "No data given to clusters.calculate"})
      const shell = spawn('python', [__dirname + '/cluster.py', JSON.stringify(json)])
      var clusterData = ""
      shell.stdout.on('data', (data) => {
        clusterData += data
      })

      shell.stderr.on('data', (data) => {
        console.log(data.toString())
      })

      shell.on('close', (code) => {
        if (code != 0) reject({err: code})
        if (clusterData === "") reject({err: "No cluster data found"})
        resolve(JSON.parse(clusterData))
      })
    })
  }
}
