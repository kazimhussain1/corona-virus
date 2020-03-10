var fs = require('fs');
const axios = require('axios');
const path = require('path');
const parse = require('csv-parse');

const { workerData, parentPort } = require('worker_threads');


class TimeSeriesFetcher {

  constructor() {
    this.fileNames = [
      'time_series_19-covid-Confirmed.csv',
      'time_series_19-covid-Deaths.csv',
      'time_series_19-covid-Recovered.csv'
    ];

    this.outputFileNames = [
      'time_series_confirmed.json',
      'time_series_deaths.json',
      'time_series_recovered.json'
    ];

    this.index = 0;
  }

  calculateTotalAndWriteToFile = (err, records) => {
    if (err) throw err;

    let totals = [];

    for (let i = 4; i < records[0].length; i++) {
      let object = {};
      object['date'] = records[0][i];
      object['count'] = (function() {
        let sum = 0;
        for (let j = 1; j < records.length; j++) {
          sum += parseInt(records[j][i]);
        }
        return sum;
      })();

      totals.push(object);
    }

    fs.writeFileSync(
      path.join(
        __dirname,
        '../',
        'virus-data',
        this.outputFileNames[this.index]
      ),
      JSON.stringify(totals)
    );

    this.index++;
    this.getCSVdata();
  };

  getCSVdata = () => {
    if (this.index < this.fileNames.length) {
      axios
        .get(
          `https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_time_series/${
            this.fileNames[this.index]
          }`,
          {
            headers: {
              Authorization:
                '14cb3e7809d52ded11f34ec6176cc4cd801be88f87e8fe2c43696259b7c3ab7c'
            }
          }
        )
        .then(response => {
          // handle success

          const jsonBody = response.data.content;

          let buff = Buffer.alloc(jsonBody.length, jsonBody, 'base64');

          let Gitcontent = buff.toString('ascii');

          let csvString = Gitcontent.replace(/"[^"]+"/g, function(v) {
            return v.replace(/,/g, '-').replace(' ', '');
          });

          const end = csvString.indexOf(
            'Province/State',
            'Province/State'.length
          );

          csvString = csvString.substring(0, end);

          parse(csvString.trim(), {}, this.calculateTotalAndWriteToFile);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .then(function() {
          // always executed
        });
    } else {
      parentPort.postMessage('Time Series Data Fetched and Loaded');
    }
  };
}

new TimeSeriesFetcher().getCSVdata();
