// Look into exports/module exports:
// * https://www.sitepoint.com/understanding-module-exports-exports-node-js/
// * https://dev.to/iamsrujal/nodejs-express-project-structure-for-rest-api-37oasr 

import express from 'express';
import cors from 'cors';
import env from './env.js';

import routes from './routes.js'
//import testFetch from './controllers/testFetch.js';

const app = express()

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }))
// extended: true or false? -> https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0
app.use(express.json())

// Routes
app.get('/', (req, res) => { res.send(`🚀 OxCOVID-19 Dashboard Node is up and running!`) })
app.get('/api/v1/test', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use('/api/v1', routes)

app.listen(env.port || 8080, () => {
    console.log(`🚀 API running on port ${env.port || 8080}.`)
})

export default app