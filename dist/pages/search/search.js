/**  
 *   作者:  lingfe 
 *   时间:  2017-7-11
 *   描述:  地址
 * 
 * */

//获取应用实例
var app = getApp();

Page({
  data: {
    inputShowed: false,
    inputVal: "",               //文本框值
    Letter26: ["A", "B", "C",
      "D", "E", "F", "G", "H",
      "I", "J", "K", "L", "M",
      "N", "O", "P", "Q", "R",
      "S", "T", "U", "V", "W",
      "X", "Y", "Z"],        //二十六字母
    address: [],             //地址数据
    addressInfo: '贵阳',     //定位
  },

  //选择一个地址城市
  bindtapGetAddres: function (e) {
    //得到打开的页面
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    var city = e.currentTarget.dataset.info;
    prevPage.setData({
      "userinfo.provinceName": city,        //个人地址
      obj:city
    });

    //返回上一页
    wx.navigateBack();
  },

  //搜索
  bindtapSearch: function (e) {
    //从缓存里去地址数据
    var address = wx.getStorageSync("address");
    //判断是否为空
    if (address != "") {
      var that = this;
      var arrTo = [];
      var inputVal=that.data.inputVal;
      var json=JSON.stringify(address);
      //判断搜索
      if (json.lastIndexOf(inputVal)!=-1){
        for (var i = 0; i < address.length; ++i) {
          if (address[i].shortName == inputVal) {
            arrTo.push(address[i]);
          }
        }

        //重新设置地址数据
        that.setData({
          address: arrTo
        });
      }else{
        wx.showModal({
          title: '没有搜索到:'+inputVal,
          showCancel: false,
        });
      }
    }else{
      wx.showModal({
        title: '没有数据!',
        showCancel: false,
      });
    }
  },

  //清空搜索框
  clearInput: function (e) {
    this.setData({inputVal: ""});
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
        console.log(res)
        app.service.getJSON('/waimai/api/location.php', {
          latitude: res.latitude,
          longitude: res.longitude
        }, function (res) {
          console.log(res)
          if (res.data.status != -1) {
             var city = res.data.result.ad_info.city;
             if (app.checkInput(city)) return;
             if (city.lastIndexOf("市") != -1) city = city.substring(0, city.lastIndexOf("市"));
             else if (city.lastIndexOf("区") != -1) city = city.substring(0, city.lastIndexOf("区"));
             that.setData({ addressInfo: city });
          } else {
            that.setData({ addressInfo: '定位失败' });
          }
        });
      }
    });

    //从缓存里去地址数据
    var address = wx.getStorageSync("address");
    if (address != "") {
      that.setData({ address: address });
      return;
    }

    //调用获取地址
    var url = app.config.basePath_sys + "api/exe/getCityList";
    //请求头
    var header= { 
      cookie: wx.getStorageSync("cookie"), 
      "Content-Type": "application/x-www-form-urlencoded" 
    };
    //参数
    var data={
      timeStamp: wx.getStorageSync("time"), 
      token: wx.getStorageSync("token") 
    };

    //发送请求
    app.request.reqPost(url,header,data,function(res){
      //得到地址数据
      var address = res.data.rows;
      //放进本地缓存
      wx.setStorageSync("address", address);
      that.setData({ address: address });
    });
  }
});