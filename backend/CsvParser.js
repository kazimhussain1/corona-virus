var fs = require('fs');
var readline = require('readline');

var sumAffectedCountries = 0;
var sumConfirmed = 0;
var sumDeaths = 0;
var data = [];
var jsonData;
lineCount = 0;

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
      fs.writeFileSync('output.json', jsonData);
    });
}

var lineReader = readline.createInterface({
  input: fs.createReadStream('20200128-073300-bno-2019ncov-data.csv')
});
lineReader
  .on('line', line => {
    if (lineCount >= 3) {
      dataPoints = line.split('|');
      // place|confirmed_cases|deaths|notes|sources

      // console.log(dataPoints[1] + '\n');
      sumConfirmed += parseInt(dataPoints[1]);
      sumDeaths += parseInt(dataPoints[2]);
      sumAffectedCountries += 1;
      data.push({
        place: dataPoints[0],
        confirmed_cases: parseInt(dataPoints[1]),
        deaths: parseInt(dataPoints[2]),
        notes: dataPoints[3],
        sources: dataPoints[4]
      });
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
