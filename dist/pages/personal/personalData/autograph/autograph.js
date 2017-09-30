/**  
 *   作者:  lingfe 
 *   时间:  2017-7-26
 *   描述:  个人_个人资料_修改签名
 * 
 * */
 var app=getApp();
var utilMd5 = require('../../../../utils/md5.js');
import __config from '../../../../config/config'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    autograph: null,
    num:0
  },

  //修改个人信息
  personalUpdate: function (that) {
    //发送请求
    wx.request({
      url: __config.basePath_sys + "api/exe/save",
      method: "POST",
      header: {
        cookie: wx.getStorageSync("cookie"),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        timeStamp: wx.getStorageSync("time"),
        token: wx.getStorageSync("token"),
        reqJson: JSON.stringify({
          nameSpace: 'sys_userinfo',       //个人信息表
          scriptName: 'Query',
          cudScriptName: 'Save',
          nameSpaceMap: {
            rows: [{
              id: that.data.personalId,           //个人资料id
              memo: that.data.autograph                //签名
            }],
          }
        })
      },
      success: function (res) {   //请求成功
        //获取个人信息
        that.personalGetData(that);
      }
    });
  },

  //获取个人信息
  personalGetData: function (that) {
    //发送请求
    this.requestDataPersonal(that);
  },

  //请求获取数据,个人信息
  requestDataPersonal: function (that) {
    wx.request({
      url: __config.basePath_sys + "api/exe/get",
      method: "POST",
      header: {
        cookie: wx.getStorageSync("cookie"),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        timeStamp: wx.getStorageSync("time"),
        token: wx.getStorageSync("token"),
        reqJson: JSON.stringify({
          nameSpace: 'sys_userinfo',       //个人信息表
          scriptName: 'Query',
          nameSpaceMap: {
            rows: [{
              id: that.data.personalId    //个人资料id
            }],
          }
        })
      },
      success: function (res) {   //请求成功
        //得到打开的页面
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];  //当前页面
        var prevPage = pages[pages.length - 2]; //上一个页面

        //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
          userinfo: res.data.rows[0]
        })
        //返回上一页
        wx.navigateBack();
      }
    });
  },

  
  //获取值
  dataChange: function (e) {
    if (e.detail.value.length <=0) {
      wx.showModal({
        title: '内容不能为空!',
        showCancel: false,
      });
      return;
    }
    this.setData({
      num: e.detail.value.length,
      autograph: e.detail.value
    });
  },

  //修改用户签名
  showTopTips: function (e) {
    var that=this;
    //发送请求修改
    that.personalUpdate(that);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //重新赋值
    this.setData({
      personalId: options.personalId,
      autograph: options.autograph
    });
  },
})