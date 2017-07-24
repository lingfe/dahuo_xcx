/**  
 *   作者:  lingfe 
 *   时间:  2017-7-7
 *   描述:  信息页面，首页
 * 
 * */

//index.js
//获取应用实例
var app = getApp();
var server = require('../../utils/server');

Page({
  //页面的初始数据
  data: {
    PriceRange: ['1 - 5 万', '5 - 15 万','15 - 25 万','25 - 50 万','50 - 500 万'],
    priceIndex:0,
    address:['北京','上海','深圳','广州','贵阳'],
    addressIndex:0,
    addressInfo:'定位中..',
    isHiddenLoading:true,
    isHiddenToast:true,
    isPrices:false,
    windowHeight:1000
  },
  getInputValue:function(e){
    console.log("dataset:" + e.currentTarget.dataset.value);
    console.log("tagName:" + e.currentTarget.tagName);
    console.log("id:" + e.currentTarget.id); 

    wx.showModal({
      title: e.currentTarget.name,
      content: e.currentTarget.value,
    });
  },

  //分享
  onShareAppMessage: function (e) {
    return {
      title: '分享',
      path: '/page/user?id=123'
    }
  },
  //是否显示选择价格
  bindtapButton:function(e){
    console.log('是否显示选择价格  发生选择改变，携带值为', this.data.isPrices);
    this.setData({
      isPrices: this.data.isPrices == false ? true : false
    });
  },
  //选择价格
  bindtapPrices:function(e){
    console.log('选择价格  发生选择改变，携带值为', e.currentTarget.dataset.index);
    var index=e.currentTarget.dataset.index;
    this.setData({
      priceIndex: index,
      isPrices: this.data.isPrices == false ? true : false
    });
  },
  //选择地址
  setAddressInfo:function(e){
    console.log('定位 发生选择改变，携带值为', e.detail.value);
    this.setData({
      addressIndex: e.detail.value
    });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  },
  // 下拉刷新
  upper: function (e) {
    console.log("下拉刷新了");
    this.requestData("newlist");
  },
  // 加载 
  lower: function (e) {
    console.log("加载更多了");
    this.requestData("list");
  },
  closeToast: function (e) {
    this.setData({
      isHiddenToast: true
    });
  },
  openLocation: function (e) {

    console.log(e)

    var value = e.detail.value

    console.log(value)



  },
  //页面加载
  onLoad: function () {
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

    this.setData({
      windowHeight: wx.getStorageSync('windowHeight')
    });

    this.requestData("newlist");

  },
  requestData: function (a) {
    var that = this;
    //  请求数据
    wx.request({
      url: "http://api.budejie.com/api/api_open.php",
      data: {
        a: a,
        c: "data",
        maxtime: that.data.maxtime,
        type: 29
      },
      method: "GET",
      success: function (res) {
        console.log(res);
        that.setData({
          isHiddenLoading: true,
          dataList: res.data.list,
          maxtime: res.data.info.maxtime,
          isHiddenToast: false
        });
        console.log("成功了");
      },
      fail: function () {
        console.log("失败了");
      }
    });
  }
});
