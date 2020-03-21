var fs = require('fs');
const axios = require('axios');
const dataprocess = require('./dataprocess.js');
const path = require('path');
const client = require('../db/mongo');

const { workerData, parentPort } = require('worker_threads');

function loadCountryCodes(jsonData, fileName) {
  let codesArray = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../', 'country-codes.json'), 'utf8')
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
  if (!fs.existsSync(path.join(__dirname, '../', 'virus-data'))) {
    fs.mkdirSync(path.join(__dirname, '../', 'virus-data'));
  }

  ///////////////////////////////////////
  fs.writeFileSync(
    path.join(
      __dirname,
      '../',
      'virus-data',
      fileName.replace('.csv', '.json')
    ),
    newData
  );

  // fs.writeFileSync(
  //   path.join(__dirname, '../', 'virus-data', 'latestfile.txt'),
  //   fileName
  // );

  client.connect().then(()=>{

    try{
    client.db('corona_db').collection('affected_countries').insertOne({
      date: fileName.replace('.csv',''),
      country_list:jsonData})

      let myQuery = {name: 'latest_file'};
      let newValue = {$set:{date: fileName}};

      client.db('corona_db').collection('latest_date').updateOne(myQuery,newValue, (err, res)=>{

        if (err) throw err;

        // console.log('yeah boii', res)
      });
    } catch(e){
      console.log(e)
    }
  }).catch((err)=>{
    console.log(err)
  })


  //////////////////////////////////////////////
}

///////////////////////////////////////////////////////////////////////////////////

var nameArray = [];
var saveFile = [];
var index = 0;
var flag = 0;

function writeGitFile() {
  // always executed

  console.log('we here before if')

  if (index < saveFile.length) {
    //if(i+1 == saveFile.length ){}
    console.log('we here before axios')

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
        let jsonData = dataprocess.parseCsvString(Gitcontent);
        console.log('we here')
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
  } else {
    parentPort.postMessage({ message: 'Git Files Succesfully Fetched.' });
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
    // var currentFile = fs.readFileSync(
    //   path.join(__dirname, '../', 'virus-data', 'latestfile.txt'),
    //   'utf8'
    // );

    let currentFile = null;

    client.connect().then(()=>{

      let myQuery = {name: 'latest_file'};
      client.db('corona_db').collection('latest_date').findOne(myQuery, (err, res)=>{

        if (err) throw err;

       currentFile = res.date;


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
      
        console.log(saveFile);
    
        flag = 0;

        writeGitFile();  


      })

    }).catch((err)=>{
      console.log(err);
    })


    
  })
  .catch(function(error) {
    // handle error
    console.log(error);
  })
