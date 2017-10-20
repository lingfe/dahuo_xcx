import config from './config/config'
import request from './assets/plugins/request'
import md5 from './utils/md5.js'
import service from './utils/server.js'

App({
  config, //配置信息
  request,//请求
  md5,    //md5加密
  service,//位置服务

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
    var app=this;
    app.getOpenId(app);
    app.getUserInfo(app);

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

  //获取openid
  getOpenId:function(app){
    //调用登录接口
    wx.login({
      success: function (logRes) {
        //获取openid
        var url = config.login_sys + 'sns/jscode2session';
        var data = {
          appid: app.globalData.appid,
          secret: app.globalData.secret,
          js_code: logRes.code,
          grant_type: 'authorization_code'
        }
        //发送请求
        request.reqGet(url, data,
          function (res) {
            app.globalData.openid = res.data.openid;
            wx.setStorageSync('openid', res.data.openid);
          });
      }
    });
  },

  //自定义获取用户数据
  getUserInfo: function (app) {
    //调用登录接口
    wx.login({
      success: function () {
        //获取用户
        wx.getUserInfo({
          success: function (res) {
            app.globalData.userInfo = res.userInfo
            wx.setStorageSync('userinfo', res.userInfo );
          }
        });
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