import dbPool from '../dbPool.js'

/**
  * Get Data
  * @param {object} req 
  * @param {object} res 
  * @returns {object} array of regions
**/
const getRegionData = async (req, res) => {
    // api/v1/getregiondata?table=epidemiology&column=hospitalised_icu&&region=Uppsala
    const { table, column, region } = req.query
    // Removed date parameter

    console.log('table: ' + table)
    console.log('column: ' + column)
    console.log('region: ' + region)

    let queryText = `
        SELECT country, adm_area_1, TO_CHAR(date, 'yyyy-mm-dd') AS date, AVG(${column}) AS value
        FROM ${table}
        WHERE country = 'Sweden'
        AND ${column} NOTNULL
        AND adm_area_1 NOTNULL
        AND adm_area_1 = '${region}'
        GROUP BY country, adm_area_1, date
        ORDER BY country, adm_area_1, date ASC
    `
    // 'Sweden' is hardcoded into the query for now since it's a Swedish project

    try {
        console.log(queryText)
        let data = await dbPool.query(queryText)
        console.log('rowCount: ' + data.rowCount)
        res.send(data.rows)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
}

export {
    getRegionData
}