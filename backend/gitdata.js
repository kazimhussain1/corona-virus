var fs = require('fs');
var readline = require('readline');
const axios = require('axios');
const dataprocess = require('./dataprocess.js');
const path = require('path');

function loadCountryCodes(jsonData, fileName) {
  let codesArray = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'country-codes.json'), 'utf8')
  );

  jsonData.forEach(object => {
    for (let i = 0; i < codesArray.length; i++) {
      if (object.place === codesArray[i].name) {
        object['code'] = codesArray[i].code;
        break;
      }
    }
  });

  newData = JSON.stringify(jsonData); //JSON.parse(data)
  if (!fs.existsSync(path.join(__dirname, 'virus-data'))) {
    fs.mkdirSync(path.join(__dirname, 'virus-data'));
  }
  fs.writeFileSync(
    path.join(__dirname, 'virus-data', fileName.replace('.csv', '.json')),
    newData
  );

  fs.writeFileSync(
    path.join(__dirname, 'virus-data', 'latestfile.txt'),
    fileName
  );
}

///////////////////////////////////////////////////////////////////////////////////

var updatedName;
var nameArray = [];
var saveFile = [];
var index = 0;
var flag = 0;

function writeGitFile() {
  // always executed

  if (index < saveFile.length) {
    //if(i+1 == saveFile.length ){}
    // console.log(saveFile[i]);

    axios
      .get(
        'https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_daily_reports/' +
          saveFile[index],
        {
          headers: {
            Authorization:
              '14cb3e7809d52ded11f34ec6176cc4cd801be88f87e8fe2c43696259b7c3ab7c'
          }
        }
      )
      .then(function(response) {
        // handle success

        const jsonBody = response.data.content;

        let buff = Buffer.alloc(jsonBody.length, jsonBody, 'base64');

        let Gitcontent = buff.toString('ascii');
        //console.log(Gitcontent)
        let jsonData = dataprocess.parseCsvString(Gitcontent);
        //console.log(jsonData);
        //const folderPath = './virus-data/' + saveFile[i]
        //let PATH = path.join(folderPath,saveFile[i])
        //console.log('Path: ' + folderPath)
        loadCountryCodes(jsonData, saveFile[index]);

        index++;
        writeGitFile();
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }
}

axios
  .get(
    'https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_daily_reports',
    {
      headers: {
        Authorization:
          '14cb3e7809d52ded11f34ec6176cc4cd801be88f87e8fe2c43696259b7c3ab7c'
      }
    }
  )
  .then(function(res) {
    nameArray = res.data;
    var currentFile = fs.readFileSync(
      path.join(__dirname, 'virus-data', 'latestfile.txt'),
      'utf8'
    );

    nameArray.forEach(item => {
      if (flag === 1) {
        if (path.extname(item.name) === '.csv') {
          saveFile.push(item.name);
        }
      }

      if (item.name === currentFile) {
        flag = 1;
      }
    });

    flag = 0;
  })
  .catch(function(error) {
    // handle error
    console.log(error);
  })
  .then(writeGitFile);
