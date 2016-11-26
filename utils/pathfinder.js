import {spawn} from 'child_process'

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
  }
}
