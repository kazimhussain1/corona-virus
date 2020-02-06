var fs = require('fs');
var readline = require('readline');

var sumAffectedCountries = 0;
var sumConfirmed = 0;
var sumDeaths = 0;
var data = [];
var jsonData;
var lineCount = 0;
var isCountry = false;

function loadCountryCodes() {
  var codesArray = [];

  lineReader = readline.createInterface({
    input: fs.createReadStream('country-codes.csv')
  });
  lineReader
    .on('line', line => {
      if (lineCount >= 3) {
        dataPoints = line.split('|');

        codesArray.push({
          code: dataPoints[0],
          name: dataPoints[1]
        });
      }
    })
    .on('close', () => {
      data.forEach(object => {
        for (let i = 0; i < codesArray.length; i++) {
          if (object.place === codesArray[i].name) {
            object['code'] = codesArray[i].code;
            break;
          }
        }
      });

      jsonData = JSON.stringify(data); //JSON.parse(data)
      fs.writeFileSync('corona-data.json', jsonData);
    });
}

var lineReader = readline.createInterface({
  input: fs.createReadStream('20200128-073300-bno-2019ncov-data.csv')
});
lineReader
  .on('line', line => {
    if (lineCount >= 3) {
      dataPoints = line.split('|');

      if (dataPoints[0] === 'CHINA TOTAL') {
        isCountry = true;

        const deaths = parseInt(dataPoints[2].replace(',', ''));

        sumConfirmed += parseInt(dataPoints[1].replace(',', ''));
        sumDeaths += deaths;
        sumAffectedCountries += 1;

        data.push({
          place: 'China',

          confirmed_cases: parseInt(dataPoints[1].replace(',', '')),
          deaths: deaths,
          notes: dataPoints[3],
          sources: dataPoints[4]
        });
      } else if (isCountry) {
        const deaths = parseInt(dataPoints[2].replace(',', ''));

        sumConfirmed += parseInt(dataPoints[1].replace(',', ''));
        sumDeaths += deaths;
        sumAffectedCountries += 1;

        data.push({
          place: dataPoints[0],
          confirmed_cases: parseInt(dataPoints[1].replace(',', '')),
          deaths: deaths,
          notes: dataPoints[3],
          sources: dataPoints[4]
        });
      } else {
        const deaths = parseInt(dataPoints[2].replace(',', ''));

        data.push({
          place: dataPoints[0],
          confirmed_cases: parseInt(dataPoints[1].replace(',', '')),
          deaths: deaths,
          notes: dataPoints[3],
          sources: dataPoints[4]
        });
      }
    }
    lineCount++;
  })
  .on('close', () => {
    data.push({
      place: 'WORLD',
      confirmed_cases: sumConfirmed,
      deaths: sumDeaths,
      notes: '',
      affected_countries: sumAffectedCountries,
      sources: ''
    });
    // jsonData = JSON.stringify(data); //JSON.parse(data)
    // fs.writeFileSync('output.json', jsonData);
    loadCountryCodes();
  });
