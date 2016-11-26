import express from 'express'
import db from './database'
import bodyParser from 'body-parser'
const app = express()

import databaseRoute from './routes/database'
import clusterRoute from './routes/cluster'

app
.use(bodyParser.json())
.use(express.static('./dist'))
.use('/database', databaseRoute)
.use('/cluster', clusterRoute)
.listen(5000, () => console.log('server running on 5000'))
