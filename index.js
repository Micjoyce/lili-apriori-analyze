// var combinations = require('combinations');
// var myArray = ['1', '2', '3', '4'];
//
// console.log(combinations(myArray));
//
// var csv2json = require('csv2json');
// var _ = require('lodash');
var fs = require('fs');
var util = require('./util')();
//
// // fs.createReadStream('analyze.csv')
// //   .pipe(csv2json({
// //     // Defaults to comma.
// //     separator: ','
// //   }))
// //   .pipe(fs.createWriteStream('data.json'));
//
// for Test
// console.log(util.findEndItem(['1','2'], ['1','2','3', '5']));
fs.readFile('data.json', 'utf8', function(err, data) {
  var analyzeData = JSON.parse(data);
  console.log(analyzeData);
  analyzeData = util.splitToArray(analyzeData);
  util.analyze(analyzeData);

});
