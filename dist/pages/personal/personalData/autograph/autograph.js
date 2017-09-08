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
    //必要参数
    var time = new Date().getTime();
    var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();
    var cookie = wx.getStorageSync("cookie");

    //设置请求参数获取数据
    var data = {
      timeStamp: time,
      token: token,
      reqJson: JSON.stringify({
        nameSpace: 'sys_userinfo',       //个人信息表
        scriptName: 'Query',
        cudScriptName: 'Update',
        nameSpaceMap: {
          sys_userinfo: {
            Query: [{
              id: that.data.personalId,           //个人资料id
              memo: that.data.autograph                //签名
            }],
          }
        }
      })
    };

    //发送请求
    wx.request({
      url: __config.basePath_sys + "api/exe/save",
      method: "POST",
      header: {
        cookie: cookie,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data,
      success: function (res) {   //请求成功
        //获取个人信息
        that.personalGetData(that);
      },
      fail: function (res) {      //请求失败
        //提示
        wx.showToast({
          title: "请求失败！",
          icon: 'loading',
          duration: 3000,
        });
        console.log("失败了");
      },
      //不管成功失败都执行
      complete: function () { }
    });
  },
  //获取个人信息
  personalGetData: function (that) {
    //必要参数
    var time = new Date().getTime();
    var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();

    var personalId = that.data.personalId;//个人资料id
    //设置请求参数获取数据,默认0第一页
    var data = {
      timeStamp: time,
      token: token,
      reqJson: JSON.stringify({
        nameSpace: 'sys_userinfo',       //个人信息表
        scriptName: 'Query',
        nameSpaceMap: {
          sys_userinfo: {
            Query: [{
              id: personalId    //个人资料id
            }],
          }
        }
      })
    };
    that.setData({
      data: data,
    });

    //发送请求
    this.requestDataPersonal(that);
  },

  //请求获取数据,个人信息
  requestDataPersonal: function (that) {
    //必要参数
    var cookie = wx.getStorageSync("cookie");
    wx.request({
      url: __config.basePath_sys + "api/exe/get",
      method: "POST",
      header: {
        cookie: cookie,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: that.data.data,
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
      },
      fail: function (res) {      //请求失败
        //提示
        wx.showToast({
          title: "请求失败！",
          icon: 'loading',
          duration: 3000,
        });
        console.log("失败了");
      },
      //不管成功失败都执行
      complete: function () { }
    });
  },
  //获取值
  dataChange: function (e) {
    console.log(e.detail.value.length);
    if (e.detail.value.length > 200) {
      wx.showModal({
        title: '内容的长度不能打大于200',
        showCancel: false,
      });
      return;
    }
    this.setData({
      num: e.detail.value.length,
    });
    this.data.autograph = e.detail.value;
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