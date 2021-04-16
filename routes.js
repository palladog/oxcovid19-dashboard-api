import express from 'express'
import { testFetch } from './controllers/testFetch.js'
import { getAllRegions } from './controllers/getAllRegions.js'
import { getBoundingBoxRegions } from './controllers/getBoundingBoxRegions.js'
import { getRegionData } from './controllers/getRegionData.js'
import { getMapData } from './controllers/getMapData.js'

const router = express.Router()

router.get('/testfetch', testFetch)
router.get('/getallregions', getAllRegions)
router.get('/getboundingbox', getBoundingBoxRegions)
router.get('/getregiondata', getRegionData)
router.get('/getmapdata', getMapData)

export default router