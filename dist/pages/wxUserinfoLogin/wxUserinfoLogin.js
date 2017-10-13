/**  
 *   作者:  lingfe 
 *   时间:  2017-7-26
 *   描述:  微信登录
 * 
 * */
var app=getApp();
var utilMd5 = require('../../utils/md5.js');
import __config from '../../config/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {   
    text:'获取您的公开信息，如:头像，名称等',              //文本
    isAgree:true,
  }, 
  
  /**
   * 确定登录
   */
  bindtapLogin: function () {
    var that=this;
    //发起登录请求，得到code
    wx.login({
      success: function (res) {
        //获取登录信息
        wx.getUserInfo({
          success: function (res2) {//获取userinfo成功
            //登录请求
            that.loginRequest(res2, res.code);
          },
          fail:function(res){
            wx.showToast({
              title: '获取失败!你授权了吗？',
              icon: 'loading',
              duration: 3000,
            });
          }
        });
      },
      fail:function(res){
        wx.showToast({
          title: '登录失败！',
          icon: 'loading',
          duration: 3000,
        });
      }
    });
  },

  //发起登录请求
  loginRequest:function(res2,code){
    //请求服务器,该用户是否登录服务器
    wx.request({
      method: 'POST',
      data: { reqJson: JSON.stringify(res2.userInfo) },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      url: __config.basePath_sys + 'lg/wxLg/3DF7469FD3A1485B95ED16ED794780A8/' +code,
      success: function (res) { //请求成功！
        if (res.data.status === 1) {
          if (res.data.rows == null) return;
          //提示
          wx.showToast({
            title: res.data.message,
            icon: 'loading',
            duration: 3000,
          });
          
          //得到cookie
          var cookie = res.header["Set-Cookie"].split(",")[0].split(";")[0] + ";" +
            res.header["Set-Cookie"].split(",")[1].split(";")[0];
          var time = new Date().getTime();
          var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();
          //保存在本地缓存中
          wx.setStorageSync("cookie", cookie);
          wx.setStorageSync("time", time);
          wx.setStorageSync("token", token);

          //得到个人id，保存在本地缓存中
          var personalId = res.data.rows.id;
          var user = res.data.rows;
          wx.setStorageSync("personalId", personalId);
          wx.setStorageSync("user", user);

          //登录成功！跳转到首页
          wx.switchTab({
            url: '/pages/index/index',
          });
          return;
        }
      },
      fail: function (res) {   //请求失败
        //提示
        wx.showToast({
          title: "请求失败!",
          icon: 'loading',
          duration: 3000,
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //发起登录请求
    wx.login({
      success: function (res) {//登录成功
          //获取登录信息
          wx.getUserInfo({
            success: function (res2) {//获取userinfo成功
              var encryptedData = encodeURIComponent(res2.encryptedData);//一定要把加密串转成URI编码
              var iv = res2.iv;
              //设置数据
              that.setData({
                userInfo: res2.userInfo
              });
              //请求登录
              that.loginRequest(res2, res.code);
            },//失败
            fail:function(res2){
              wx.showToast({
                title: '获取失败!你授权了吗？',
                icon: 'loading',
                duration: 3000,
              });
            }
          });
      },
      fail:function(res){
        wx.showToast({
          title: '获取失败,请检查您的网络！',
          icon: 'loading',
          duration: 3000,
        });
      }
    });
  },
})