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
    windowHeight:1000,
    screen:false,
    tabs: ["金额", "类型", "行业"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    checkboxItems: [
      { name: '10001', value: '0' },
      { name: '10002', value: '1' },
      { name: '10003', value: '2' },
      { name: '10004', value: '3' }
    ],
    str: [],
  },
  //复选
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var str = this.data.str;
    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          str[j] = checkboxItems[i].name;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems,
      str: str
    });
  },
  //删除
  clearBtn: function (e) {
    console.log("删除了" + e.currentTarget.dataset.value);
    var values = this.data.str;
    for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
      if (values[j] == e.currentTarget.dataset.value) {
        values[j] = '';
      }
    }
    this.setData({
      str: values
    });
  },
  //重置
  bindtapReset: function (e) {
    console.log("重置了");
    this.setData({
      str: [],
    });
  },
  //tab切换
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //筛选
  bindtapScreen:function(){
    console.log("screen:" + this.data.screen);
    this.setData({
      screen:this.data.screen==true?false:true,
    });
    console.log("screen:" + this.data.screen);
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

    //筛选tab
    var that = this;
    var sliderWidth = 100;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

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
