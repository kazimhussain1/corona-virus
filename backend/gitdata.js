var fs = require("fs");
var request = require("request");
var readline = require("readline");

class CsvParser {
  parseCsvString(csvString) {
    var sumAffectedCountries = 0;
    var sumConfirmed = 0;
    var sumDeaths = 0;
    var data = [];
    var jsonData;
    var lineCount = 0;

    var lineReader = readline.createInterface({
      input: fs.createReadStream(csvString)
    });
    lineReader
      .on("line", line => {
        if (lineCount >= 3) {
          dataPoints = line.split("|");
          // place|confirmed_cases|deaths|notes|sources

          //   console.log(dataPoints[1] + "\n");
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
      .on("close", () => {
        data.push({
          place: "WORLD",
          confirmed_cases: sumConfirmed,
          deaths: sumDeaths,
          notes: "",
          affected_countries: sumAffectedCountries,
          sources: ""
        });
        jsonData = JSON.stringify(data); //JSON.parse(data)

        // Or
        fs.writeFileSync("output.json", jsonData);
      });
  }
}

var nameArray = [];
request(
  {
    url:
      "https://api.github.com/repos/globalcitizen/2019-wuhan-coronavirus-data/contents/data-sources/bno/data/20200201-043100-bno-2019ncov-data.csv",
    method: "GET",
    headers: {
      "User-Agent": "globalcitizen"
    }
  },
  function(error, response, body) {
    //console.log("error:", error); // Print the error if one occurred
    //console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    //console.log("body:", body); // Print the HTML for the Google homepage.
    //------------------file checking, picking latest file

    // var currentFile = fs.readFileSync('latestfile.txt', 'utf8');
    // console.log(currentFile)

    // jsonBody = JSON.parse(body)
    // console.log(jsonBody[0].name)

    // for(var i = jsonBody.length; i > 0; i--) {
    //     var obj = jsonBody[i];

    //     if (obj.name != currentFile){

    //     }
    //     console.log(obj.name);
    //}
    ///////////////////////////////////////////////////////////////////////////

    fs.writeFileSync("git_content.json", body);
    jsonBody = JSON.parse(body);
    //console.log(jsonBody.content)
    let buff = Buffer.alloc(
      jsonBody.content.length,
      jsonBody.content,
      "base64"
    );
    let text = buff.toString("ascii");
    new CsvParser().parseCsvString(text);
    console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR')
  }
);
//request.get('https://github.com/globalcitizen/2019-wuhan-coronavirus-data/tree/master/data-sources/bno/data')
