var fs = require('fs');

var companydata = {};
var jobdata = {};
var alldata={};
var city = ['Austin', 'Boston', 'Chicago', 'Dallas', 'Houston', 'LosAngeles', 'NewYork', "Philadelphia",
    'SanDiego', 'Sanfrancisco', 'Seattle', 'Washington'];


for (var i = 0; i < city.length; i++) {
     var cityname=city[i];
    companydata[cityname] = require('./localdataset/' + city[i] + 'companydata.json');
  
    jobdata[cityname] = require('./localdataset/' + city[i] + 'jobdata.json');
    alldata[cityname] = require('./localdataset/' + city[i] + 'alldata.json');
   
}
fs.writeFile('./localdataset/alldata.js', 'var alldata=');
fs.appendFile('./localdataset/alldata.js', JSON.stringify(alldata));
fs.appendFile('./localdataset/companydata.js', JSON.stringify(companydata));
fs.writeFile('./localdataset/companydata.js', 'var companydata=');
fs.appendFile('./localdataset/companydata.js', JSON.stringify(companydata));
fs.writeFile('./localdataset/jobdata.js', 'var jobdata=');
fs.appendFile('./localdataset/jobdata.js', JSON.stringify(jobdata));
