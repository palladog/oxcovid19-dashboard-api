import dbPool from '../dbPool.js'

/**
 * Get All Regions in Country
 * @param {object} req 
 * @param {object} res 
 * @returns {object} array of regions
**/
const getAllRegions = async (req, res) => {
    const country = req.query.country
    
    let queryText = `
        SELECT adm_area_1
        FROM administrative_division
        WHERE country = '${country}'
        AND adm_level = '1'
    `

    try {
        let data = await dbPool.query(queryText)
        res.send(data.rows)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
}

export {
    getAllRegions
}