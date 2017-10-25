/**  作者:  lingfe 
 *   时间:  2017-7-13
 *   描述:  查看搭友——页面
 * 
 * */
 var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],      //数据集合
    numBer: 1      //帖子数量
  },

  //页面加载
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
    var url = app.config.basePath_sys + "api/exe/get";
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
        nameSpace: 'sys_userinfo',       //个人信息表
        scriptName: 'Query',
        nameSpaceMap: {
          rows: [{
            id: that.data.personalId    //个人资料id
          }],
        }
      })
    };
    //发送请求
    app.request.reqPost(url,header,data,function(res){
      that.setData({
        userinfo: res.data.rows[0]
      });
    });
  },

  //请求获取数据,发布信息
  requestData: function (that) {
    //请求获取发布信息,
    var url = app.config.basePath_web + "api/exe/get";
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
        nameSpace: 'releaseinfo',
        scriptName: 'Query',
        nameSpaceMap: {
          pageable: 0,
          rows: [{
            df: 0,
            personalId: that.data.personalId    //发布信息id
          }],
        }
      })
    };
    //发送请求
    app.request.reqPost(url,header,data,function(res){
      var pageList = [];
      //得到数据
      var list = res.data.rows;
      for (var i = 0, lenI = list.length; i < lenI; ++i) {
        var strTime = app.getTimeInterval(list[i].mdate);
        if (list[i].imageArray != null) list[i].imageArray = app.config.domainImage + list[i].imageArray.split(',')[0];
        if (list[i].projectDescription != null) list[i].projectDescription = list[i].projectDescription.substring(0, 60);
        if (list[i].incomeDescription != null) list[i].incomeDescription = list[i].incomeDescription.substring(0, 60);
        if (list[i].businessDescription != null) list[i].businessDescription = list[i].businessDescription.substring(0, 60);

        list[i].mdate = strTime;
        //添加到当前数组
        pageList.push(list[i]);
      }
      //设置值
      that.setData({
        list: pageList,
        numBer: pageList.length
      });
    });

  },

  //用户下拉动作
  onPullDownRefresh: function () {
    var that = this;

    //获取发布相关信息
    that.requestData(that);
    //获取个人信息
    that.requestDataPersonal(that);

    //下拉完成后执行回退
    wx.stopPullDownRefresh();
  },
})