exports.parseCsvString = csvString => {
  var dataPoints = [];
  var sumAffectedCountries = 0;
  var sumConfirmed = 0;
  var sumDeaths = 0;
  var sumRecovered = 0;
  var data = [];
  var jsonData;
  var lineCount = 0;

  //csvString = csvString.replace('', 'Null')
  console.log(csvString);

  var r = csvString.replace(/"[^"]+"/g, function(v) {
    return v.replace(/,/g, '-').replace(' ', '');
  });
  dataPoints = r
    .replace(/\n/g, ',')
    .replace(/"/g, '')
    .split(',');
  //dataPoints = csvString.split(/\n/g)
  // console.log("-------------------------------------------------")
  // console.log(dataPoints)

  var index = 6;

  //Province/State,Country/Region,Last Update,Confirmed,Deaths,Recovered
  //    0                1            2          3        4       5
  console.log(r);
  while (index < dataPoints.length && dataPoints[index] != 'Province/State') {
    sumConfirmed += parseInt(dataPoints[index + 3]);
    sumDeaths += parseInt(dataPoints[index + 4]);
    sumRecovered += parseInt(dataPoints[index + 5]);
    sumAffectedCountries += 1;

    let newEntry = {
      place: dataPoints[index + 1],
      province: dataPoints[index],
      confirmed_cases: parseInt(dataPoints[index + 3]),
      deaths: parseInt(dataPoints[index + 4]),
      recovered: parseInt(dataPoints[index + 5])
    };

    let flag = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].place == newEntry.place) {
        flag = true;
        data[i].confirmed_cases += newEntry.confirmed_cases;
        data[i].deaths += newEntry.deaths;
        data[i].recovered += newEntry.recovered;

        sumAffectedCountries -= 1;
        break;
      }
    }

    if (!flag) {
      data.push(newEntry);

      if (newEntry.place === 'Others') sumAffectedCountries -= 1;
    }

    index += 6;
  }

  data.push({
    place: 'WORLD',
    confirmed_cases: sumConfirmed,
    deaths: sumDeaths,
    affected_countries: sumAffectedCountries,
    recovered: sumRecovered
  });

  return data;
};
