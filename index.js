var csv2json = require('csv2json');
var _ = require('lodash');
var fs = require('fs');
var util = require('./util')();
var json2csv = require('json2csv');
var argv = require('yargs').argv;

// mode equal raw will convert csv to json
// mode equal analyze will analyze json data and save to csv --> analyze-result.csv
if (argv.mode === "raw") {
  console.log("---------------------------转化数据---------------------------");
  fs.createReadStream('analyze.csv')
    .pipe(csv2json({
      // Defaults to comma.
      separator: ','
    }))
    .pipe(fs.createWriteStream('data.json'));
} else {
  console.log("---------------------------分析数据---------------------------");
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
}
