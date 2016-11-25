import express from 'express'

const app = express()

app
.use(express.static('./dist'))
// .get('/', (req, res) => res.send('Hello Junction'))
.listen(5000, () => console.log('server running on 5000'))
