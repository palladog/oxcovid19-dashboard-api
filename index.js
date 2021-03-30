const express = require('express');
const app = express();
const pool = require('./pool');

app.use(express.json()) // => req.body : to get access on body of json data

app.get('/api/v1/chart/getRegionDeaths/:country/:adm_area_1', async (req, res) => {
    try {
        const { country, adm_area_1 } = req.params;
        const queryText = `SELECT "epidemiology"."date", "epidemiology"."country", "epidemiology"."adm_area_1", AVG("epidemiology"."dead") AS "dead"
        FROM "splitgraph/oxcovid19:latest"."epidemiology"
        JOIN "splitgraph/oxcovid19:latest"."administrative_division"
        ON "administrative_division"."country" = "epidemiology"."country"
        WHERE "epidemiology"."country" = '$1::text'
        AND "epidemiology"."adm_area_1" = '$2::text'
        AND "epidemiology"."date" >= '2020-02-24'
        AND "epidemiology"."dead" IS NOT NULL
        GROUP BY "epidemiology"."date", "epidemiology"."country", "epidemiology"."adm_area_1"
        ORDER BY "epidemiology"."date", "epidemiology"."country", "epidemiology"."adm_area_1" ASC;`;
        const queryValues = [ country, adm_area_1 ];

        const r = await pool.query(queryText, queryValues);
        res.json(r.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
});

app.listen(5000, () => {
    console.log("server is listening on port: 5000");
});