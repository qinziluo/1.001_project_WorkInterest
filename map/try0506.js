var jobdata = require('.localdataset/jobdata.json');
data = jobdata['Boston'];
var items = [];
for (var i = 0; i < data.length; i++) {
    var ele = {};
    ele.text = data[i][0];
    ele.count = data[i][1];
    //console.log(ele);
    items[i] = ele;
}
console.log(items);