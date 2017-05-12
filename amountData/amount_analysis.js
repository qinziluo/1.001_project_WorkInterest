var fs = require('fs');
var cities = ["New+York+City%2C+NY", "San+Francisco%2C+CA", "Washington%2C+DC", "Los+Angeles%2C+CA","Boston%2C+MA","Chicago%2C+IL", "Seattle%2C+WA", "Austin%2C+TX","San+Diego%2C+CA","Houston%2C+TX","Dallas%2C+TX", "Philadelphia%2C+PA"];
var cityName = ["New York", "San Francisco", "Washington", "Los Angeles", "Boston", "Chicago", "Seattle", "Austin", "San Diego", "Houston", "Dallas", "Philadelphia"]; 
var cityState = [
    "New York, NY, USA",
    "San Francisco, CA, USA",
    "Washington, DC, USA",
    "Los Angeles, CA, USA",
    "Boston, MA, USA",
    "Chicago, IL, USA",
    "Seattle, WA, USA",
    "Austin, TX, USA",
    "San Diego, CA, USA",
    "Houston, TX, USA",
    "Dallas, TX, USA",
    "Philadelphia, PA, USA"
]
city_state = {}
city_code = {};
city_amount = {};
length = cities.length;

for(var i =0; i< length; i++){
    var key = cityName[i];
    var value = cities[i];
    city_code[key] = value;
}

// console.log(city_code);
// fs.writeFile('cityCode.json', JSON.stringify(city_code)); 

for(var i =0; i< length; i++){
    var city = cityName[i];
    var code = city_code[city];
    var filename = "amount_" + code + ".json";
    var amount = fs.readFileSync(filename, 'utf-8');
    city_amount[city] = Number(amount); 
    city_state[cityState[i]] = Number(amount)
}
// console.log(city_state); 

// console.log(city_amount); 
// fs.writeFile('amount_analyzed.json', JSON.stringify(city_amount));
var coordinate = require('./coordinate.json');
// console.log(coordinate);
length = coordinate.length;

var citymap = {};
for (var city in city_state) {
  if (city_state.hasOwnProperty(city)) {
    //   console.log(city); 
    //   jobAmount = city_state[city];
      for(var i=0; i< length; i++){
        cityobject = coordinate[i];
        var city_check = cityobject["city"]; 

        if(city == city_check){
            // console.log(cityobject["ll"]);
            var latilongi = cityobject["ll"]; 
            
            var ll_list = latilongi.split(",");
            // console.log(ll_list);
            var ll_update = ll_list.map(function(item){
                item = Number(item);
                return item; 
            });
            // console.log(ll_update);
            var location = {};
            location['lat'] = ll_update[0];
            location['lng'] = ll_update[1];
            var eachinfo = {};
            eachinfo['center'] = location;
            eachinfo['amount'] = city_state[city];
            citymap[city] = eachinfo;
            // var eachcity = {};
            // eachcity[city] = eachinfo;
            // console.log(eachcity);  

        }
            // console.log(ll)
    }
    
    }
  }

console.log(citymap);
fs.writeFile('amountToMap_data.json', JSON.stringify(citymap)); 