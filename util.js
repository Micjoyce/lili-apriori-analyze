var _ = require('lodash');
var combinations = require('combinations');
// var myArray = ['7180', '8200', '11', '20'];
//
// console.log(combinations(myArray));
module.exports = function () {
    return {
      splitToArray: function (data) {
          if (!_.isArray(data)) {
            return console.log(`${data} 不是一个数组`);
          }
          var result = [];
          data.forEach(function(item, i){
            if (item && item.type && _.isString(item.type)) {
              var spItem = item.type.split("-");
              var support = parseFloat(item.support);
              result.push({
                type: spItem,
                support: item.support
              })
            }else {
              console.log(`${item} 不是一个有效的字符串`);
            }
          });
          return result;
      },
      analyze: function(analyzeData) {
        var result = [];
        var self = this;
        // {frontItem: {
        //   type: ["10"],
        //   support: 0.5
        // }, endItem: {
        //   type: ['10','20'],
        //   support: 0.2
        // }, support: 0.2/0.5}
        console.log(analyzeData);
        analyzeData.forEach(function(item, index) {
          var typeLen = item.type.length;
          // 遍历项数大于等于2的项集，不处理一项集
          if (item.type && typeLen >= 2) {
            // 得到其Cn项
            //
            var comArray = combinations(item.type);
            comArray.forEach(function(comItem, i) {
              // 获取comItem的支持度
              var itemSupport = self.findSupport(comItem, analyzeData);
              console.log(itemSupport);
              // 找出后项
              // 得出结果
            });
          }
        });
      },
      findSupport: function(comItem, analyzeData) {
        var toStr = comItem.join('-');
        var findItem = _.find(analyzeData, function(item) {
          return item.type.join('-') === toStr;
        });
        return findItem.support;
      },
      findEndItem: function(frontItem, item) {
        var frontLastItem = frontItem[frontItem.length - 1];
        var index = item.indexOf(frontLastItem);
        if (index < 0) {
          return console.log("${frontItem}前向${frontLastItem}的最后一个item在${item}中找不到");
        }
        var endItem = item.slice(index + 1, item.length);
        return endItem
      },
    };
};
