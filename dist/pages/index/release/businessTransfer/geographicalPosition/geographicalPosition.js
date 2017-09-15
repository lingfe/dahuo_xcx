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
    tabs: [{                //删选数据
      name: "云岩",
      content: [{
        minThreshold: 0,
        maxThreshold: 1,
        value: '0',
        checked: false,
      }, {
        minThreshold: 1,
        maxThreshold: 5,
        value: '1',
        checked: true,
      }, {
        minThreshold: 5,
        maxThreshold: 30,
        value: '2',
        checked: false,
      }, {
        minThreshold: 30,
        maxThreshold: 100,
        value: '3',
        checked: false,
      }, {
        minThreshold: 100,
        maxThreshold: null,
        value: '4',
        checked: false,
      }],
    },{
      name:"南明",
      content: [{
        name: '全南明',
        value: '0',
        checked: false,
      }, {
        name: '合伙创业',
        value: '1001',
        checked: false,
      }, {
        name: '生意转让',
        value: '1002',
        checked: false,
      }, {
        name: '加盟分店',
        value: '1003',
        checked: false,
      }, {
        name: '干股纳才',
        value: '1004',
        checked: false,
      }, {
        name: '金融理财',
        value: '1005',
        checked: false,
      }, {
        name: '房产投资',
        value: '1006',
        checked: false,
      }, {
        name: '微商代理',
        value: '1007',
        checked: false,
      }, {
        name: '其他',
        value: '1008',
        checked: false,
      }],
    },{
      name:"花溪",
      content: [{
        name: '全花溪',
        value: '0',
        checked: false,
      }, {
        name: '餐饮',
        value: '1',
        checked: false,
      }, {
        name: '休闲娱乐',
        value: '2001',
        checked: false,
      }, {
        name: '旅游与酒店',
        value: '2',
        checked: false,
      }, {
        name: '美发美容',
        value: '3',
        checked: false,
      }, {
        name: "教育",
        value: '30001',
        checked: false,
      }, {
        name: '服饰鞋包',
        value: '4',
        checked: false,
      }, {
        name: "生活服务",
        value: '40001',
        checked: false,
      }, {
        name: "汽车",
        value: '40002',
        checked: false,
      }, {
        name: '地产',
        value: '5',
        checked: false,
      }, {
        name: '金融',
        value: '6',
        checked: false,
      }, {
        name: "家装建材",
        value: '7',
        checked: false
      }, {
        name: '百货超市',
        value: '8',
        checked: false
      }, {
        name: '医疗保健',
        value: '9',
        checked: false
      }, {
        name: '建筑工程',
        value: '10',
        checked: false,
      }, {
        name: '工厂',
        value: '11',
        checked: false
      }, {
        name: '其他',
        value: '12',
        checked: false
      }],
    }],
    str: {
      AmountOfMoney: [{
        minThreshold: 1,
        maxThreshold: 5, i: 1
      }],                           //金额
      releaseTypeList: [],          //类型
      industryChoiceList: [],       //行业
    },
    addressInfo: '定位中..',     //定位
    ad_info:'',                 //地址信息
    geographicalPosition:null,
    num:0
  },

  //删除筛选条件,重复点击去除
  clearBtn_to: function (e) {
    var that = this;
    var str = that.data.str;
    //得到name 
    var name = e.currentTarget.dataset.name;
    //得到index 
    var index = e.currentTarget.dataset.index;
    //得到value
    var value = e.currentTarget.dataset.value;
    //得到tabs
    var tabs = that.data.tabs;
    //判断
    if (name == "AmountOfMoney") {
      for (var k = 0; k < tabs[0].content.length; ++k) {
        if (tabs[0].content[k].minThreshold == value) {
          if (tabs[0].content[k].checked == false) {
            tabs[0].content[k].checked = true;
            str.AmountOfMoney[0] = {
              minThreshold: tabs[0].content[k].minThreshold,
              maxThreshold: tabs[0].content[k].maxThreshold, i: k
            };
          } else {
            tabs[0].content[k].checked = false;
            str.AmountOfMoney[0] = [];
          }
        } else {
          tabs[0].content[k].checked = false;
        }
      }
    } else if (name == 'releaseTypeList') {
      if (value == "全部") {
        str.releaseTypeList = [];
        if (tabs[1].content[0].checked == true) {
          for (var k = 0; k < tabs[1].content.length; ++k) {
            tabs[1].content[k].checked = false;
            str.releaseTypeList.splice(k, 1);
          }
        } else {
          for (var k = 0; k < tabs[1].content.length; ++k) {
            tabs[1].content[k].checked = true;
            str.releaseTypeList.push({ releaseType: tabs[1].content[k].name, i: k });
          }
        }

      } else {
        for (var k = 0; k < tabs[1].content.length; ++k) {
          if (tabs[1].content[k].name == value) {
            if (tabs[1].content[k].checked == false) {
              tabs[1].content[k].checked = true;
              str.releaseTypeList.push({ releaseType: tabs[1].content[k].name, i: k });
            } else {
              tabs[1].content[k].checked = false;
              str.releaseTypeList.splice(k, 1);
            }
            break;
          }
        }
      }
    } else if (name == "industryChoiceList") {
      if (value == "全部") {
        str.industryChoiceList = [];
        if (tabs[2].content[0].checked == true) {
          for (var k = 0; k < tabs[2].content.length; ++k) {
            tabs[2].content[k].checked = false;
            str.industryChoiceList.splice(k, 1);
          }
        } else {
          for (var k = 0; k < tabs[2].content.length; ++k) {
            tabs[2].content[k].checked = true;
            str.industryChoiceList.push({ industryChoice: tabs[2].content[k].name, i: k });
          }
        }

      } else {
        for (var k = 0; k < tabs[2].content.length; ++k) {
          if (tabs[2].content[k].name == value) {
            if (tabs[2].content[k].checked == false) {
              tabs[2].content[k].checked = true;
              str.industryChoiceList.push({ industryChoice: tabs[2].content[k].name, i: k });
            } else {
              tabs[2].content[k].checked = false;
              str.industryChoiceList.splice(k, 1);
            }
            break;
          }
        }
      }
    }

    that.setData({ tabs: tabs, str: str });
  },

  //tab切换
  tabClick: function (e) {
    this.setData({ sliderOffset: e.currentTarget.offsetLeft, activeIndex: e.currentTarget.id });
  },

  //获取值
  dataChange: function (e) {
    if (e.detail.value.length > 500) {
      wx.showModal({
        title: '内容的长度不能打大于500',
        showCancel: false,
      });
      return;
    }
    this.setData({
      num: e.detail.value.length,
      geographicalPosition: e.detail.value
    });
  },

  //保存地理位置
  bindtapgeographicalPosition: function (e) {
    var geographicalPosition = this.data.geographicalPosition;
    //判断是否为空
    if (geographicalPosition == null) {
      wx.showModal({
        title: '地理位置不能为空!',
        showCancel: false,
      });
    } else {
      //保存地理位置
      app.globalData.geographicalPosition = geographicalPosition;
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
    }
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
            var city = res.data.result.ad_info.city;
            if (city.lastIndexOf("市") != -1) city = city.substring(0, city.lastIndexOf("市"));
            else if (city.lastIndexOf("区") != -1) city = city.substring(0, city.lastIndexOf("区"));
            var city_code = res.data.result.ad_info.city_code
            var code = city_code.substring(3, city_code.length);
            that.setData({ addressInfo: city, code: code });
          } else {
            that.setData({ addressInfo: '定位失败' });
          }
        });
      }
    });

    ////从缓存里去地址数据
    var ad_info = wx.getStorageSync("ad_info");
    if (ad_info != "") {
      that.setData({ ad_info: ad_info });
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
          var ad_info = res.data;
          //放进本地缓存
          wx.setStorageSync("ad_info", ad_info);
          that.setData({ ad_info: ad_info });
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