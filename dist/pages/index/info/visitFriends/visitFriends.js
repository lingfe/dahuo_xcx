/**  作者:  lingfe 
 *   时间:  2017-7-13
 *   描述:  查看搭友——页面
 * 
 * */
var utilMd5 = require('../../../../utils/md5.js');
import __config from '../../../../config/config'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],      //数据集合
    numBer: 1      //帖子数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      personalId: options.personalId
    });

    //获取发布相关信息
    that.requestData(that);
    //获取个人信息
    that.requestDataPersonal(that);
  },

  //请求获取数据,个人信息
  requestDataPersonal: function (that) {
    wx.request({
      url: __config.basePath_sys + "api/exe/get",
      method: "POST",
      header: {cookie: wx.getStorageSync("cookie"),"Content-Type": "application/x-www-form-urlencoded"},
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
        that.setData({
          userinfo: res.data.rows[0]
        });
      }
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
  requestData: function (that) {
    //请求获取发布信息,
    wx.request({
      url: __config.basePath_web + "api/exe/get",
      method: "POST",
      header: {
        cookie: wx.getStorageSync("cookie"),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        timeStamp: wx.getStorageSync("time"),
        token: wx.getStorageSync("token"),
        reqJson: JSON.stringify({
          nameSpace: 'releaseinfo',
          scriptName: 'Query',
          nameSpaceMap: {
            pageable: 0,
            rows: [{
              df:0,
              personalId: that.data.personalId    //发布信息id
            }],
          }
        })
      },
      success: function (res) {
        var pageList = [];
        //得到数据
        var list = res.data.rows;
        for (var i = 0, lenI = list.length; i < lenI; ++i) {
          var strTime = that.getDate(list[i].cdate);
          if (list[i].imageArray != null) list[i].imageArray = __config.domainImage + list[i].imageArray.split(',')[0];
          if (list[i].projectDescription != null) list[i].projectDescription = list[i].projectDescription.substring(0, 60);
          if (list[i].incomeDescription != null) list[i].incomeDescription = list[i].incomeDescription.substring(0, 60);
          if (list[i].businessDescription != null) list[i].businessDescription = list[i].businessDescription.substring(0, 60);

          list[i].cdate = strTime;
          //添加到当前数组
          pageList.push(list[i]);
        }
        //设置值
        that.setData({
          list: pageList,
          numBer: pageList.length
        });
      }
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;

    //获取发布相关信息
    that.requestData(that);
    //获取个人信息
    that.personalGetData(that);

    //下拉完成后执行回退
    wx.stopPullDownRefresh();
  },
})