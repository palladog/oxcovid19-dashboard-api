import dbPool from '../dbPool.js'

/**
  * Get Data
  * @param {object} req 
  * @param {object} res 
  * @returns {object} array of regions
  * 
  * Example endpoint:
  *   api/v1/?xmin=11.18&ymin=58.5&xmax=17.5&ymax=60&srid=4326&table=epidemiology&column=hospitalised_icu&date=2021-03-10
  * Endpoint with template literals:
  *   api/v1/?xmin=${xmin}&ymin=${ymin}&xmax=${xmax}&ymax=${ymax}&srid=${srid}&table=${table}&column=${column}&date=${date}
**/
const getMapData = async (req, res) => {
    const { 
        xmin, 
        ymin, 
        xmax, 
        ymax, 
        srid, 
        table, 
        column, 
        date 
    } = req.query

    let queryText = `
        SELECT e.country, e.adm_area_1, TO_CHAR(e.date, 'yyyy-mm-dd') AS date, '${column}' AS data, AVG(e.${column}) AS value, ST_AsGeoJSON(ad.geometry) AS geometry
        FROM ${table} e 
        JOIN administrative_division ad
        ON ad.adm_area_1 = e.adm_area_1 
        WHERE ST_Intersects(ST_MakeEnvelope(${xmin}, ${ymin}, ${xmax}, ${ymax}, ${srid}), ad.geometry)
        AND e.country = 'Sweden'
        AND ad.adm_level = '1'
        AND e.date = '${date}'
        AND e.adm_area_1 NOTNULL
        AND e.${column} NOTNULL
        GROUP BY e.date, e.country, e.adm_area_1, ad.geometry 
        ORDER BY e.date, e.country, e.adm_area_1, ad.geometry ASC
    `
    /*
    -- OLD CODE FROM WHEN getBoundingBoxRegions AND getRegionsData WERE TWO SEPARATE FUNCTIONS
    let queryText = `
        SELECT country, adm_area_1, TO_CHAR(date, 'yyyy-mm-dd') AS date, '${column}' as data, AVG(${column}) AS value
        FROM ${table}
        WHERE country = 'Sweden'
        AND ${column} NOTNULL
        AND adm_area_1 NOTNULL
        AND date = '${date}'
        AND adm_area_1 = ANY (ARRAY${regions})
        GROUP BY country, date, adm_area_1
        ORDER BY country, date, adm_area_1
    `*/
    // 'Sweden' is hardcoded into the query for now since it's a Swedish project

    try {
        let data = await dbPool.query(queryText)
        res.send(data.rows) // country, adm_area_1, geometry, date, data, value
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
}

export {
    getMapData
}