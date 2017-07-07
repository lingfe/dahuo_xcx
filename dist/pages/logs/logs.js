/**  作者:  lingfe 
 *   时间:  2017-7-7
 *   描述:  日志页面
 * 
 * */

//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  }
})
