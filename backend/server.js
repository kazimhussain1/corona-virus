const express = require('express');
const app = express();
const port = 9000;
const fs = require('fs');
const cors = require('cors');
const cron = require('cron');
const axios = require('axios');
const path = require('path');
const { Worker } = require('worker_threads');

app.use(cors());

app.get('/api/world_data', (req, res) => {
  const world_data = fs.readFileSync(
    path.join(__dirname, 'data', 'corona-data.json')
  );
  res.setHeader('Content-Type', 'application/json');
  res.send(world_data);
});

app.get('/api/mapTopoData', (req, res) => {
  const world_data = fs.readFileSync(
    path.join(__dirname, 'data', 'world-map.json')
  );

  res.send(world_data);
});

app.get('/api/news', (req, res) => {
  const world_data = fs.readFileSync(
    path.join(__dirname, 'data', 'news-data.json')
  );
  res.setHeader('Content-Type', 'application/json');
  res.send(world_data);
});

function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./utils/news-writer.js', { workerData });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', code => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

async function run(data) {
  const result = await runService(data);
  console.log(result);
}

const cronJob = cron.job('0 0 * * * *', () => {
  axios
    .get(
      'https://newsapi.org/v2/top-headlines?q=corona%20virus&category=health&apiKey=44abcbafefe8454aa0078c14f2c50266'
    )
    .then(res => {
      run(res.body).catch(err => console.error(err));
    })
    .catch(err => {
      console.log(err);
    });
});

cronJob.start();

// app.set('json spaces', 40);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
