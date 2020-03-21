const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const cors = require('cors');
const cron = require('cron');
const axios = require('axios');
const path = require('path');
const service = require('./services/background-services');
const api = require('./api/api')

app.use(cors());


app.use('/api', api);



let services = new service.BackgroundServices();

async function runNewsWriter(data) {
  const result = await services.runNewsWriterService(data);
  console.log(result);
}

async function runGitFetcher() {
  const result = await services.runVirusDataWriterService();
  console.log(result);
}

async function runTimeSeriesFetcher() {
  const result = await services.runTimeSeriesWriterService();
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

const virusDataJob = cron.job('0 0 */12 * * *', () =>
  runGitFetcher().catch(err => console.error(err))
);

const timeSeriesJob = cron.job('0 30 */12 * * *', () =>
  runTimeSeriesFetcher().catch(err => console.error(err))
);

runGitFetcher().catch(err => console.error(err))
// runTimeSeriesFetcher().catch(err => console.error(err))


newsJob.start();
virusDataJob.start();
timeSeriesJob.start();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
