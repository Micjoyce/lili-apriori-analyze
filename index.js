// var combinations = require('combinations');
// var myArray = ['1', '2', '3', '4'];
//
// console.log(combinations(myArray));
//
// var csv2json = require('csv2json');
// var _ = require('lodash');
var fs = require('fs');
var util = require('./util')();
var json2csv = require('json2csv');
//
// // fs.createReadStream('analyze.csv')
// //   .pipe(csv2json({
// //     // Defaults to comma.
// //     separator: ','
// //   }))
// //   .pipe(fs.createWriteStream('data.json'));
//

// 转换数据
fs.readFile('data.json', 'utf8', function(err, data) {
    var analyzeData = JSON.parse(data);
    analyzeData = util.splitToArray(analyzeData);
    var resultJson = util.analyze(analyzeData);

    // json转换为csv格式
    var fields = ['item' , 'itemSupport','frontItem','frontItemSupport','endItem','endItemSupport','calcSupport']
    var csv = json2csv({
        data: resultJson,
        fields: fields
    });

    fs.writeFile('analyze-result.csv', csv, function(err) {
        if (err) throw err;
        console.log('analyze-result saved');
    });


});
