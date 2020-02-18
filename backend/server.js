const express = require('express');
const app = express();
const port = 9000;
const fs = require('fs');
const cors = require('cors');
const cron = require('cron');
const axios = require('axios');
const path = require('path');
const service = require('./services/background-services');

app.use(cors());

app.get('/api/virus-data', (req, res) => {
  const latestfile = fs.readFileSync(
    path.join(__dirname, 'virus-data', 'latestfile.txt'),
    'utf8'
  );

  const virus_data = fs.readFileSync(
    path.join(__dirname, 'virus-data', latestfile.replace('.csv', '.json'))
  );

  res.setHeader('Content-Type', 'application/json');
  res.send(virus_data);
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

let services = new service.BackgroundServices();

async function runNewsWriter(data) {
  const result = await services.runNewsWriterService(data);
  console.log(result);
}

async function runGitFetcher() {
  const result = await services.runVirusDataWriterService();
  console.log(result);
}

const newsJob = cron.job('0 0 * * * *', () => {
  axios
    .get(
      'https://newsapi.org/v2/top-headlines?q=corona%20virus&category=health&apiKey=44abcbafefe8454aa0078c14f2c50266'
    )
    .then(res => {
      runNewsWriter(res.data.articles).catch(err => console.error(err));
    })
    .catch(err => {
      console.log(err);
    });
});

const gitJob = cron.job('0 0 */12 * * *', () =>
  runGitFetcher().catch(err => console.error(err))
);

newsJob.start();
gitJob.start();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
