  /**  
 *   作者:  lingfe 
 *   时间:  2017-11-1
 *   描述:  留言通知页面
 * 
 * */
 var app=getApp();
 
Page({
  data: {
    messages: []
  },

  //长按提示删除
  bindlongtapURL: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    var index = e.currentTarget.dataset.index;
    //提示
    wx.showModal({
      title: '删除通知',
      content: '是否删除？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {

          that.data.id = id;
          that.data.index = index;
          //删除通知
          that.neticeDelete(that);
        }
      }
    });
  },

  //删除通知
  neticeDelete: function (that) {
    var url = app.config.basePath_web + "api/exe/save";
    //请求头
    var header = { cookie: wx.getStorageSync('cookie'), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
      timeStamp: wx.getStorageSync('time'),
      token: wx.getStorageSync('token'),
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
    };

    //发送请求
    app.request.reqPost(url, header, data, function (res) {
      var messages = that.data.messages;
      var index = that.data.index;
      messages.splice(index, 1);
      that.setData({ messages: messages });
    });
  },

  //加载执行
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    var that = this;
    that.getmessteges(that);
  },

  //用户下拉动作
  onPullDownRefresh: function () {
    var that = this;
    that.getmessteges(that);
    //下拉完成后执行回退
    wx.stopPullDownRefresh();
  },

  //获取通知信息
  getmessteges: function (that) {
    var url = app.config.basePath_web + "api/exe/get";
    //请求头
    var header = { cookie: wx.getStorageSync("cookie"), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
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
    };
    //发送请求
    app.request.reqPost(url, header, data, function (res) {
      var row = res.data.rows;
      var list = [];
      for (var i = 0; i < row.length; ++i) {
        if (row[i].ntype != 0) {//通知类型 0=系统，1=其他
          if (row[i].imgUrl != null) row[i].imgUrl = row[i].imgUrl;
          row[i].cdate = app.getTimeInterval(row[i].cdate);
          if (row[i].static != 1) biaoweiyidu(that, row[i].id);
          list.push(row[i]);
        } else {
          if (row[i].static != 1) that.setData({ sysTZ: true });
        }
      }
      //row.reverse();
      that.setData({ messages: list });
    });

    //标为已读
    function biaoweiyidu(that, id) {
      var url = app.config.basePath_web + "api/exe/save";
      //请求头
      var header = { cookie: wx.getStorageSync('cookie'), "Content-Type": "application/x-www-form-urlencoded" };
      //参数
      var data = {
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
      };
      //发送请求
      app.request.reqPost(url, header, data, function (res) {
        console.log(res);
      });
    }
  }
})