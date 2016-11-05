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
        analyzeData.forEach(function(item, index) {
          var typeLen = item.type.length;
          // 遍历项数大于等于2的项集，不处理一项集
          if (item.type && typeLen >= 2) {
            // 得到其Cn项
            //
            var comArray = combinations(item.type);
            comArray.forEach(function(comItem, i) {
              // 排除前向与当前项相同的数据
              if (comItem.length >= item.type.length ) {
                return;
              }
              // 获取comItem的支持度
              var itemSupport = self.findSupport(comItem, analyzeData);
              if (!itemSupport) {
                return console.log(`${comItem}找不到支持度，确认数据是否错误。`);
              }

              // 找出后项
              var endItem = self.findEndItem(comItem, item.type);
              // console.log(comItem, endItem, item.type);

              // 找出后项的支持度
              var endItemSupport = self.findSupport(endItem, analyzeData);
              if (!endItemSupport) {
                return console.log(`找不到后项${endItem}的支持度，前项为${comItem}, 整项为${item.type}`);
              }
              // 得出结果
              var calcSupport = item.support / itemSupport;
              result.push({
                item: item.type,
                itemSupport: item.support,
                frontItem: comItem,
                frontItemSupport: itemSupport,
                endItem: endItem,
                endItemSupport: endItemSupport,
                calcSupport: calcSupport
              })
            });
          }
        });
        return result;
      },
      findSupport: function(comItem, analyzeData) {
        var toStr = comItem.join('-');
        var findItem = _.find(analyzeData, function(item) {
          return item.type.join('-') === toStr;
        });
        if (!findItem || !findItem.support) {
          return null;
        }
        return findItem.support;
      },
      findEndItem: function(frontItem, item) {
        if (!_.isArray(frontItem) || !_.isArray(item)) {
          return console.log(`${frontItem}或${item}不是数组，请检查数据是否有误`);
        }
        var endItem = _.difference(item, frontItem);

        return endItem
      },
    };
};
