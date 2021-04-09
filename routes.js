import express from 'express'
import { testFetch } from './controllers/testFetch.js'

const router = express.Router()

router.get('/testfetch', testFetch)

export default router