import config from './config/config'
import request from './assets/plugins/request'
import md5 from './utils/md5.js'
import service from './utils/server.js'
import dahuoData from './helpers/dahuoData.js'

App({
  config, //配置信息
  request,//请求
  md5,    //md5加密
  service,//位置服务
  dahuoData, //筛选数据

  //获取删选数据
  getfiltertypeinfo:function(){
    var url = config.basePath_web + "api/exe/get";
    //请求头
    var header = {
      cookie: wx.getStorageSync("cookie"),
      "Content-Type": "application/x-www-form-urlencoded"
    };
    //参数
    var data = {
      timeStamp: wx.getStorageSync("time"),
      token: wx.getStorageSync("token"),
      reqJson: JSON.stringify({
        nameSpace: 'reply',       //删选数据表
        scriptName: 'Query',
        nameSpaceMap: {
          rows: [{
            df:0
          }]
        }
      })
    };
    //发送请求
    request.reqPost(url, header, data, function (res) {
      console.log(res);
      //放入缓存中
      wx.setStorageSync("sxData", res.data.rows);
    });
  },

  //生命周期函数--监听小程序显示	。当小程序启动，或从后台进入前台显示，会触发 onShow
  onShow: function () {
    console.log('App Show')
  },

  //	生命周期函数--监听小程序隐藏	。当小程序从前台进入后台，会触发 onHide
  onHide: function () {
    console.log('App Hide')
  },

  //错误监听函数	当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
  onError: function () {
    console.log('APP Error');
  },

  //生命周期函数--监听小程序初始化。	当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    wx.getSystemInfo({
      success: function (res) {
        console.log("屏幕高度" + res.windowHeight);
        wx.setStorageSync("windowHeight", res.windowHeight)
      }
    })
  },

  //验证非空
  checkInput: function (data) {
    if (data == null || data == undefined || data == "" || data == 'null') {
      return true;
    }
    if (typeof data == "string") {
      var result = data.replace(/(^\s*)|(\s*$)/g, "");
      return result.length == 0 ? true : false;
    } else {
      return false;
    }
  },

  //当前时间
  getDateTime:function(){
    var dateTime = new Date().toLocaleString();
    return dateTime;
  },

  //时间间隔，传入一个时间计算与当前时间的间隔
  getTimeInterval(date){
    var date1 = new Date(date);    //开始时间
    var date2 = new Date();    //结束时间
    var date3 = date2.getTime() - date1.getTime()  //时间差的毫秒数

    //计算出相差月
    var months = (date2.getFullYear() - date1.getFullYear()) * 12;
    if (months != 0) {
      return months + "月";
    }

    //计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    if (days != 0) {
      return days + "天";
    }

    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    if (hours != 0) {
      return hours + "小时";
    }

    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    if (minutes != 0) {
      return minutes + "分钟";
    }

    //计算相差秒数
    var leave3 = leave2 % (60 * 1000);     //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    if (seconds != 0) {
      return seconds + "秒";
    }
  },

  //用户数据
  globalData: {         
    userInfo: null,                 //用户数据
    openid: null,                   //微信用户id

    loginAppid:'3DF7469FD3A1485B95ED16ED794780A8',  //登录服务器的appid
    appid: 'wxdb07051dc3fc031e',                    //小程序id
    secret: 'b2dec689f9b117a311891c6ac5ae9407',     //小程序的 app secret
    token: '31963CBD8CA24DEFB48B9799766F0583',      //请求唯一标识
  },
});