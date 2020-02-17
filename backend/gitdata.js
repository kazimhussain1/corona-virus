var fs = require("fs");
var readline = require("readline");
const axios = require('axios')
const dataprocess = require('./dataprocess.js')
const path = require('path')



///////////////////////////////////////////////////////////////////////////////////

var updatedName;
var nameArray = [];
var saveFile = []
var index = 0
var flag = 0
axios.get("https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_daily_reports")
.then(function(res){
  
  nameArray = res.data
  var currentFile = fs.readFileSync('latestfile.txt', 'utf8');
  
  for(value in nameArray){
    
    if ( flag == 1){
      if(nameArray[value].name != 'README.md'){
        saveFile[index] = nameArray[value].name
        index++
      }
      
    }

    if(nameArray[value].name == currentFile){
        flag = 1
       
    }
  }
  flag = 0
  
  })   
  .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
      
      for(var i=0; i<saveFile.length;i++){
        //if(i+1 == saveFile.length ){}
        console.log(saveFile[i])
        
          axios.get("https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_daily_reports/"+ saveFile[i])
          .then(function (response) {
            // handle success
            
            jsonBody = response.data.content
            
            let buff = Buffer.alloc(
              jsonBody.length,
              jsonBody,
              "base64"
            );
          
            let Gitcontent = buff.toString("ascii");
            //console.log(Gitcontent)
            let jsonData = dataprocess.parseCsvString(Gitcontent);
            console.log(jsonData)
            //const folderPath = './virus-data/' + saveFile[i]
            //let PATH = path.join(folderPath,saveFile[i])
            //console.log('Path: ' + folderPath)
            fs.writeFileSync('output.txt', jsonData);
            
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });

        
      }
    });




