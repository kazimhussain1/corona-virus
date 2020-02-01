var fs = require("fs");
var readline = require("readline");

var lineReader = readline.createInterface({
  input: fs.createReadStream("20200128-073300-bno-2019ncov-data.csv")
});

var data = [];
var jsonData;
lineReader
  .on("line", line => {
    dataPoints = line.split("|");
    // place|confirmed_cases|deaths|notes|sources
    data.push({
      place: dataPoints[0],
      confirmed_cases: dataPoints[1],
      deaths: dataPoints[2],
      notes: dataPoints[3],
      sources: dataPoints[4]
    });
  })
  .on("close", () => {
    jsonData = JSON.stringify(data); //JSON.parse(data)
    console.log(jsonData);

    // Or
    fs.writeFileSync("output.json", jsonData);
  });
