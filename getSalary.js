var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var topjob = require('./JobTitleData/top50jobcount.json');

var city = ['Austin', 'Boston', 'Dallas','Chicago',  'Houston', 'LosAngeles', 'NewYork', "Philadelphia",
'SanDiego', 'Sanfrancisco', 'Seattle', 'Washington'];
var length = city.length;
var cityUrls = {};

// console.log(topjob);
var geturls = function(){
    for(var i = 0; i<city.length; i++){
        var city_key = city[i];
        top_list = topjob[city_key];
        var eachUrl = {};
        for(var j=0; j<top_list.length; j++){
            var title = top_list[j];
            var title_list = title.split(" ");
            var titleStr = ""; 
            for(var k=0; k<title_list.length; k++){
                var baseStr = title_list[k] + '%20'
                titleStr += baseStr; 
            }
            titleStr += 'salary';
            var url = 'https://www.google.com/search?q=' + titleStr; 
            eachUrl[title] = url;
        }
        cityUrls[city_key] = eachUrl;
}
return cityUrls; 
};

var download = function(url){
	return new Promise(function(resolve, reject){
		function callback(error, response, body){
			if(!error){
				resolve(body);
			}
			else{
				reject(error);
			}
		}
		request(url, callback);
	});
};

var save = function(data, filename){
	return new Promise(function(resolve, reject){
		fs.writeFile(filename, data, function(err) {
			if(err) {
				reject(error);
			}
			resolve('The ' + filename + ' was saved!');
		}); 
	});
};



var getData = function(city, urls){
    urls.forEach(function(url){
    var page = download(url[1]);
    page.then(function(body){
        var filename = './SalaryDataSet/test/'+ city  + '_' + url[0]+ '.html';
        return save(body, filename); 
    });
    });
};


var Clear = function(city, urls){
    urls.forEach(function(url){
        var filename = './SalaryDataSet/'+ city  + '_' + url[0]+ '.html';
        var content = fs.readFileSync(filename, 'utf-8');
        content=content.replace(/\n/g,'');
        content=content.replace(/\r\n/g,'');
        content = fs.writeFileSync('./SalaryDataSet/'+ city  + '_' + url[0]+ '.html', content);
    });

};

var getSalary = function(city, urls){
    var eachcitysalary = {};
    urls.forEach(function(url){
        var data = fs.readFileSync('./SalaryDataSet/'+ city  + '_' + url[0]+ '.html','utf-8');
        // console.log(data); 
        var $ = cheerio.load(data);
        $('span._m3b').each(function(i, element){
            // console.log(typeof($(element).text()));
            var salary = $(element).text();
            salarylist = salary.split('(');
            // console.log(salarylist); 
            eachcitysalary[url[0]] = salarylist[0]; 
        });
        
             
    })
    return eachcitysalary;   
};


//Main functions to get salary data in proper data structure

var getcitysalary = function(){
    var citySalary = {};
    for (var i = 0; i< city.length; i++){
        var c_key = city[i];
        var urls = [];
        var titles_incity = [];
        var cityUrls = geturls(); 
        // console.log(cityUrls); 
     
        var jobset = cityUrls[c_key];
        for(var title in jobset){
            titles_incity.push(title);
            titles_incity.push(jobset[title]); 
            urls.push(titles_incity);
            titles_incity = [];
        }
        // setTimeout(function(){ getData(c_key, urls); }, 5000);
        getData(c_key, urls); 

    }
    return citySalary;
}; 

// var citySalary = getcitysalary();
// console.log(getcitysalary());
fs.writeFile('./map/salaryRequested.json', JSON.stringify(getcitysalary()));


