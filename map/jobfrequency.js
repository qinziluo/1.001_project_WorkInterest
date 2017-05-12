var fs = require('fs');
var joblist = require('./localdataset/joblist.json');
for (var i = 0; i < joblist.length; i++) {
    joblist[i] = joblist[i].toLowerCase()
}

var jobdata = require('./localdataset/jobdata.json');
var city = ['Austin', 'Boston', 'Chicago', 'Dallas', 'Houston', 'LosAngeles', 'NewYork', "Philadelphia",
    'SanDiego', 'SanFrancisco', 'Seattle', 'Washington'];
var jobcount = {};
var cityjobcount = {};
var topjobcount = {};
var keys={};
//console.log(city.length)
for (var i = 0; i < city.length; i++) {
    
    var cityname = city[i];
    //console.log('jobdata');
    //console.log(jobdata);

    var newjobdata = jobdata[cityname];
    for (var m = 0; m < joblist.length; m++) {
        jobtitlesplit = joblist[m].split(' ');
        //console.log(jobtitlesplit)
        var titlenumber = 0;
        for (var n = 0; n < jobtitlesplit.length; n++) {
            for (k = 0; k < newjobdata.length; k++) {
                //console.log(jobtitlesplit[n]);
                //console.log(newjobdata[k][0]);
                if (jobtitlesplit[n] === newjobdata[k][0]) {
                    //console.log('hi')
                    titlenumber += newjobdata[k][1];
                    //console.log(titlenumber);
                }
            }

        }
        //console.log(joblist[m]);
        var jobtitle = joblist[m];
        jobcount[jobtitle] = titlenumber;
    }
    cityjobcount[cityname] = jobcount;
    //console.log(cityjobcount.Austin);
    
    keys[cityname] = Object.keys(cityjobcount[cityname]).sort(function (a, b) { return cityjobcount[cityname][b] - cityjobcount[cityname][a] });
 
    //var topjob = [];
    // for (var a = 0; a < joblist.length; a++) {
    //     //console.log(cityjobcount[cityname][joblist[i]]);
    //     if (cityjobcount[cityname][joblist[a]] > 2000) {
    //         //console.log(topjob);
    //         //console.log(typeof(joblist[i]));
    //         var title = joblist[a];
    //         topjob.push(title);
    //     }
    //     //console.log(topjob);
    // }
    //topjobcount[cityname] = topjob;

    //console.log(topjobcount)
    keys[cityname]=keys[cityname].slice(0,49);
}
fs.writeFile('top50jobcount.json', JSON.stringify(keys));

