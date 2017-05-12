var fs=require('fs');
var jobdata = require('./localdataset/jobdata.json');
var city = ['Austin', 'Boston', 'Chicago', 'Dallas', 'Houston', 'LosAngeles', 'NewYork', "Philadelphia",
    'SanDiego', 'SanFrancisco', 'Seattle', 'Washington'];
var jobbubble = {};
for (var i = 0; i < city.length; i++) {
    cityname = city[i];
    //console.log(cityname);
    data = jobdata[cityname];
        //console.log(data);
    var items = {};
    for (var k = 0; k < data.length; k++) {
        var title = data[k][0];
        //console.log(title);
 //console.log(data[k]);
        items[title] = data[k][1];
    }
    //console.log(items);
    jobbubble[cityname] = items;


}


fs.writeFileSync('./localdataset/jobbubble.js','var scores=');
fs.appendFileSync('./localdataset/jobbubble.js',JSON.stringify(jobbubble));