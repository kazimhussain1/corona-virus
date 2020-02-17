
    exports.parseCsvString = ( csvString) => {
      var dataPoints = []
      var sumAffectedCountries = 0;
      var sumConfirmed = 0;
      var sumDeaths = 0;
      var data = [];
      var jsonData;
      var lineCount = 0;
      
      //csvString = csvString.replace('', 'Null')
      
      var r  = csvString.replace(/"[^"]+"/g, function(v) { 
        return v.replace(/,/g, '-').replace(" ", '');
  });
      dataPoints = r.replace(/\n/g, ",").replace(/"/g, "").split(",")
      //dataPoints = csvString.split(/\n/g)
     // console.log("-------------------------------------------------")
     // console.log(dataPoints)
  
      var index = 6; 
  
   //Province/State,Country/Region,Last Update,Confirmed,Deaths,Recovered
   //    0                1            2          3        4       5
  
       while (index < dataPoints.length&& dataPoints[index] != 'Province/State') { 
  
            sumConfirmed += parseInt(dataPoints[index+3]);
            sumDeaths += parseInt(dataPoints[index+4]);
            sumAffectedCountries += 1;
            data.push({
              country : dataPoints[index+1],
              province : dataPoints[index],
              confirmed_cases: parseInt(dataPoints[index+3]),
              deaths: parseInt(dataPoints[index+4]),
              //notes: dataPoints[3],
              //sources: dataPoints[4]
            })
      
         index+=6; 
             }
        //   console.log(data)   
        //   console.log("total deaths: "+sumDeaths)
        //   console.log("total confirmed: "+sumConfirmed)
        //   console.log("total countries: "+sumAffectedCountries)
          
          jsonData = JSON.stringify(data);
          return jsonData
     
            }