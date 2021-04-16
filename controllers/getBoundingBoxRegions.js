import dbPool from '../dbPool.js';

/**
  * Get Bounding Box Regions
  * @param {object} req 
  * @param {object} res 
  * @returns {object} array of regions
**/
const getBoundingBoxRegions = async (req, res) => {
    const { xmin, ymin, xmax, ymax, srid } = req.query
    // 11.18, 58.5, 17.5, 60, 4326

    // api/v1/getboundingbox/?xmin={val}&ymin={val}&xmax={val}&ymax={val}&srid={val}
    // api/v1/getboundingbox/?xmin=11.18&ymin=58.5&xmax=17.5&ymax=60&srid=4326&table=epidemiology&column=hospitalised_icu&date=2021-03-10

    let coordinates = xmin + `,` + ymin + `,` + xmax + `,` + ymax + `,` + srid

    let queryText = `
        SELECT country, adm_area_1, ST_AsGeoJSON(geometry) AS geometry 
        FROM administrative_division
        WHERE country = 'Sweden'
        AND ST_Intersects(ST_MakeEnvelope(${coordinates}), geometry)
        AND adm_level = 1
    `
    // 'Sweden' is hardcoded into the query for now since it's a Swedish project

    try {
        let data = await dbPool.query(queryText)
        res.send(data.rows)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
}

export {
    getBoundingBoxRegions
}