import dbPool from '../dbPool.js'

const testFetch = async (req, res) => {
    const query = `SELECT adm_area_1
    FROM administrative_division
    WHERE country = 'Sweden'
    AND adm_level = 1`

    try {
        let data = await dbPool.query(query)
        console.log(data.rowCount)
        res.send(data.rows)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
}

export {
    testFetch
}