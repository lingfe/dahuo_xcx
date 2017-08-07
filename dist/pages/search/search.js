//获取应用实例
var app = getApp();
var server = require('../../utils/server');
Page({
  //这个页面，数据
  data: {
    inputShowed: false,
    inputVal: "",
    address: [
       { letter: 'A', info: ['安顺', '安阳']},
       { letter: 'B', info: ['北京', '毕节','宝鸡'] },
       { letter: 'C', info: ['长沙', '长春', '重庆', '朝阳'] },
       { letter: 'G', info: ['贵阳'] }
    ],
    addressInfo: '定位中..',
  },
  bindtapGetAddres:function(e){
    //得到打开的页面
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      addressInfo: e.currentTarget.dataset.info
    });
    //返回上一页
    wx.navigateBack();
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
              addressInfo: res.data.result.ad_info.city
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