// updatePhone.js
var app=getApp();
import __config from '../../../../config/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: 60,       //60秒
    selected: false,  //隐藏/显示
    selected1: true,//隐藏/显示
  },
  //电话号码
  inputTypingPhone:function(e){
    this.setData({
      phone: e.detail.value
    });
  },

  //验证码，
  inputTypingYZM:function(e){
    this.setData({
      yzm: e.detail.value
    });
  },

  //加载
  onLoad:function(){
    var that=this;
    that.requestDataPersonal(that);
  },

  //修改电话号码
  bindtapUpdatePhone:function(e){
    var that=this;
    if (app.checkInput(that.data.phone)){
      wx.showToast({
        title: "请输入电话号码!",
        icon: 'loading',
        duration: 2000
      });
      return;
    }

    if (app.checkInput(that.data.yzm)) {
      wx.showToast({
        title: "请输入验证码!",
        icon: 'loading',
        duration: 2000
      });
      return;
    }


    wx.request({
      url: __config.basePath_sys + "api/plug/save",
      method: "POST",
      header: { cookie: wx.getStorageSync('cookie') + ";" + that.data.user_verify_sys, "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        timeStamp: wx.getStorageSync('time'),
        token: wx.getStorageSync('token'),
        reqJson: JSON.stringify({
          nameSpace: 'sys_userinfo',       //个人信息表
          scriptName: 'com.echsoft.common.plugin.impl.BindPhone4UserPlugin',
          nameSpaceMap: {
            rows: [{
              mobile: that.data.phone,
              verifyCode:that.data.yzm,
              id: wx.getStorageSync('personalId')   //个人资料id
            }],
          }
        })
      },
      success: function (res) { 
        console.log(res);

      },
    });
  },

  //请求获取数据,个人信息
  requestDataPersonal: function (that) {
    wx.request({
      url: __config.basePath_sys + "api/exe/get",
      method: "POST",
      header: { cookie: wx.getStorageSync('cookie'), "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        timeStamp: wx.getStorageSync('time'),
        token: wx.getStorageSync('token'),
        reqJson: JSON.stringify({
          nameSpace: 'sys_userinfo',       //个人信息表
          scriptName: 'Query',
          nameSpaceMap: {
            rows: [{
              id: wx.getStorageSync('personalId')   //个人资料id
            }],
          }
        })
      },
      success: function (res) {   //请求成功
        console.log("userinfo:");
        console.log(res);
        if (res.statusCode == 408) {
          wx.showToast({
            title: "会话已过期，请重新登录！",
            icon: 'loading',
            duration: 2000,
            success: function (res) {
              wx.redirectTo({
                url: '/pages/wxUserinfoLogin/wxUserinfoLogin',
              });
              return;
            }
          });
        }
        that.setData({
          userinfo: res.data.rows[0]
        });
      },
    });
  },

  //后去验证码
  getphone: function (e) {
    var that=this;
    if (app.checkInput(that.data.phone)) {
      wx.showToast({
        title: "请输入电话号码!",
        icon: 'loading',
        duration: 2000
      });
      return;
    }

    console.log('获取验证码！');
    that.setData({
      selected: true,
      selected1: false,
    });
    countdown(that);



    wx.request({
      url: __config.basePath_sys + "api/exe/sendVerificationCode",
      method: "POST",
      header: { cookie: wx.getStorageSync('cookie'), "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        timeStamp: wx.getStorageSync('time'),
        token: wx.getStorageSync('token'),
        reqJson: that.data.phone ,
      },
      success: function (res) {
        console.log(res);
        var cookie = res.header["Set-Cookie"].split(",")[0].split(";")[0];
        that.setData({
          user_verify_sys: cookie
        });
      },
    });
  },
});

//验证码
function countdown(that) {
  var second = that.data.second;
  if (second == 0) {
    that.setData({
      selected: false,
      selected1: true,
      second: 60,
    });
    return;
  }
  var time = setTimeout(function () {
    that.setData({
      second: second - 1
    });
    countdown(that);
  }, 1000)
}
