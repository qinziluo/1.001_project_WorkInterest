fs = require('fs');
var jobdata = require('./jobsConvertcsv.json');
var length = jobdata.length;
var newlist = [];
for (var i=0; i<length; i++){
    var job = jobdata[i]["FIELD1"];
    newlist.push(job); 
}
console.log(newlist);
fs.writeFile('cleanJoblist.json', JSON.stringify(newlist)); 
