/**  作者:  lingfe 
 *   时间:  2017-7-13
 *   描述:  查看搭友——页面
 * 
 * */
var app = getApp();
var utilMd5 = require('../../../../utils/md5.js');
import __config from '../../../../config/config'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],      //数据集合
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;

    that.setData({
      releaseId: options.releaseId,
      personalId: options.personalId
    }); 

    //获取发布相关信息
    that.requestData(that);
    //获取个人信息
    that.personalGetData(that);
  },

  //获取个人信息
  personalGetData: function (that) {
    //必要参数
    var time = new Date().getTime();
    var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();
    //个人资料id
    var personalId = that.data.personalId;
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
        console.log("userinfo:");
        console.log(res);
        that.setData({
          userinfo: res.data.rows[0]
        });
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

  //获取时间差
  getDate: function (date) {
    var date1 = new Date(date);    //开始时间
    var date2 = new Date();    //结束时间
    var date3 = date2.getTime() - date1.getTime()  //时间差的毫秒数

    //计算出相差年
    //还有一个小bug，当事件差为负数时，值为负数，将上面leftsecond代码改一下
    //var leftsecond = parseInt(Math.abs((date2.getTime() - date1.getTime())) / 1000);

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

  //请求获取数据,发布信息
  requestData: function (self) {
    //必要参数
    var cookie = wx.getStorageSync("cookie");
    var time = new Date().getTime();
    var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();

    //设置请求参数获取数据,默认0第一页
    var data = {
      timeStamp: time,
      token: token,
      reqJson: JSON.stringify({
        nameSpace: 'releaseinfo',
        scriptName: 'Query',
        nameSpaceMap: {
          releaseinfo: {
            Query: [{
              id: self.data.releaseId    //发布信息id
            }],
          }
        }
      })
    };
    //请求获取发布信息,
    wx.request({
      url: __config.basePath_web + "api/exe/get",
      method: "POST",
      header: {
        cookie: cookie,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data,
      success: function (res) {
        console.log(res);
        var pageList = self.data.list;
        //得到数据
        var list = res.data.rows;
        for (var i = 0, lenI = list.length; i < lenI; ++i) {
          var strTime = self.getDate(list[i].cdate);
          list[i].cdate = strTime;
          //添加到当前数组
          pageList.push(list[i]);
        }
        //设置值
        self.setData({
          list: pageList,
        });
        console.log("成功了");
      },
      fail: function (res) {
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