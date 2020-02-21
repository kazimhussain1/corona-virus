const fs = require('fs');
const path = require('path');
const express = require('express')
const router = express.Router()


// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})


router.get('/virus-data', (req, res) => {
    const latestfile = fs.readFileSync(
        path.join(__dirname, '../', 'virus-data', 'latestfile.txt'),
        'utf8'
    );

    const virus_data = fs.readFileSync(
        path.join(__dirname, '../', 'virus-data', latestfile.replace('.csv', '.json'))
    );

    res.setHeader('Content-Type', 'application/json');
    res.send(virus_data);
});

router.get('/virus-data/time-series', (req, res) => {
    const confirmed_cases = fs.readFileSync(
        path.join(__dirname, '../', 'virus-data', 'time_series_confirmed.json'),
        'utf8'
    );

    const deaths = fs.readFileSync(
        path.join(__dirname, '../', 'virus-data', 'time_series_deaths.json'),
        'utf8'
    );

    const recovered = fs.readFileSync(
        path.join(__dirname, '../', 'virus-data', 'time_series_recovered.json'),
        'utf8'
    );

    const response = {
        confirmed_cases: JSON.parse(confirmed_cases),
        deaths: JSON.parse(deaths),
        recovered: JSON.parse(recovered)
    }

    res.status(200)
    res.setHeader('Content-Type', 'application/json');
    res.json(response);

});

router.get('/mapTopoData', (req, res) => {
    const world_data = fs.readFileSync(
        path.join(__dirname, '../', 'data', 'world-map.json')
    );

    res.send(world_data);
});

router.get('/news', (req, res) => {
    const world_data = fs.readFileSync(
        path.join(__dirname, '../', 'data', 'news-data.json')
    );
    res.setHeader('Content-Type', 'application/json');
    res.send(world_data);
});



module.exports = router;