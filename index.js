import express from 'express'
import db from './database'
import bodyParser from 'body-parser'
const app = express()
import cors from 'cors'

import databaseRoute from './routes/database'
import clusterRoute from './routes/cluster'

app
.use(cors())
.use(bodyParser.json())
.use('/', express.static('./dist'))
.use('/api/database', databaseRoute)
.use('/api/cluster', clusterRoute)
.listen(5000, () => console.log('server running on 5000'))
