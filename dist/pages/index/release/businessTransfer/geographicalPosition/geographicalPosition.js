/**  
 *   作者:  lingfe 
 *   时间:  2017-7-11
 *   描述:  发布_生意转让_地理位置页面
 * 
 * */
//获取应用实例
var app = getApp();
var server = require('../../../../../utils/server');
var utilMd5 = require('../../../../../utils/md5.js');
import __config from '../../../../../config/config'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,         //tab切换下标
    sliderOffset: 0,        //坐标x
    sliderLeft: 0,          //坐标y
    addressInfo: '定位中..',     //定位
    ad_info:[],                 //地址信息
    geographicalPosition:null,  //地理位置
  },

  //tab切换
  tabClick: function (e) {
    var that=this;
    that.setData({ sliderOffset: e.currentTarget.offsetLeft, activeIndex: e.currentTarget.id });
    //保存地理位置
    var geographicalPosition = e.currentTarget.dataset.shortname;
    //得到打开的页面
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      geographicalPosition: geographicalPosition
    })
    //返回上一页
    wx.navigateBack();

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //定位
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        server.getJSON('/waimai/api/location.php', {
          latitude: latitude,
          longitude: longitude
        }, function (res) {
          if (res.data.status != -1) {
            console.log(res);
            var city = res.data.result.ad_info.city;
            if (city.lastIndexOf("市") != -1) city = city.substring(0, city.lastIndexOf("市"));
            else if (city.lastIndexOf("区") != -1) city = city.substring(0, city.lastIndexOf("区"));
            var city_code = res.data.result.ad_info.city_code
            var code = city_code.substring(3, city_code.length);
            console.log(code);
            that.setData({ addressInfo: city, code: code });

            //必要参数
            var time = new Date().getTime();
            var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();
            var cookie = wx.getStorageSync("cookie");

            that.setData({
              time: time,
              token: token,
              cookie: cookie
            });

            //获取地址信息http://sys.echsoft.cn/api/exe/getCityList 
            that.getAdressData(that);
            
          } else {
            that.setData({ addressInfo: '定位失败' });
          }
        });
      }
    });
  },

  //得到数据
  getAdressData: function(that) {
    wx.request({
      url: __config.basePath_sys + "api/exe/getRegionList",
      method: "POST",
      header: { cookie: that.data.cookie, "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        timeStamp: that.data.time,
        token: that.data.token,
        reqJson: JSON.stringify({
          parentId: that.data.code
        })
      },
      success: function (res) {   //请求成功
      console.log(res);
      console.log(that);
        //得到地址数据
        var ad_info = res.data;

        that.setData({ ad_info: ad_info });
      },
      fail: function (res) { },
      complete: function () { }
    });
  },
})