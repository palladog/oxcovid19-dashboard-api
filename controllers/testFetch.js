import pool from '../pool.js';

const testFetch = async (req, res) => {
    const query = `SELECT adm_area_1
    FROM administrative_division
    WHERE country = 'Sweden'
    AND adm_level = 1`

    pool
        .query(query)
        .then(res => console.log(res.rows))
        .catch(e => console.error(e.stack))
}

export {
    testFetch
}