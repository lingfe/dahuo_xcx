
/**  作者:  lingfe 
 *   时间:  2017-7-7
 *   描述:  信息页面
 * 
 * */
var utilMd5 = require('../../utils/md5.js');
import __config from '../../config/config';

Page({
  data:{
    messages:[]
  },

  //长按提示删除
  bindlongtapURL:function(e){
    var that = this;
    var id = e.currentTarget.id;
    var index = e.currentTarget.dataset.index;

    wx.showModal({
      title: '删除通知',
      content: '是否删除？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          that.data.id=id;
          that.data.index=index;
          //删除通知
          that.neticeDelete(that);
        }
      }
    });
  },
  
  //删除通知
  neticeDelete:function(that){
    //发送请求
    wx.request({
      url: __config.basePath_web + "api/exe/save",
      method: "POST",
      header: { cookie: that.data.cookie, "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        timeStamp: that.data.time,
        token: that.data.token,
        reqJson: JSON.stringify({
          nameSpace: 'notice',       //通知表
          scriptName: 'Query',
          cudScriptName: 'Delete',
          nameSpaceMap: {
            rows: [{
              id: that.data.id,
            }],
          }
        })
      },
      success: function (res) {
        var messages = that.data.messages;
        var index = that.data.index;
        messages.splice(index, 1);
        that.setData({
          messages: messages
        });
      },
      fail: function (res) { },
      complete: function () { }
    });
  },

  //加载执行
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    var that=this;
    that.getmessteges(that);
  },

  /**
* 页面相关事件处理函数--监听用户下拉动作
*/
  onPullDownRefresh: function () {
    var that = this;
    that.getmessteges(that);
    //下拉完成后执行回退
    wx.stopPullDownRefresh();
  },

  getmessteges:function(that){
    //发送请求
    wx.request({
      url: __config.basePath_web + "api/exe/get",
      method: "POST",
      header: { cookie: wx.getStorageSync("cookie"), "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        timeStamp: wx.getStorageSync("time"),
        token: wx.getStorageSync("token"),
        reqJson: JSON.stringify({
          nameSpace: 'notice',       //通知表
          scriptName: 'Query',
          nameSpaceMap: {
            rows: [{
              personalId: wx.getStorageSync("personalId")    //个人id
            }],
          }
        })
      },
      success: function (res) {   //请求成功
        var row = res.data.rows;
        for (var i = 0; i < row.length; ++i) {
          if (row[i].imgUrl != null) row[i].imgUrl = row[i].imgUrl;
          row[i].cdate = that.getDate(row[i].cdate);
          if (row[i].static != 1) biaoweiyidu(that, row[i].id);
        }
        //row.reverse();
        that.setData({ messages: row });
      },
      fail: function (res) { },
      complete: function () { }
    });

    //标为已读
    function biaoweiyidu(that, id) {
      //发送请求
      wx.request({
        url: __config.basePath_web + "api/exe/save",
        method: "POST",
        header: { cookie: wx.getStorageSync('cookie'), "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          timeStamp: wx.getStorageSync('time'),
          token: wx.getStorageSync('token'),
          reqJson: JSON.stringify({
            nameSpace: 'notice',       //通知表
            scriptName: 'Query',
            cudScriptName: 'Save',
            nameSpaceMap: {
              rows: [{
                id: id,
                static: 1,                                       //0=未查看，1=已查看', 
                personalId: wx.getStorageSync("personalId")    //个人id
              }],
            }
          })
        },
        success: function (res) {   //请求成功
        },
        fail: function (res) { },
        complete: function () { }
      });
    }
  },

  //获取时间差
  getDate: function (date) {
    var date1 = new Date(date);                    //开始时间
    var date2 = new Date();                        //结束时间
    var date3 = date2.getTime() - date1.getTime()  //时间差的毫秒数

    //计算出相差年
    //还有一个小bug，当事件差为负数时，值为负数，将上面leftsecond代码改一下
    //var leftsecond = parseInt(Math.abs((date2.getTime() - date1.getTime())) / 1000);

    //计算出相差月
    var months = (date2.getFullYear() - date1.getFullYear()) * 12;
    if (months != 0) {
      return months + "月前";
    }

    //计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    if (days != 0) {
      return days + "天前";
    }

    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    if (hours != 0) {
      return hours + "小时前";
    }

    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    if (minutes != 0) {
      return minutes + "分钟前";
    }

    //计算相差秒数
    var leave3 = leave2 % (60 * 1000);     //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    if (seconds != 0) {
      return "刚刚";
    }
  },
})