//获取应用实例
var app = getApp();
var server = require('../../utils/server');
Page({
  //这个页面，数据
  data: {
    inputShowed: false,
    inputVal: "",
    addressInfo:'定位中..'
  },
  //显示 input
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  //隐藏  input
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  //关闭  input
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  //文本框输入事件
  bindinputValue:function(){

  },

  //页面加载
  onLoad:function(){
    var self = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        server.getJSON('/waimai/api/location.php', {
          latitude: latitude,
          longitude: longitude
        }, function (res) {
          console.log(res)
          if (res.data.status != -1) {
            self.setData({
              addressInfo: res.data.result.address_reference.landmark_l2.title
            });
          } else {
            self.setData({
              addressInfo: '定位失败'
            });
          }
        });
      }
    });
  }
});