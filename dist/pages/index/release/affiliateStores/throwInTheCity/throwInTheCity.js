// pages/index/release/affiliateStores/throwInTheCity/throwInTheCity.js
/**  
 *   作者:  lingfe 
 *   时间:  2017-9-15
 *   描述:  发布_加盟分店_投放城市页面
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
    inputShowed: false,
    inputVal: "",               //文本框值
    Letter26: ["A", "B", "C",
      "D", "E", "F", "G", "H",
      "I", "J", "K", "L", "M",
      "N", "O", "P", "Q", "R",
      "S", "T", "U", "V", "W",
      "X", "Y", "Z"],          //二十六字母
    address: [],                 //地址数据
    addressInfo: '定位中..',     //定位
    str:["全国"],
  },


  //删除筛选条件
  clearBtn: function (e) {
    var that = this;
    var values = that.data.str;
    //得到name 
    var name = e.currentTarget.dataset.name;
    //得到index 
    var index = e.currentTarget.dataset.index;
    //判断
    if (name != "" && name!=null) {
      values.splice(index, 1);
    }
    that.setData({str: values });
  },

  //选择一个地址城市
  bindtapGetAddres: function (e) {
    //得到打开的页面
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    var city = e.currentTarget.dataset.info;
    if (city.lastIndexOf("市") != -1) city = city.substring(0, city.lastIndexOf("市"));
    else if (city.lastIndexOf("区") != -1) city = city.substring(0, city.lastIndexOf("区"));
    var str=this.data.str;
    str.push(city);

    this.setData({
      str:str,
    });
    prevPage.setData({
      city: city,
      "userinfo.provinceName": city,                             //个人地址
    });

    //返回上一页
    wx.navigateBack();
  },

  //搜索
  bindtapSearch: function () {
    //从缓存里去地址数据
    var address = wx.getStorageSync("address");
    //判断是否为空
    if (address != "") {
      var that = this;
      var arr = address;
      var arrTo = [];
      for (var i = 0; i < arr.length; ++i) {
        if (arr[i].grup == that.data.inputVal || arr[i].domainName == that.data.inputVal) {
          arrTo.push(arr[i]);
        }
      }
      //重新设置地址数据
      that.setData({
        address: arrTo
      });
    }
  },

  //清空搜索框
  clearInput: function () {
    //从缓存里去地址数据
    var address = wx.getStorageSync("address");
    //判断是否为空
    if (address != "") {
      this.setData({
        inputVal: "",
        address: address
      });
      return;
    }
  },

  //文本框输入事件
  bindinputValue: function (e) {
    this.setData({ inputVal: e.detail.value });    //搜索框key
  },

  //页面加载
  onLoad: function () {
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
            var city = res.data.result.ad_info.city;
            if (city.lastIndexOf("市") != -1) city = city.substring(0, city.lastIndexOf("市"));
            else if (city.lastIndexOf("区") != -1) city = city.substring(0, city.lastIndexOf("区"));

            that.setData({ addressInfo: city });
          } else {
            that.setData({ addressInfo: '定位失败' });
          }
        });
      }
    });

    ////从缓存里去地址数据
    var address = wx.getStorageSync("address");
    if (address != "") {
      that.setData({ address: address });
      return;
    }

    //必要参数
    var time = new Date().getTime();
    var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();
    var cookie = wx.getStorageSync("cookie");

    //获取地址信息http://sys.echsoft.cn/api/exe/getCityList 
    getAdressData(that);
    function getAdressData(that) {
      wx.request({
        url: __config.basePath_sys + "api/exe/getCityList",
        method: "POST",
        header: { cookie: cookie, "Content-Type": "application/x-www-form-urlencoded" },
        data: { timeStamp: time, token: token },
        success: function (res) {   //请求成功
          //得到地址数据
          var address = res.data;
          //放进本地缓存
          wx.setStorageSync("address", address);
          that.setData({ address: address });
        },
        fail: function (res) { },
        complete: function () { }
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})