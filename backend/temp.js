const readline = require('readline');
const path = require('path');
const fs = require('fs');

var codesArray = [];

function loadCountryCodes() {
  lineReader = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, 'country-codes.csv'))
  });
  lineReader
    .on('line', line => {
      dataPoints = line.split('|');

      codesArray.push({
        code: dataPoints[0],
        name: dataPoints[1]
      });
    })
    .on('close', () => {
      // console.log(codesArray);

      newData = JSON.stringify(codesArray); //JSON.parse(data)
      fs.writeFileSync(path.join(__dirname, 'country-codes.json'), newData);
    });
}

loadCountryCodes();
